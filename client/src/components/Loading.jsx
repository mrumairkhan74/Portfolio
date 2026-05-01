import  { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import HomeQuotes from './widgets/HomeQuotes';

const Loading = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [dragAmount, setDragAmount] = useState(0);
  const ropeY = useMotionValue(0);
  const springRopeY = useSpring(ropeY, { stiffness: 500, damping: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCloth();
    };

    window.addEventListener('resize', resize);

    const cols = 70;
    const rows = 55;
    let points = [];
    let constraints = [];

    const GRAVITY = 0.10;
    const DAMPING = 0.993;
    const STIFFNESS = 0.48;

    class Point {
      constructor(x, y, pinned = false) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.pinned = pinned;
      }

      update() {
        if (this.pinned) return;
        const vx = (this.x - this.oldX) * DAMPING;
        const vy = (this.y - this.oldY) * DAMPING;
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += vx;
        this.y += vy;
        this.y += GRAVITY;
      }

      constrain() {
        if (this.pinned) return;
        this.x = Math.max(0, Math.min(this.x, canvas.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height));
      }
    }

    function initCloth() {
      const spacingX = canvas.width / (cols - 1);
      const spacingY = canvas.height / (rows - 1);
      const startX = 0;
      const startY = 0;

      points = [];

      for (let i = 0; i < cols; i++) {
        points[i] = [];
        for (let j = 0; j < rows; j++) {
          const pinned = (j === 0);
          const x = startX + i * spacingX;
          const y = startY + j * spacingY;
          points[i][j] = new Point(x, y, pinned);
        }
      }

      constraints = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (i < cols - 1) {
            const dx = points[i + 1][j].x - points[i][j].x;
            const dy = points[i + 1][j].y - points[i][j].y;
            constraints.push({
              p1: points[i][j],
              p2: points[i + 1][j],
              rest: Math.hypot(dx, dy),
              stiff: STIFFNESS
            });
          }
          if (j < rows - 1) {
            const dx = points[i][j + 1].x - points[i][j].x;
            const dy = points[i][j + 1].y - points[i][j].y;
            constraints.push({
              p1: points[i][j],
              p2: points[i][j + 1],
              rest: Math.hypot(dx, dy),
              stiff: STIFFNESS
            });
          }
          if (i < cols - 1 && j < rows - 1) {
            const dx1 = points[i + 1][j + 1].x - points[i][j].x;
            const dy1 = points[i + 1][j + 1].y - points[i][j].y;
            constraints.push({
              p1: points[i][j],
              p2: points[i + 1][j + 1],
              rest: Math.hypot(dx1, dy1),
              stiff: STIFFNESS * 0.6
            });
            const dx2 = points[i][j + 1].x - points[i + 1][j].x;
            const dy2 = points[i][j + 1].y - points[i + 1][j].y;
            constraints.push({
              p1: points[i + 1][j],
              p2: points[i][j + 1],
              rest: Math.hypot(dx2, dy2),
              stiff: STIFFNESS * 0.6
            });
          }
        }
      }
    }

    function satisfyConstraints() {
      for (let iter = 0; iter < 3; iter++) {
        for (let c of constraints) {
          const dx = c.p2.x - c.p1.x;
          const dy = c.p2.y - c.p1.y;
          const dist = Math.hypot(dx, dy);
          if (dist === 0) continue;
          const diff = (dist - c.rest) / dist;
          const move = diff * c.stiff * 0.5;
          const mx = dx * move;
          const my = dy * move;

          if (!c.p1.pinned && !c.p2.pinned) {
            c.p1.x += mx;
            c.p1.y += my;
            c.p2.x -= mx;
            c.p2.y -= my;
          } else if (!c.p1.pinned) {
            c.p1.x += mx * 2;
            c.p1.y += my * 2;
          } else if (!c.p2.pinned) {
            c.p2.x -= mx * 2;
            c.p2.y -= my * 2;
          }
        }
      }
    }

    function applyMouseWind() {
      const radius = 140;
      const force = 2.0;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p = points[i][j];
          if (p.pinned) continue;

          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            const angle = Math.atan2(dy, dx);
            const strength = (1 - dist / radius) * force;
            p.x += Math.cos(angle) * strength;
            p.y += Math.sin(angle) * strength;
          }
        }
      }
    }

    function applyRopePull(amount) {
      if (amount === 0) return;
      const liftStrength = amount * 0.6;

      for (let i = Math.floor(cols * 0.6); i < cols; i++) {
        for (let j = Math.floor(rows * 0.4); j < rows; j++) {
          if (!points[i][j].pinned) {
            const factor = (j - rows * 0.4) / (rows * 0.6);
            points[i][j].y -= liftStrength * factor * 0.4;
          }
        }
      }
    }

    function updatePhysics() {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points[i][j].update();
        }
      }

      satisfyConstraints();

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points[i][j].constrain();
        }
      }

      applyMouseWind();
      applyRopePull(dragAmount);
    }

    function drawCloth() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const p0 = points[i][j];
          const p1 = points[i + 1][j];
          const p2 = points[i + 1][j + 1];
          const p3 = points[i][j + 1];

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();

          const gradient = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
          gradient.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
          gradient.addColorStop(0.3, 'rgba(139, 92, 246, 0.25)');
          gradient.addColorStop(0.7, 'rgba(236, 72, 153, 0.2)');
          gradient.addColorStop(1, 'rgba(0, 240, 255, 0.1)');

          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < cols; i += 3) {
        for (let j = 0; j < rows; j += 3) {
          const p = points[i][j];
          const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
          if (distToMouse < 100) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            const intensity = 0.25 * (1 - distToMouse / 100);
            ctx.fillStyle = `rgba(0, 240, 255, ${intensity})`;
            ctx.fill();
          }
        }
      }
      ctx.restore();
    }

    function animate() {
      updatePhysics();
      drawCloth();
      animationId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [dragAmount]);

  const handleDragStart = () => {
    setIsDragging(true);
    setShowHint(false);
  };

  const handleDrag = (event, info) => {
    const newY = Math.min(Math.max(info.offset.y, 0), 150);
    setDragAmount(newY);
    ropeY.set(newY);
    if (newY > 60) setShowHint(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    if (info.offset.y > 100) {
      onComplete();
    } else {
      setDragAmount(0);
      ropeY.set(0);
      setShowHint(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50"
      style={{
        background: 'radial-gradient(circle at 20% 0%, #0A0A0F 0%, #06060C 50%, #020206 100%)',
        boxShadow: 'inset 0 0 100px rgba(0, 240, 255, 0.03)'
      }}
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Full screen cloth canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Quotes Widget - Bottom Left Corner */}
      <div className="absolute top-8 left-8 z-20 max-w-sm">
        <HomeQuotes />
      </div>

      {/* Futuristic rope - top right anchored */}
      <div className="absolute right-8 top-8 z-20">
        <motion.div
          drag="y"
          dragConstraints={{ top: 20, bottom: 250 }}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ y: springRopeY }}
          className="relative cursor-grab active:cursor-grabbing"
        >
          <div
            className="absolute -left-4 -top-3 w-14 h-3 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00F0FF, #8B5CF6, #EC4899)',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)'
            }}
          />

          <div
            className="relative rounded-full shadow-xl"
            style={{
              width: '10px',
              height: `${60 + dragAmount * 0.6}px`,
              background: 'linear-gradient(180deg, #00F0FF 0%, #8B5CF6 50%, #EC4899 100%)',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
              marginTop: '7px'
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="w-full h-full" style={{
                background: 'repeating-linear-gradient(180deg, transparent, transparent 5px, rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 10px)'
              }} />
            </div>
          </div>

          <div
            className="absolute -left-5 w-10 h-10 rounded-full shadow-2xl flex items-center justify-center"
            style={{
              top: `${54 + dragAmount * 0.6}px`,
              background: 'radial-gradient(circle at 30% 30%, #00F0FF, #8B5CF6)',
              border: '2px solid rgba(236, 72, 153, 0.8)',
              cursor: 'grab',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: '#EC4899' }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.2) 100%)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Minimal instruction */}
      {!isDragging && dragAmount === 0 && (
        <div className="absolute bottom-20 left-0 right-0 text-center z-10">
          <div
            className="inline-block backdrop-blur-md px-6 py-2 rounded-full"
            style={{
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid rgba(0, 240, 255, 0.2)'
            }}
          >
            <p
              className="text-sm tracking-wider font-mono"
              style={{ color: '#00F0FF', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}
            >
              ⚡ PULL THE ROPE ⚡
            </p>
          </div>
        </div>
      )}

      {/* Cyber progress ring */}
      {dragAmount > 0 && dragAmount < 100 && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className="w-32 h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(0, 240, 255, 0.1)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${(dragAmount / 100) * 100}%`,
                background: 'linear-gradient(90deg, #00F0FF, #8B5CF6, #EC4899)',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
              }}
            />
          </div>
        </div>
      )}

      {/* Portal opening effect */}
      {showHint && !isDragging && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-44 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div
            className="px-6 py-2 rounded-full font-bold shadow-xl backdrop-blur-md"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(139, 92, 246, 0.2))',
              border: '1px solid rgba(0, 240, 255, 0.5)',
              color: '#00F0FF',
              textShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
            }}
          >
            ✨ RELEASE TO ENTER THE FUTURE ✨
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Loading;