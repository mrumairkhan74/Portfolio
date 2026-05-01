import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  Code2,
  Database,
  Server,
  Cloud,
  Smartphone,
  Lock,
  Zap,
  GitBranch,
//   Figma,
  Terminal,
  Cpu,
  Globe,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';

const SkillsPage = () => {
  const { isDark } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
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
        { name: 'Bcrypt', level: 85, years: 2.5 },
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

  const certifications = [
    { name: 'MERN Stack Developer', issuer: 'DevelopersHub Corporations', date: '2024', icon: Award },
    { name: 'Full Stack JavaScript', issuer: 'Mind Luster', date: '2024', icon: Award },
    { name: 'Cisco Networking', issuer: 'Cisco', date: '2022', icon: Cpu },
    { name: 'Optimizing MongoDB', issuer: 'Mongo Altas', date: '2024', icon: Database }
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
    <div className={`min-h-screen py-20 px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">My Skills</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            Technologies and tools I work with to build amazing digital experiences
          </p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`rounded-2xl p-6 ${
                  isDark ? 'bg-gray-800/50' : 'bg-white'
                } shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon size={24} style={{ color: category.color }} />
                  </div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      whileHover={{ scale: 1.02 }}
                      onMouseEnter={() => setHoveredSkill(`${idx}-${skillIdx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        isDark
                          ? 'bg-gray-700/50 hover:bg-gray-700'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {skill.name}
                        </span>
                        <span className="text-sm text-cyber-cyan">{skill.years}+ years</span>
                      </div>
                      <div className="relative h-2 bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="absolute h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}cc)`,
                            boxShadow: hoveredSkill === `${idx}-${skillIdx}` ? `0 0 10px ${category.color}` : 'none'
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                          Proficiency
                        </span>
                        <span className={`text-xs font-medium`} style={{ color: category.color }}>
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

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 rounded-2xl p-6 ${
            isDark ? 'bg-gray-800/50' : 'bg-white'
          } shadow-lg`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple">
              <Award size={24} className="text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-700/50 hover:bg-gray-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {cert.name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                    {cert.issuer} • {cert.date}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Skill Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '12+', label: 'Projects Completed', icon: Code2 },
            { value: '10+', label: 'Technologies', icon: Cpu },
            { value: '5+', label: 'Certifications', icon: Award },
            { value: '3+', label: 'Years Experience', icon: TrendingUp }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl text-center ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                    : 'bg-gradient-to-br from-white to-gray-100'
                } shadow-lg`}
              >
                <Icon size={28} className="mx-auto mb-2 text-cyber-cyan" />
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
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