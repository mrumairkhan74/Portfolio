import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import profileImg from '../../public/blue-bg-pfp.jpg'
import {
    //   Github, 
    //   Linkedin, 
    //   Twitter, 
    Mail,
    Download,
    Sparkles,
    ArrowRight,
    Code2,
    Database,
    Cloud,
    Users,
    MapPin,
    Briefcase,
    GraduationCap,
    Award
} from 'lucide-react';

const HeroSection = () => {
    const { isDark } = useTheme();
    const [borderPhase, setBorderPhase] = useState(0);

    // Animated border effect - changes every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setBorderPhase((prev) => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Neon border animations based on phase
    const getBorderGradient = () => {
        const gradients = [
            'linear-gradient(135deg, #00F0FF, #8B5CF6, #EC4899, #00F0FF)',
            'linear-gradient(135deg, #EC4899, #00F0FF, #8B5CF6, #EC4899)',
            'linear-gradient(135deg, #8B5CF6, #EC4899, #00F0FF, #8B5CF6)',
            'linear-gradient(135deg, #00F0FF, #EC4899, #8B5CF6, #00F0FF)',
        ];
        return gradients[borderPhase];
    };

    const getShadowGlow = () => {
        const shadows = [
            '0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)',
            '0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(0, 240, 255, 0.2)',
            '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)',
            '0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)',
        ];
        return shadows[borderPhase];
    };

    const stats = [
        { value: '3+', label: 'Years Experience', icon: Briefcase },
        { value: '15+', label: 'Projects Completed', icon: Code2 },
        { value: '5+', label: 'Happy Clients', icon: Users },
        { value: '10+', label: 'Technologies', icon: Database },
    ];

    const personalInfo = [
        { icon: MapPin, label: 'Location', value: 'Jand,Attock' },
        { icon: GraduationCap, label: 'Education', value: 'B.S. Software Engineering' },
        { icon: Award, label: 'Certifications', value: 'MERN Stack, FullStack' },
    ];

    const MySkills = [
        'React',
        'Node.js',
        'ExpressJs',
        'MongoDB',
        'Cloudinary',
        'JavaScript',
        'Brevo Mail',
        'Authentication',
        '3rd Party Api',
    ]

    //   const socialLinks = [
    //     { icon: Github, href: 'https://github.com', label: 'GitHub', color: '#333' },
    //     { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0077b5' },
    //     { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: '#1DA1F2' },
    //     { icon: Mail, href: 'mailto:hello@example.com', label: 'Email', color: '#EA4335' },
    //   ];

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            background: isDark ? '#00F0FF' : '#00B4C8',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                            opacity: 0.3,
                        }}
                    />
                ))}
            </div>

            <div className="container rounded-md mx-auto max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Personal Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: isDark
                                    ? 'rgba(0, 240, 255, 0.1)'
                                    : 'rgba(0, 180, 200, 0.1)',
                                border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 180, 200, 0.3)'}`,
                            }}
                        >
                            <Sparkles
                                size={16}
                                className={isDark ? 'text-cyber-cyan' : 'text-cyan-600'}
                            />
                            <span
                                className={`text-sm font-medium ${isDark ? 'text-cyber-cyan' : 'text-cyan-700'}`}
                            >
                                Available for Work
                            </span>
                        </div>

                        {/* Name & Title */}
                        <div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                                <span className="gradient-text">Umair Khan</span>
                            </h1>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className={`text-xl md:text-2xl ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                    Full Stack Developer
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'bg-cyan-100 text-cyan-700'}`}>
                                    AI Specialist
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={`text-lg ${isDark ? 'text-text-secondary' : 'text-gray-600'} leading-relaxed`}>
                            Building cutting-edge web applications with AI integration.
                            Specialized in MERN stack, cloud architecture, and creating
                            seamless digital experiences that define the future of technology.
                        </p>

                        {/* Personal Info List */}
                        <div className="space-y-3">
                            {personalInfo.map((info, idx) => {
                                const Icon = info.icon;
                                return (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Icon size={18} className={isDark ? 'text-cyber-cyan' : 'text-cyan-600'} />
                                        <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                            <span className="font-semibold">{info.label}:</span> {info.value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <motion.a
                                href="/resume.pdf"
                                download
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                                style={{
                                    background: isDark
                                        ? 'linear-gradient(135deg, #00F0FF, #8B5CF6)'
                                        : 'linear-gradient(135deg, #00B4C8, #7850DC)',
                                    color: 'white',
                                    boxShadow: isDark
                                        ? '0 0 20px rgba(0, 240, 255, 0.3)'
                                        : '0 4px 15px rgba(0, 180, 200, 0.3)',
                                }}
                            >
                                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                                Download CV
                            </motion.a>

                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 border ${isDark
                                    ? 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
                                    : 'border-cyan-400 text-cyan-700 hover:bg-cyan-50'
                                    }`}
                            >
                                Hire Me
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                        </div>

                        {/* Social Links */}
                        {/* <div className="flex gap-4 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={{ color: social.color }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div> */}
                    </motion.div>

                    {/* Right Side - Glass Card with Animated Border */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Animated Border Wrapper */}
                        <div
                            className="relative p-[2px] rounded-2xl animate-pulse-slow"
                            style={{
                                background: getBorderGradient(),
                                backgroundSize: '200% 200%',
                                animation: 'borderRotate 2s linear infinite',
                                boxShadow: getShadowGlow(),
                            }}
                        >
                            {/* Glass Card Content */}
                            <div
                                className={`relative rounded-2xl p-8 backdrop-blur-xl ${isDark
                                    ? 'bg-gray-900/40'
                                    : 'bg-white/40'
                                    }`}
                                style={{
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                {/* Profile Image Placeholder */}
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-cyber-cyan/50 shadow-xl">
                                        <div
                                            className="w-full h-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center"
                                        >
                                            <img src={profileImg} alt="" />
                                        </div>
                                    </div>
                                    <div
                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                                        style={{
                                            background: isDark
                                                ? 'rgba(0, 240, 255, 0.2)'
                                                : 'rgba(0, 180, 200, 0.2)',
                                            border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 180, 200, 0.3)'}`,
                                            color: isDark ? '#00F0FF' : '#00B4C8',
                                        }}
                                    >
                                        Available
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {stats.map((stat, idx) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div
                                                key={idx}
                                                className={`text-center p-3 rounded-xl ${isDark
                                                    ? 'bg-white/5'
                                                    : 'bg-gray-100/50'
                                                    }`}
                                            >
                                                <Icon
                                                    size={24}
                                                    className={`mx-auto mb-1 ${isDark ? 'text-cyber-cyan' : 'text-cyan-600'}`}
                                                />
                                                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {stat.value}
                                                </div>
                                                <div className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                    {stat.label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Skills Tags */}
                                <div className="space-y-3">
                                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Core Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {MySkills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${isDark
                                                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                                                    : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                                                    }`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="mt-6 pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                            ⚡ Fast Delivery
                                        </span>
                                        <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                            🎯 100% Satisfaction
                                        </span>
                                        <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                            💡 Innovation
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Add CSS animations */}
            <style jsx>{`
        @keyframes borderRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
          }
        }
        
        .animate-border {
          animation: borderRotate 2s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default HeroSection;