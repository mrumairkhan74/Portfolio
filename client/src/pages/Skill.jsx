import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  Code2,
  Database,
  Server,
  // Cloud,
  // Smartphone,
  // Lock,
  // Zap,
  // GitBranch,
  Terminal,
  Cpu,
  // Globe,
  // Star,
  Award,
  TrendingUp
} from 'lucide-react';

const SkillsPage = () => {
  const { isDark } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Limit skills shown on mobile
  const skillCategories = isMobile ? [
    {
      title: 'Frontend Development',
      icon: Code2,
      color: '#00F0FF',
      skills: [
        { name: 'React.js', level: 90, years: 3 },
        { name: 'Tailwind CSS', level: 85, years: 2 },
        { name: 'JavaScript', level: 70, years: 1.5 },
        { name: 'HTML5/CSS3', level: 90, years: 4 }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: '#8B5CF6',
      skills: [
        { name: 'Node.js', level: 88, years: 3 },
        { name: 'Express.js', level: 90, years: 3 },
        { name: 'RESTful APIs', level: 92, years: 3 },
        { name: 'JWT/Auth', level: 85, years: 2.5 }
      ]
    },
    {
      title: 'Database & DevOps',
      icon: Database,
      color: '#EC4899',
      skills: [
        { name: 'MongoDB', level: 88, years: 3 },
        { name: 'Vercel', level: 85, years: 2.5 },
        { name: 'Render', level: 85, years: 2.5 }
      ]
    },
    {
      title: 'Tools & Others',
      icon: Terminal,
      color: '#10B981',
      skills: [
        { name: 'Git/GitHub', level: 88, years: 3 },
        { name: 'Postman', level: 85, years: 2.5 },
        { name: 'VS Code', level: 90, years: 3 },
        { name: 'Socket.io', level: 80, years: 2 }
      ]
    }
  ] : [
    {
      title: 'Frontend Development',
      icon: Code2,
      color: '#00F0FF',
      skills: [
        { name: 'React.js', level: 90, years: 3 },
        { name: 'Vite.js', level: 75, years: 1.5 },
        { name: 'Tailwind CSS', level: 85, years: 2 },
        { name: 'Redux Toolkit', level: 80, years: 2 },
        { name: 'JavaScript', level: 70, years: 1.5 },
        { name: 'HTML5/CSS3', level: 90, years: 4 }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: '#8B5CF6',
      skills: [
        { name: 'Node.js', level: 88, years: 3 },
        { name: 'Express.js', level: 90, years: 3 },
        { name: 'RESTful APIs', level: 92, years: 3 },
        { name: 'JWT/Auth', level: 85, years: 2.5 },
        { name: 'Cloudinary', level: 85, years: 2.5 },
        { name: 'Bcrypt', level: 85, years: 2.5 }
      ]
    },
    {
      title: 'Database & DevOps',
      icon: Database,
      color: '#EC4899',
      skills: [
        { name: 'MongoDB', level: 88, years: 3 },
        { name: 'PostgreSQL', level: 75, years: 1.5 },
        { name: 'Redis', level: 70, years: 1 },
        { name: 'Docker', level: 65, years: 1 },
        { name: 'Vercel', level: 85, years: 2.5 },
        { name: 'Render', level: 85, years: 2.5 }
      ]
    },
    {
      title: 'Tools & Others',
      icon: Terminal,
      color: '#10B981',
      skills: [
        { name: 'Git/GitHub', level: 88, years: 3 },
        { name: 'Postman', level: 85, years: 2.5 },
        { name: 'VS Code', level: 90, years: 3 },
        { name: 'Figma', level: 70, years: 1.5 },
        { name: 'Socket.io', level: 80, years: 2 },
        { name: 'Jest/Testing', level: 65, years: 1 }
      ]
    }
  ];

  // Show limited certifications on mobile
  const certifications = isMobile ? [
    { name: 'MERN Stack Developer', issuer: 'DevelopersHub', date: '2024', icon: Award },
    { name: 'Full Stack JavaScript', issuer: 'Mind Luster', date: '2024', icon: Award }
  ] : [
    { name: 'MERN Stack Developer', issuer: 'DevelopersHub Corporations', date: '2024', icon: Award },
    { name: 'Full Stack JavaScript', issuer: 'Mind Luster', date: '2024', icon: Award },
    { name: 'Cisco Networking', issuer: 'Cisco', date: '2022', icon: Cpu },
    { name: 'Optimizing MongoDB', issuer: 'Mongo Atlas', date: '2024', icon: Database }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className={`min-h-screen py-16 md:py-20 px-3 md:px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header - Smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-2 md:mb-4`}>
            <span className="gradient-text">My Skills</span>
          </h1>
          {!isMobile && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Technologies and tools I work with to build amazing digital experiences
            </p>
          )}
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 md:space-y-12"
        >
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`rounded-xl md:rounded-2xl p-4 md:p-6 ${
                  isDark ? 'bg-gray-800/50' : 'bg-white'
                } shadow-lg`}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div
                    className="p-1.5 md:p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon size={isMobile ? 20 : 24} style={{ color: category.color }} />
                  </div>
                  <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      onMouseEnter={() => setHoveredSkill(`${idx}-${skillIdx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-gray-700/50 hover:bg-gray-700'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5 md:mb-2">
                        <span className={`font-semibold text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {skill.name}
                        </span>
                        <span className="text-xs md:text-sm text-cyber-cyan">{skill.years}+ yrs</span>
                      </div>
                      <div className="relative h-1.5 md:h-2 bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="absolute h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}cc)`,
                            boxShadow: hoveredSkill === `${idx}-${skillIdx}` ? `0 0 8px ${category.color}` : 'none'
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className={`text-[10px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                          Proficiency
                        </span>
                        <span className={`text-[10px] md:text-xs font-medium`} style={{ color: category.color }}>
                          {skill.level}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications Section - Simplified on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-8 md:mt-12 rounded-xl md:rounded-2xl p-4 md:p-6 ${
            isDark ? 'bg-gray-800/50' : 'bg-white'
          } shadow-lg`}
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple">
              <Award size={isMobile ? 20 : 24} className="text-white" />
            </div>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={!isMobile ? { y: -5 } : {}}
                  className={`p-3 md:p-4 rounded-xl text-center transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-700/50 hover:bg-gray-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center`}>
                    <Icon size={isMobile ? 16 : 20} className="text-white" />
                  </div>
                  <h3 className={`text-sm md:text-base font-semibold mb-0.5 md:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {cert.name}
                  </h3>
                  <p className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                    {cert.issuer} • {cert.date}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Skill Stats - 2 columns on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { value: '12+', label: 'Projects', icon: Code2 },
            { value: '10+', label: 'Technologies', icon: Cpu },
            { value: '5+', label: 'Certifications', icon: Award },
            { value: '3+', label: 'Experience', icon: TrendingUp }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                className={`p-3 md:p-4 rounded-xl text-center ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                    : 'bg-gradient-to-br from-white to-gray-100'
                } shadow-lg`}
              >
                <Icon size={isMobile ? 22 : 28} className="mx-auto mb-1.5 md:mb-2 text-cyber-cyan" />
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;