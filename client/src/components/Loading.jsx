import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentTech, setCurrentTech] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const animationRef = useRef(null);

  const techStack = [
    'MongoDB',
    'Express.js',
    'React.js',
    'Node.js',
    'Tailwind CSS',
    'Framer Motion',
    'Redux Toolkit',
    'JWT Auth'
  ];

  const developmentPhases = [
    { phase: 'Initializing Environment', icon: '⚙️', completed: false },
    { phase: 'Loading Dependencies', icon: '📦', completed: false },
    { phase: 'Compiling Assets', icon: '🎨', completed: false },
    { phase: 'Starting Development Server', icon: '🚀', completed: false },
    { phase: 'Ready to Create', icon: '✨', completed: false },
  ];

  const [phases, setPhases] = useState(developmentPhases);

  // Detect mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkMotionPreference = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReducedMotion(prefersReduced);
    };
    
    checkMobile();
    checkMotionPreference();
    
    window.addEventListener('resize', checkMobile);
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkMotionPreference);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Animate tech stack text
  useEffect(() => {
    let techIndex = 0;
    const techInterval = setInterval(() => {
      setCurrentTech(techStack[techIndex % techStack.length]);
      techIndex++;
    }, 400);
    return () => clearInterval(techInterval);
  }, []);

  // Progress and phase completion - Optimized for mobile
  useEffect(() => {
    // Use requestAnimationFrame for smoother animation on mobile
    let startTime = null;
    const duration = 3000; // 3 seconds
    
    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animateProgress);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateProgress);
    
    // Update phases based on progress
    const phaseInterval = setInterval(() => {
      setPhases(prev => {
        const newPhases = [...prev];
        const completedCount = Math.floor(progress / 20);
        for (let i = 0; i < newPhases.length; i++) {
          newPhases[i].completed = i < completedCount;
        }
        return newPhases;
      });
    }, 100);
    
    // Auto complete after 3 seconds
    const timeout = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(phaseInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Reduced particle count and animations for mobile
  const particleCount = isMobile ? 12 : 30;
  const particleAnimationDuration = isMobile ? 4 : 5;
  const glowSize = isMobile ? 'w-48 h-48' : 'w-96 h-96';

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 20% 0%, #0A0A0F 0%, #06060C 50%, #020206 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            opacity: 0,
            transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] }
          }}
        >
          {/* Optimized Background Glow for Mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-0 left-1/4 ${glowSize} bg-cyber-cyan/5 rounded-full blur-3xl ${!reducedMotion && 'animate-pulse'}`} />
            <div className={`absolute bottom-0 right-1/4 ${glowSize} bg-cyber-purple/5 rounded-full blur-3xl ${!reducedMotion && 'animate-pulse delay-1000'}`} />
            {!isMobile && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-pink/5 rounded-full blur-3xl animate-pulse delay-2000" />
            )}
          </div>

          {/* Floating Code Particles - Reduced on Mobile */}
          {!reducedMotion && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(particleCount)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-cyber-cyan/10 font-mono"
                  style={{ fontSize: isMobile ? '8px' : '12px' }}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0
                  }}
                  animate={{
                    y: [null, -30, -60],
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{
                    duration: Math.random() * particleAnimationDuration + 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                >
                  {['{', '}', '()', '</>', '[]'][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}
            </div>
          )}

          {/* Main Content - Mobile Optimized */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
            {/* Name Section - Mobile Optimized */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              className="text-center mb-6 md:mb-8"
            >
              <div className="relative">
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink blur-2xl opacity-20" />
                )}
                
                <h1 className="relative text-3xl md:text-7xl font-bold bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                  Umair Khan
                </h1>
                
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink mx-auto mt-1 md:mt-2"
                  style={{ width: isMobile ? '60%' : '100%' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-cyber-cyan/80 font-mono text-xs md:text-sm mt-2 md:mt-4"
              >
                MERN Stack Developer
              </motion.p>
            </motion.div>

            {/* Role Badge - Optimized for Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6 md:mb-8"
            >
              <div className="relative">
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full blur-md opacity-50" />
                )}
                <div className="relative px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-black/40 backdrop-blur-sm border border-cyber-cyan/30">
                  <span className="text-cyber-cyan font-mono text-[10px] md:text-sm tracking-wider flex items-center gap-1 md:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                    FULL STACK DEVELOPER
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink animate-pulse delay-150" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack Carousel - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 md:mb-8 w-full max-w-[280px] md:max-w-md"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 bg-black/30 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-cyber-cyan/20">
                <span className="text-cyber-cyan/60 text-[10px] md:text-sm">Stacking:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTech}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-cyber-purple font-mono text-[10px] md:text-sm font-semibold"
                  >
                    {currentTech}
                  </motion.span>
                </AnimatePresence>
                {!isMobile && (
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Progress Section - Mobile Optimized */}
            <div className="w-full max-w-[280px] md:max-w-md mb-6 md:mb-8">
              <div className="flex justify-between text-cyber-cyan/60 font-mono text-[8px] md:text-xs mb-2">
                <span>BUILDING PORTFOLIO</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              <div className="relative">
                <div className="bg-gray-900/50 rounded-full h-1.5 md:h-2 overflow-hidden border border-cyber-cyan/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
                    style={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>
                
                {/* Progress Glow - Disabled on Mobile for performance */}
                {!isMobile && (
                  <motion.div
                    className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent blur-sm"
                    animate={{
                      left: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ left: `${progress}%` }}
                  />
                )}
              </div>
            </div>

            {/* Development Phases - Vertical Stack on Mobile */}
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 w-full max-w-[280px] md:max-w-md">
              {phases.map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div className="w-5 md:w-6 text-center">
                    {phase.completed ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-cyber-cyan text-xs md:text-sm"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-cyber-cyan/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="text-sm md:text-lg">{phase.icon}</span>
                      <span className={`text-[10px] md:text-sm font-mono ${phase.completed ? 'text-cyber-cyan' : 'text-cyber-cyan/40'}`}>
                        {phase.phase}
                      </span>
                    </div>
                    {phase.completed && !isMobile && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="h-[1px] bg-gradient-to-r from-cyber-cyan/50 to-transparent"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status Message */}
            <motion.div
              animate={!reducedMotion ? {
                opacity: [0.5, 1, 0.5],
              } : { opacity: 0.7 }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-center"
            >
              <p className="text-cyber-cyan/40 font-mono text-[8px] md:text-xs tracking-wider">
                {progress === 100 
                  ? "✨ Welcome to my creative space ✨" 
                  : "⚡ Crafting digital experiences ⚡"}
              </p>
            </motion.div>

            {/* Decorative Elements - Simplified for Mobile */}
            <div className="fixed bottom-3 left-3 md:bottom-6 md:left-6">
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-cyber-cyan animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-cyber-purple animate-pulse delay-150" />
                <div className="w-1 h-1 rounded-full bg-cyber-pink animate-pulse delay-300" />
              </div>
              {!isMobile && (
                <p className="text-cyber-cyan/20 font-mono text-[10px] mt-1">MERN Stack • 2024</p>
              )}
            </div>

            {!isMobile && (
              <div className="fixed bottom-6 right-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full border border-cyber-cyan/20 flex items-center justify-center"
                >
                  <div className="w-1 h-1 rounded-full bg-cyber-cyan" />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;