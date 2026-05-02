import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    ExternalLink,
    Heart,
    MessageCircle,
    Eye,
    Star,
    Code2,
    Calendar,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react';

// Mock projects data
export const projectsData = [
    {
        _id: '1',
        title: 'Wuddy - Social + Professional Network',
        description: 'Real-time chat, communities, and professional networking platform.',
        fullDescription: 'Wuddy is a comprehensive social + professional networking web app where users can connect, chat, and collaborate in real time.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redux Toolkit', 'Tailwind CSS', 'JWT'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/00F0FF?text=Wuddy',
        likes: 15,
        comments: [
            { id: 1, author: 'TechRecruiter', text: 'Great platform!', date: '2024-02-10' },
            { id: 2, author: 'DevCommunity', text: 'Love the features!', date: '2024-02-05' }
        ],
        githubUrl: 'https://github.com/mrumairkhan74/Wuddy',
        liveUrl: 'https://wuddy.vercel.app',
        category: 'Full Stack',
        featured: true,
        date: '2024-02-01'
    },
    {
        _id: '2',
        title: 'GeariX - Automotive E-commerce',
        description: 'Full-featured e-commerce platform for automotive parts with Stripe payment integration.',
        fullDescription: 'Complete e-commerce solution for automotive parts and accessories with secure payment processing.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux', 'CSS3'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/8B5CF6?text=GeariX',
        likes: 23,
        comments: [
            { id: 1, author: 'ShopOwner', text: 'Payment integration is seamless!', date: '2024-01-28' }
        ],
        githubUrl: 'https://github.com/mrumairkhan74/GeariX',
        liveUrl: 'https://gearix.vercel.app',
        category: 'E-commerce',
        featured: true,
        date: '2024-01-25'
    },
    {
        _id: '3',
        title: 'We Chat - Real-time Messenger',
        description: 'Real-time messaging app with one-to-one and group chat functionality.',
        fullDescription: 'Modern messaging platform supporting one-to-one and group conversations with real-time updates.',
        technologies: ['React', 'Express', 'MongoDB', 'Socket.io', 'Node.js', 'CSS3'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/EC4899?text=We+Chat',
        likes: 34,
        comments: [
            { id: 1, author: 'MessengerUser', text: 'Super fast updates!', date: '2024-01-20' },
            { id: 2, author: 'TeamLead', text: 'Group chat works perfectly!', date: '2024-01-18' }
        ],
        githubUrl: 'https://github.com/mrumairkhan74/WeChat',
        liveUrl: 'https://wechat.vercel.app',
        category: 'Real-time',
        featured: true,
        date: '2024-01-15'
    },
    {
        _id: '4',
        title: 'TrackMantis - Issue Tracker',
        description: 'Project management tool with analytics dashboard.',
        fullDescription: 'Comprehensive issue tracking and project management tool with analytics dashboard.',
        technologies: ['MERN', 'JWT', 'Charts.js', 'Tailwind CSS', 'MongoDB', 'Express'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/00F0FF?text=TrackMantis',
        likes: 19,
        comments: [
            { id: 1, author: 'ProjectManager', text: 'Analytics dashboard is very helpful!', date: '2024-01-12' }
        ],
        githubUrl: 'https://github.com/mrumairkhan74/TrackMantis',
        liveUrl: 'https://trackmantis.vercel.app',
        category: 'Productivity',
        featured: false,
        date: '2024-01-10'
    },
    {
        _id: '5',
        title: 'C-News - News Aggregator',
        description: 'Curated news platform aggregating content from multiple sources.',
        fullDescription: 'Modern news aggregator that fetches and displays curated news from multiple APIs.',
        technologies: ['React', 'REST API', 'CSS3', 'News API', 'Responsive Design'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/8B5CF6?text=C-News',
        likes: 12,
        comments: [],
        githubUrl: 'https://github.com/mrumairkhan74/C-News',
        liveUrl: 'https://cnews-frontend.vercel.app',
        category: 'Frontend',
        featured: false,
        date: '2024-01-05'
    },
];

const ProjectsSection = () => {
    const { isDark } = useTheme();
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const projectsPerPage = 3;

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Get unique categories - limit on mobile
    const categories = ['all', ...new Set(projectsData.map(p => p.category))];
    const visibleCategories = isMobile ? categories.slice(0, 4) : categories;

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    const featuredProjects = projectsData.filter(p => p.featured);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handleLike = (projectId) => {
        console.log('Liked project:', projectId);
    };

    const handleViewProject = (project) => {
        setSelectedProject(project);
    };

    return (
        <section className={`py-12 md:py-20 px-3 md:px-4 relative overflow-hidden`}>
            {/* Background Decoration - Hidden on mobile */}
            {!isMobile && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cyber-cyan/5 blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl" />
                </div>
            )}

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header - Smaller on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 md:mb-12"
                >
                    <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-2 md:mb-4`}>
                        <span className="gradient-text">Featured Projects</span>
                    </h2>
                    {!isMobile && (
                        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                            Here are some of my latest works that showcase my skills and creativity
                        </p>
                    )}
                </motion.div>

                {/* Featured Projects - 2 columns on mobile */}
                {featuredProjects.length > 0 && (
                    <div className="mb-8 md:mb-16">
                        <h3 className={`text-base md:text-2xl font-semibold mb-3 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ⭐ Featured Projects
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {featuredProjects.slice(0, isMobile ? 2 : 3).map((project, idx) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={!isMobile ? { y: -8 } : {}}
                                    className="relative cursor-pointer"
                                    onClick={() => handleViewProject(project)}
                                >
                                    <div
                                        className={`rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${isDark
                                                ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80'
                                                : 'bg-gradient-to-br from-white/80 to-gray-100/80'
                                            } backdrop-blur-sm border ${isDark ? 'border-cyber-cyan/20' : 'border-cyan-200'}`}
                                    >
                                        <div className="relative group overflow-hidden">
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-full h-32 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-1 right-1 md:top-2 md:right-2">
                                                <span className="px-1 md:px-2 py-0.5 md:py-1 bg-cyber-cyan/90 text-white text-[9px] md:text-xs rounded-full">
                                                    Featured
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 md:p-5">
                                            <h3 className={`text-sm md:text-xl font-bold mb-1 md:mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {isMobile && project.title.length > 30 ? project.title.substring(0, 30) + '...' : project.title}
                                            </h3>
                                            {!isMobile && (
                                                <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                    {project.description}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-2 md:gap-3">
                                                    <div className="flex items-center gap-0.5 md:gap-1">
                                                        <Heart size={isMobile ? 10 : 14} className="text-cyber-pink" />
                                                        <span className={`text-[10px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                            {project.likes}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-0.5 md:gap-1">
                                                        <MessageCircle size={isMobile ? 10 : 14} className="text-cyber-cyan" />
                                                        <span className={`text-[10px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                            {project.comments.length}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="text-cyber-cyan text-[10px] md:text-sm hover:underline">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter Buttons - Wrap on mobile */}
                <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 mb-6 md:mb-10">
                    {visibleCategories.map((cat) => (
                        <motion.button
                            key={cat}
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setFilter(cat);
                                setCurrentPage(1);
                            }}
                            className={`px-2 md:px-5 py-1 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition-all duration-300 ${filter === cat
                                    ? isDark
                                        ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white shadow-lg shadow-cyber-cyan/25'
                                        : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                                    : isDark
                                        ? 'bg-white/5 text-text-secondary hover:bg-white/10'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </motion.button>
                    ))}
                </div>

                {/* Projects Grid - 1 column on mobile */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                >
                    <AnimatePresence mode="wait">
                        {currentProjects.map((project, idx) => (
                            <motion.div
                                key={project._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                whileHover={!isMobile ? { y: -8 } : {}}
                                className="group cursor-pointer"
                                onClick={() => handleViewProject(project)}
                            >
                                <div
                                    className={`rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${isDark
                                            ? 'bg-gray-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyber-cyan/20'
                                            : 'bg-white/70 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-200'
                                        } border ${isDark ? 'border-cyber-cyan/10' : 'border-cyan-100'}`}
                                >
                                    <div className="relative group overflow-hidden">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-36 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex gap-1.5 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 md:p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Code2 size={isMobile ? 12 : 16} className="text-gray-900" />
                                            </a>
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 md:p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={isMobile ? 12 : 16} className="text-gray-900" />
                                            </a>
                                        </div>

                                        <div className="absolute top-2 left-2 md:top-3 md:left-3">
                                            <span
                                                className={`px-1 md:px-2 py-0.5 md:py-1 text-[9px] md:text-xs rounded-full ${isDark
                                                        ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30'
                                                        : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                                                    }`}
                                            >
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3 md:p-5">
                                        <h3 className={`text-sm md:text-xl font-bold mb-1 md:mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {isMobile && project.title.length > 40 ? project.title.substring(0, 40) + '...' : project.title}
                                        </h3>
                                        {!isMobile && (
                                            <p className={`text-sm mb-3 md:mb-4 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                {project.description}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                                            {project.technologies.slice(0, isMobile ? 2 : 3).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`text-[9px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded-full ${isDark
                                                            ? 'bg-cyber-cyan/10 text-cyber-cyan'
                                                            : 'bg-cyan-100 text-cyan-700'
                                                        }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > (isMobile ? 2 : 3) && (
                                                <span className={`text-[9px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                                    +{project.technologies.length - (isMobile ? 2 : 3)}
                                                </span>
                                            )}
                                        </div>

                                        <div className={`flex justify-between items-center pt-2 md:pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                            <div className="flex gap-2 md:gap-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleLike(project._id);
                                                    }}
                                                    className="flex items-center gap-0.5 md:gap-1 transition-colors hover:text-cyber-pink"
                                                >
                                                    <Heart size={isMobile ? 12 : 16} className="text-cyber-pink" />
                                                    <span className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                        {project.likes}
                                                    </span>
                                                </button>
                                                <div className="flex items-center gap-0.5 md:gap-1">
                                                    <MessageCircle size={isMobile ? 12 : 16} className="text-cyber-cyan" />
                                                    <span className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                        {project.comments.length}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewProject(project);
                                                }}
                                                className={`text-[10px] md:text-sm flex items-center gap-0.5 md:gap-1 transition-colors ${isDark ? 'text-cyber-cyan hover:text-cyber-purple' : 'text-cyan-600 hover:text-purple-600'
                                                    }`}
                                            >
                                                <Eye size={isMobile ? 10 : 14} />
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination - Smaller on mobile */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-1.5 md:gap-2 mt-8 md:mt-12">
                        <motion.button
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-1.5 md:p-2 rounded-lg transition-all ${currentPage === 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : isDark
                                        ? 'bg-white/5 hover:bg-white/10'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            <ChevronLeft size={isMobile ? 16 : 20} />
                        </motion.button>

                        {[...Array(totalPages)].slice(0, isMobile ? 3 : totalPages).map((_, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={!isMobile ? { scale: 1.05 } : {}}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`w-7 h-7 md:w-10 md:h-10 rounded-lg font-medium transition-all text-sm md:text-base ${currentPage === idx + 1
                                        ? isDark
                                            ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white'
                                            : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                                        : isDark
                                            ? 'bg-white/5 hover:bg-white/10'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {idx + 1}
                            </motion.button>
                        ))}

                        {isMobile && totalPages > 3 && (
                            <span className={`flex items-center px-1 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>...</span>
                        )}

                        <motion.button
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`p-1.5 md:p-2 rounded-lg transition-all ${currentPage === totalPages
                                    ? 'opacity-50 cursor-not-allowed'
                                    : isDark
                                        ? 'bg-white/5 hover:bg-white/10'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            <ChevronRight size={isMobile ? 16 : 20} />
                        </motion.button>
                    </div>
                )}

                {/* Project Details Modal - Mobile optimized */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
                            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl md:rounded-2xl ${isDark
                                        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                                        : 'bg-gradient-to-br from-white to-gray-100'
                                    } shadow-2xl`}
                            >
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-1.5 md:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                >
                                    <X size={isMobile ? 16 : 20} className="text-white" />
                                </button>

                                <div className="p-4 md:p-8">
                                    <img
                                        src={selectedProject.imageUrl}
                                        alt={selectedProject.title}
                                        className="w-full h-40 md:h-64 object-cover rounded-lg md:rounded-xl mb-4 md:mb-6"
                                    />

                                    <h2 className={`text-xl md:text-3xl font-bold mb-2 md:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {selectedProject.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                                        <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full ${isDark
                                                ? 'bg-cyber-cyan/20 text-cyber-cyan'
                                                : 'bg-cyan-100 text-cyan-700'
                                            }`}>
                                            {selectedProject.category}
                                        </span>
                                        <div className="flex items-center gap-0.5 md:gap-1">
                                            <Calendar size={isMobile ? 10 : 14} className="text-cyber-cyan" />
                                            <span className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                {selectedProject.date}
                                            </span>
                                        </div>
                                    </div>

                                    <p className={`text-sm md:text-lg leading-relaxed mb-4 md:mb-6 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                                        {selectedProject.fullDescription}
                                    </p>

                                    <div className="mb-4 md:mb-6">
                                        <h3 className={`text-base md:text-xl font-semibold mb-2 md:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Technologies Used
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                                            {(isMobile ? selectedProject.technologies.slice(0, 6) : selectedProject.technologies).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`text-[10px] md:text-sm px-1.5 md:px-3 py-0.5 md:py-1 rounded-full ${isDark
                                                            ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                                                            : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                                                        }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4 md:mb-6">
                                        <h3 className={`text-base md:text-xl font-semibold mb-2 md:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Comments ({selectedProject.comments.length})
                                        </h3>
                                        <div className="space-y-2 md:space-y-3">
                                            {selectedProject.comments.slice(0, isMobile ? 2 : selectedProject.comments.length).map(comment => (
                                                <div
                                                    key={comment.id}
                                                    className={`p-2 md:p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                                                >
                                                    <div className="flex justify-between mb-0.5 md:mb-1">
                                                        <span className={`text-xs md:text-sm font-semibold ${isDark ? 'text-cyber-cyan' : 'text-cyan-700'}`}>
                                                            {comment.author}
                                                        </span>
                                                        <span className={`text-[8px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                                            {comment.date}
                                                        </span>
                                                    </div>
                                                    <p className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                        {comment.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 md:gap-4">
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-3 md:px-6 py-1.5 md:py-3 text-xs md:text-base rounded-full font-semibold flex items-center justify-center gap-1 md:gap-2 transition-all duration-300 bg-gray-800 text-white hover:bg-gray-700"
                                        >
                                            <Code2 size={isMobile ? 14 : 18} />
                                            View Code
                                        </a>
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-3 md:px-6 py-1.5 md:py-3 text-xs md:text-base rounded-full font-semibold flex items-center justify-center gap-1 md:gap-2 transition-all duration-300"
                                            style={{
                                                background: isDark
                                                    ? 'linear-gradient(135deg, #00F0FF, #8B5CF6)'
                                                    : 'linear-gradient(135deg, #00B4C8, #7850DC)',
                                                color: 'white',
                                            }}
                                        >
                                            <ExternalLink size={isMobile ? 14 : 18} />
                                            Live Demo
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ProjectsSection;