import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentTech, setCurrentTech] = useState('');
  const [showLoading, setShowLoading] = useState(true);

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

  // Animate tech stack text
  useEffect(() => {
    let techIndex = 0;
    const techInterval = setInterval(() => {
      setCurrentTech(techStack[techIndex % techStack.length]);
      techIndex++;
    }, 400);
    return () => clearInterval(techInterval);
  }, []);

  // Progress and phase completion
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.67; // Complete in ~3 seconds (60 frames)
      });
    }, 30);

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
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
      clearTimeout(timeout);
    };
  }, [onComplete, progress]);

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
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] }
          }}
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-pink/5 rounded-full blur-3xl animate-pulse delay-2000" />
          </div>

          {/* Floating Code Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-cyber-cyan/10 font-mono text-xs"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0
                }}
                animate={{
                  y: [null, -50, -100],
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                {['{', '}', '()', '=>', 'const', 'let', '</>', '[]'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            {/* Name with Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="text-center mb-8"
            >
              <div className="relative">
                {/* Glow behind name */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink blur-2xl opacity-20" />
                
                <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                  Umair Khan
                </h1>
                
                {/* Underline animation */}
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink absolute bottom-0 left-0"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-cyber-cyan/80 font-mono text-sm mt-4"
              >
                MERN Stack Developer
              </motion.p>
            </motion.div>

            {/* Role Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full blur-md opacity-50" />
                <div className="relative px-6 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-cyber-cyan/30">
                  <span className="text-cyber-cyan font-mono text-sm tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                    FULL STACK DEVELOPER
                    <span className="w-2 h-2 rounded-full bg-cyber-pink animate-pulse delay-150" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-cyber-cyan/20">
                <span className="text-cyber-cyan/60 text-sm">Stacking:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTech}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-cyber-purple font-mono text-sm font-semibold"
                  >
                    {currentTech}
                  </motion.span>
                </AnimatePresence>
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
              </div>
            </motion.div>

            {/* Progress Section */}
            <div className="w-full max-w-md mb-6">
              {/* Progress Bar Label */}
              <div className="flex justify-between text-cyber-cyan/60 font-mono text-xs mb-2">
                <span>BUILDING PORTFOLIO</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="bg-gray-900/50 rounded-full h-2 overflow-hidden border border-cyber-cyan/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                {/* Progress Glow */}
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
              </div>
            </div>

            {/* Development Phases */}
            <div className="space-y-2 mb-8 w-full max-w-md">
              {phases.map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 text-center">
                    {phase.completed ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-cyber-cyan"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-cyber-cyan/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{phase.icon}</span>
                      <span className={`text-sm font-mono ${phase.completed ? 'text-cyber-cyan' : 'text-cyber-cyan/40'}`}>
                        {phase.phase}
                      </span>
                    </div>
                    {phase.completed && (
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
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-center"
            >
              <p className="text-cyber-cyan/40 font-mono text-xs tracking-wider">
                {progress === 100 
                  ? "✨ Welcome to my creative space ✨" 
                  : "⚡ Crafting digital experiences ⚡"}
              </p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="fixed bottom-6 left-6 flex gap-3">
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-cyber-cyan animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-cyber-purple animate-pulse delay-150" />
                <div className="w-1 h-1 rounded-full bg-cyber-pink animate-pulse delay-300" />
              </div>
              <p className="text-cyber-cyan/20 font-mono text-[10px]">MERN Stack • 2024</p>
            </div>

            <div className="fixed bottom-6 right-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border border-cyber-cyan/20 flex items-center justify-center"
              >
                <div className="w-1 h-1 rounded-full bg-cyber-cyan" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;