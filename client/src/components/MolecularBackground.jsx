import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const MolecularBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let molecules = [];

    // Mobile-optimized values
    const particleCount = isMobile ? 30 : 80;
    const moleculeCount = isMobile ? 3 : 8;
    const connectionDistance = isMobile ? 60 : 100;
    const particleSpeed = isMobile ? 0.3 : 0.5;
    const particleRadius = isMobile ? { min: 1, max: 2 } : { min: 1.5, max: 3 };
    const glowIntensity = isMobile ? 2 : 8;

    // Particle class (atoms)
    class Particle {
      constructor(x, y, radius, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.originalRadius = radius;
        this.connections = [];
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Reduced glow on mobile
        if (!isMobile) {
          ctx.shadowBlur = glowIntensity;
          ctx.shadowColor = this.color;
        }
        
        // Gradient fill for particles
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, `${this.color}80`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges with padding
        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.speedX *= -0.98;
        }
        if (this.x + this.radius > canvas.width) {
          this.x = canvas.width - this.radius;
          this.speedX *= -0.98;
        }
        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.speedY *= -0.98;
        }
        if (this.y + this.radius > canvas.height) {
          this.y = canvas.height - this.radius;
          this.speedY *= -0.98;
        }

        // Pulsing effect (reduced on mobile)
        if (!isMobile) {
          this.radius = this.originalRadius + Math.sin(Date.now() * 0.003 * this.originalRadius) * 0.5;
        }
      }
    }

    // Molecule class (connected groups)
    class Molecule {
      constructor(particles, centerX, centerY) {
        this.particles = particles;
        this.centerX = centerX;
        this.centerY = centerY;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
      }

      update() {
        this.rotation += this.rotationSpeed;
        // Update particle positions relative to center with rotation
        this.particles.forEach((particle, idx) => {
          const angle = this.rotation + (idx * Math.PI * 2 / this.particles.length);
          const radius = isMobile ? 25 : 40;
          particle.x = this.centerX + Math.cos(angle) * radius;
          particle.y = this.centerY + Math.sin(angle) * radius;
        });
      }

      draw() {
        // Draw connections between particles in molecule
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            ctx.beginPath();
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[j].x, this.particles[j].y);
            
            const gradient = ctx.createLinearGradient(
              this.particles[i].x, this.particles[i].y,
              this.particles[j].x, this.particles[j].y
            );
            gradient.addColorStop(0, this.particles[i].color);
            gradient.addColorStop(1, this.particles[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = isMobile ? 1 : 1.5;
            if (!isMobile) {
              ctx.shadowBlur = 3;
              ctx.shadowColor = this.particles[i].color;
            }
            ctx.stroke();
          }
        }
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles and molecules
    function init() {
      const colors = isDark 
        ? ['#00F0FF', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981']
        : ['#00B4C8', '#7850DC', '#DC3C8C', '#3B82F6', '#10B981'];
      
      particles = [];
      molecules = [];

      // Create free-floating particles (reduced count on mobile)
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * (particleRadius.max - particleRadius.min) + particleRadius.min;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedX = (Math.random() - 0.5) * particleSpeed;
        const speedY = (Math.random() - 0.5) * particleSpeed;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        particles.push(new Particle(x, y, radius, color, speedX, speedY));
      }

      // Create molecular structures (reduced on mobile)
      for (let i = 0; i < moleculeCount; i++) {
        const centerX = Math.random() * canvas.width;
        const centerY = Math.random() * canvas.height;
        const particleCountInMolecule = Math.floor(Math.random() * 4) + 3; // 3-6 particles
        
        const moleculeParticles = [];
        for (let j = 0; j < particleCountInMolecule; j++) {
          const radius = Math.random() * (particleRadius.max - particleRadius.min) + particleRadius.min;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const angle = (j / particleCountInMolecule) * Math.PI * 2;
          const radiusDistance = isMobile ? 25 : 40;
          const x = centerX + Math.cos(angle) * radiusDistance;
          const y = centerY + Math.sin(angle) * radiusDistance;
          
          moleculeParticles.push(new Particle(x, y, radius, color, 0, 0));
        }
        
        molecules.push(new Molecule(moleculeParticles, centerX, centerY));
      }
    }

    // Draw connections between close particles (chemical bonds)
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const opacity = (1 - distance / connectionDistance) * (isMobile ? 0.15 : 0.3);
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = isMobile ? 0.5 : 0.8;
            ctx.globalAlpha = opacity;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    // Draw floating chemical formula text (simplified on mobile)
    function drawFormulas() {
      // Skip formulas on mobile for performance
      if (isMobile) return;
      
      const formulas = ['H₂O', 'CO₂', 'CH₄', 'C₆H₁₂O₆', 'NaCl', 'C₈H₁₀N₄O₂', 'H₂SO₄', 'NH₃'];
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < formulas.length; i++) {
        const x = (Math.sin(time * 0.3 + i) * canvas.width * 0.3) + canvas.width * 0.2 + (i * 80);
        const y = (Math.cos(time * 0.4 + i) * 50) + canvas.height * 0.2 + (i % 3) * 100;
        
        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.shadowBlur = 10;
        ctx.shadowColor = isDark ? '#00F0FF' : '#00B4C8';
        ctx.fillStyle = isDark 
          ? `rgba(0, 240, 255, ${0.1 + Math.sin(time + i) * 0.05})`
          : `rgba(0, 180, 200, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.fillText(formulas[i], x, y);
        ctx.shadowBlur = 0;
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw free particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Update and draw molecules
      molecules.forEach(molecule => {
        molecule.update();
        molecule.draw();
      });
      
      // Draw connections between all particles
      drawConnections();
      
      // Draw floating formulas (skipped on mobile)
      drawFormulas();
      
      animationId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: isMobile ? 0.4 : 1 }}
    />
  );
};

export default MolecularBackground;