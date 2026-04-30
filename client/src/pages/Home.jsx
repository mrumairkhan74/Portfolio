// import React from 'react';
// import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MolecularBackground from '../components/MolecularBackground';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectSection';

const Home = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Custom Molecular Background */}
      <MolecularBackground />
      
      {/* Subtle gradient overlay for depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 30%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))'
            : 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.3), rgba(248, 250, 252, 0.9))',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <ProjectsSection />
      </div>
    </div>
  );
};

export default Home;