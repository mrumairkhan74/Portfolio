import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    Code2,
    Database,
    Server,
    Cloud,
    Lock,
    Zap,
    GitBranch,
    Terminal,
    Cpu,
    Award,
    TrendingUp,
    Globe
} from 'lucide-react';

const HomeSkills = () => {
    const { isDark } = useTheme();
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Simple scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Limit skills shown on mobile
    const skills = isMobile ? [
        { name: 'React.js', icon: Code2, level: 90, color: '#00F0FF', years: 3 },
        { name: 'Node.js', icon: Server, level: 88, color: '#8B5CF6', years: 3 },
        { name: 'Express.js', icon: Zap, level: 90, color: '#EC4899', years: 3 },
        { name: 'MongoDB', icon: Database, level: 88, color: '#10B981', years: 3 },
    ] : [
        { name: 'React.js', icon: Code2, level: 90, color: '#00F0FF', years: 3 },
        { name: 'Node.js', icon: Server, level: 88, color: '#8B5CF6', years: 3 },
        { name: 'Express.js', icon: Zap, level: 90, color: '#EC4899', years: 3 },
        { name: 'MongoDB', icon: Database, level: 88, color: '#10B981', years: 3 },
        { name: 'Tailwind CSS', icon: Globe, level: 85, color: '#00F0FF', years: 2 },
        { name: 'Socket.io', icon: Cloud, level: 80, color: '#8B5CF6', years: 2 },
        { name: 'Git/GitHub', icon: GitBranch, level: 88, color: '#EC4899', years: 3 },
        { name: 'REST APIs', icon: Terminal, level: 92, color: '#10B981', years: 3 },
    ];

    const featuredSkills = [
        { name: 'MERN Stack', description: 'Full-stack development with MongoDB, Express, React, Node.js', icon: Code2 },
        { name: 'Real-time Apps', description: 'Socket.io, WebSockets, live chat applications', icon: Zap },
        { name: 'API Integration', description: 'RESTful APIs, Third-party services, Payment gateways', icon: Cloud },
        { name: 'Authentication', description: 'JWT, OAuth, bcrypt, session management', icon: Lock },
    ];

    const myOtherSkills = [
        { name: 'TypeScript' },
        { name: 'Next.js' },
        { name: 'Python' },
        { name: 'PostgreSQL' },
        { name: 'Redis' },
        { name: 'Docker' },
        { name: 'Figma' },
        { name: 'Jest' },
        { name: 'Webpack' },
        { name: 'Vite' },
        { name: 'AWS' },
        { name: 'Vercel' },
        { name: 'Stripe API' },
        { name: 'Firebase' },
        { name: 'Redux Toolkit' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <section className={`py-12 md:py-20 px-3 md:px-4 relative overflow-hidden`} ref={sectionRef}>
            {/* Background Decoration - Hidden on mobile */}
            {!isMobile && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-cyber-cyan/5 blur-3xl" />
                    <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl" />
                </div>
            )}

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header - Smaller on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6 md:mb-12"
                >
                    <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-2 md:mb-4`}>
                        <span className="gradient-text">Technical Skills</span>
                    </h2>
                    {!isMobile && (
                        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                            Technologies and tools I specialize in to build modern web applications
                        </p>
                    )}
                </motion.div>

                {/* Featured Skills Cards - Smaller on mobile */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12"
                >
                    {featuredSkills.map((skill, idx) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={!isMobile ? { y: -8, scale: 1.02 } : {}}
                                className={`p-3 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 ${isDark
                                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl hover:shadow-cyber-cyan/20'
                                    : 'bg-white hover:shadow-2xl'
                                    } border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
                            >
                                <div className={`w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 rounded-lg md:rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center`}>
                                    <Icon size={isMobile ? 20 : 28} className="text-white" />
                                </div>
                                <h3 className={`text-sm md:text-xl font-bold mb-1 md:mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {skill.name}
                                </h3>
                                <p className={`text-[11px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                    {isMobile ? skill.description.substring(0, 50) + '...' : skill.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Skills Grid with Progress Bars */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className={`rounded-xl md:rounded-2xl p-4 md:p-6 ${isDark ? 'bg-gray-800/50' : 'bg-white'
                        } shadow-lg`}
                >
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                        <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple">
                            <Cpu size={isMobile ? 18 : 24} className="text-white" />
                        </div>
                        <h3 className={`text-lg md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Core Competencies
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {skills.map((skill, idx) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    onMouseEnter={() => setHoveredSkill(idx)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    className="space-y-1.5 md:space-y-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            <Icon size={isMobile ? 14 : 18} style={{ color: skill.color }} />
                                            <span className={`text-sm md:text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {skill.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 md:gap-3">
                                            <span className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                                {skill.years}+ yrs
                                            </span>
                                            <span className={`text-[10px] md:text-sm font-semibold`} style={{ color: skill.color }}>
                                                {skill.level}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative h-1 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={isVisible ? { width: `${skill.level}%` } : {}}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                            className="absolute h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                                                boxShadow: hoveredSkill === idx ? `0 0 8px ${skill.color}` : 'none'
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Additional Skills Tags - Fewer tags on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`mt-6 md:mt-8 rounded-xl md:rounded-2xl p-4 md:p-6 ${isDark ? 'bg-gray-800/50' : 'bg-white'
                        } shadow-lg`}
                >
                    <h3 className={`text-base md:text-xl font-bold mb-2 md:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Other Technologies & Tools
                    </h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-3">
                        {(isMobile ? myOtherSkills.slice(0, 8) : myOtherSkills).map((skill, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.3, delay: idx * 0.01 }}
                                whileHover={!isMobile ? { scale: 1.05 } : {}}
                                className={`px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-full text-[10px] md:text-sm transition-all duration-300 ${isDark
                                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20'
                                    : 'bg-cyan-100 text-cyan-700 border border-cyan-300 hover:bg-cyan-200'
                                    }`}
                            >
                                {skill.name}
                            </motion.span>
                        ))}
                        {isMobile && myOtherSkills.length > 8 && (
                            <span className={`px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-full text-[10px] md:text-sm ${isDark
                                ? 'bg-gray-700 text-text-secondary'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                                +{myOtherSkills.length - 8} more
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* Skill Stats - 2 columns on mobile */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"
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
                                className={`p-2 md:p-4 rounded-lg md:rounded-xl text-center transition-all duration-300 ${isDark
                                    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                                    : 'bg-gradient-to-br from-white to-gray-100'
                                    } shadow-md md:shadow-lg`}
                            >
                                <Icon size={isMobile ? 20 : 28} className="mx-auto mb-1 md:mb-2 text-cyber-cyan" />
                                <div className={`text-sm md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {stat.value}
                                </div>
                                <div className={`text-[9px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Call to Action - Smaller on mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8 md:mt-12 text-center"
                >
                    <a href="/skills">
                        <motion.button
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 md:px-8 py-1.5 md:py-3 text-sm md:text-base rounded-full font-semibold transition-all duration-300 ${isDark
                                ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/30'
                                : 'bg-cyan-100 text-cyan-700 border border-cyan-300 hover:bg-cyan-200'
                                }`}
                        >
                            View All Skills →
                        </motion.button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeSkills;