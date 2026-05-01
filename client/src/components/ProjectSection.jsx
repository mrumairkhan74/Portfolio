import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    //   Github, 
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

// Mock projects data - will be replaced with API data later
export const projectsData = [
    {
        _id: '1',
        title: 'Wuddy - Social + Professional Network',
        description: 'Real-time chat, communities, and professional networking platform. Combines social features with team communication tools.',
        fullDescription: 'Wuddy is a comprehensive social + professional networking web app where users can connect, chat, and collaborate in real time. It combines features of social platforms and team communication tools, making it easy for professionals to network and share ideas. Built with MERN stack, Socket.io for real-time messaging, and Redux Toolkit for state management.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redux Toolkit', 'Tailwind CSS', 'JWT'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/00F0FF?text=Wuddy+Social+Network',
        likes: 15,
        comments: [
            { id: 1, author: 'TechRecruiter', text: 'Great platform! The real-time chat works flawlessly.', date: '2024-02-10' },
            { id: 2, author: 'DevCommunity', text: 'Love the professional networking features.', date: '2024-02-05' }
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
        fullDescription: 'GeariX is a complete e-commerce solution for automotive parts and accessories. Features include product catalog, shopping cart, user authentication, order management, and secure Stripe payment integration. Built for performance and scalability.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux', 'CSS3'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/8B5CF6?text=GeariX+E-commerce',
        likes: 23,
        comments: [
            { id: 1, author: 'ShopOwner', text: 'The payment integration is seamless!', date: '2024-01-28' }
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
        fullDescription: 'We Chat is a modern messaging platform supporting both one-to-one and group conversations. Features include real-time message delivery, typing indicators, online status, and message history. Built with Socket.io for real-time bidirectional communication.',
        technologies: ['React', 'Express', 'MongoDB', 'Socket.io', 'Node.js', 'CSS3'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/EC4899?text=We+Chat',
        likes: 34,
        comments: [
            { id: 1, author: 'MessengerUser', text: 'Super fast real-time updates!', date: '2024-01-20' },
            { id: 2, author: 'TeamLead', text: 'Group chat works perfectly.', date: '2024-01-18' }
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
        description: 'Project management tool with analytics dashboard for tracking issues and tasks.',
        fullDescription: 'TrackMantis is a comprehensive issue tracking and project management tool. Features include project boards, issue creation/assignment, status tracking, and analytics dashboard with Charts.js visualizations. Perfect for agile development teams.',
        technologies: ['MERN', 'JWT', 'Charts.js', 'Tailwind CSS', 'MongoDB', 'Express'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/00F0FF?text=TrackMantis',
        likes: 19,
        comments: [
            { id: 1, author: 'ProjectManager', text: 'The analytics dashboard is very helpful!', date: '2024-01-12' }
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
        description: 'Curated news platform aggregating content from multiple sources in one interface.',
        fullDescription: 'C-News is a modern news aggregator that fetches and displays curated news from multiple APIs. Features include category filtering, search functionality, responsive design, and real-time updates. Built with React and REST APIs.',
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
    const projectsPerPage = 3;

    const categories = ['all', ...new Set(projectsData.map(p => p.category))];

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    const featuredProjects = projectsData.filter(p => p.featured);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handleLike = (projectId) => {
        // Will be connected to backend later
        console.log('Liked project:', projectId);
    };

    const handleViewProject = (project) => {
        setSelectedProject(project);
    };

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cyber-cyan/5 blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Featured Projects</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                        Here are some of my latest works that showcase my skills and creativity
                    </p>
                </motion.div>

                {/* Featured Projects Carousel */}
                {featuredProjects.length > 0 && (
                    <div className="mb-16">
                        <h3 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ⭐ Featured Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProjects.map((project, idx) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    className="relative cursor-pointer"
                                    onClick={() => handleViewProject(project)}
                                >
                                    <div
                                        className={`rounded-2xl overflow-hidden transition-all duration-300 ${isDark
                                                ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80'
                                                : 'bg-gradient-to-br from-white/80 to-gray-100/80'
                                            } backdrop-blur-sm border ${isDark ? 'border-cyber-cyan/20' : 'border-cyan-200'}`}
                                    >
                                        <div className="relative group overflow-hidden">
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 bg-cyber-cyan/90 text-white text-xs rounded-full">
                                                    Featured
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {project.title}
                                            </h3>
                                            <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                {project.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-3">
                                                    <div className="flex items-center gap-1">
                                                        <Heart size={14} className="text-cyber-pink" />
                                                        <span className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                            {project.likes}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircle size={14} className="text-cyber-cyan" />
                                                        <span className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                            {project.comments.length}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="text-cyber-cyan text-sm hover:underline">
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

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setFilter(cat);
                                setCurrentPage(1);
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
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

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer"
                                onClick={() => handleViewProject(project)}
                            >
                                <div
                                    className={`rounded-2xl overflow-hidden transition-all duration-300 ${isDark
                                            ? 'bg-gray-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyber-cyan/20'
                                            : 'bg-white/70 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-200'
                                        } border ${isDark ? 'border-cyber-cyan/10' : 'border-cyan-100'}`}
                                >
                                    {/* Project Image */}
                                    <div className="relative group overflow-hidden">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Hover Links */}
                                        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {/* <Github size={16} className="text-gray-900" /> */}
                                            </a>
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={16} className="text-gray-900" />
                                            </a>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${isDark
                                                        ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30'
                                                        : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                                                    }`}
                                            >
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-5">
                                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {project.title}
                                        </h3>
                                        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.slice(0, 3).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`text-xs px-2 py-1 rounded-full ${isDark
                                                            ? 'bg-cyber-cyan/10 text-cyber-cyan'
                                                            : 'bg-cyan-100 text-cyan-700'
                                                        }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Likes & Comments */}
                                        <div className={`flex justify-between items-center pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleLike(project._id);
                                                    }}
                                                    className="flex items-center gap-1 transition-colors hover:text-cyber-pink"
                                                >
                                                    <Heart size={16} className="text-cyber-pink" />
                                                    <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                        {project.likes}
                                                    </span>
                                                </button>
                                                <div className="flex items-center gap-1">
                                                    <MessageCircle size={16} className="text-cyber-cyan" />
                                                    <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                        {project.comments.length}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewProject(project);
                                                }}
                                                className={`text-sm flex items-center gap-1 transition-colors ${isDark ? 'text-cyber-cyan hover:text-cyber-purple' : 'text-cyan-600 hover:text-purple-600'
                                                    }`}
                                            >
                                                <Eye size={14} />
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg transition-all ${currentPage === 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : isDark
                                        ? 'bg-white/5 hover:bg-white/10'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>

                        {[...Array(totalPages)].map((_, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === idx + 1
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

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg transition-all ${currentPage === totalPages
                                    ? 'opacity-50 cursor-not-allowed'
                                    : isDark
                                        ? 'bg-white/5 hover:bg-white/10'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                )}

                {/* Project Details Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl ${isDark
                                        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                                        : 'bg-gradient-to-br from-white to-gray-100'
                                    } shadow-2xl`}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                >
                                    <X size={20} className="text-white" />
                                </button>

                                {/* Modal Content */}
                                <div className="p-6 md:p-8">
                                    <img
                                        src={selectedProject.imageUrl}
                                        alt={selectedProject.title}
                                        className="w-full h-64 object-cover rounded-xl mb-6"
                                    />

                                    <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {selectedProject.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${isDark
                                                ? 'bg-cyber-cyan/20 text-cyber-cyan'
                                                : 'bg-cyan-100 text-cyan-700'
                                            }`}>
                                            {selectedProject.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} className="text-cyber-cyan" />
                                            <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                {selectedProject.date}
                                            </span>
                                        </div>
                                    </div>

                                    <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                                        {selectedProject.fullDescription}
                                    </p>

                                    <div className="mb-6">
                                        <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Technologies Used
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`px-3 py-1 rounded-full text-sm ${isDark
                                                            ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                                                            : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                                                        }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Comments ({selectedProject.comments.length})
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedProject.comments.map(comment => (
                                                <div
                                                    key={comment.id}
                                                    className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                                                >
                                                    <div className="flex justify-between mb-1">
                                                        <span className={`font-semibold ${isDark ? 'text-cyber-cyan' : 'text-cyan-700'}`}>
                                                            {comment.author}
                                                        </span>
                                                        <span className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                                            {comment.date}
                                                        </span>
                                                    </div>
                                                    <p className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                                        {comment.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gray-800 text-white hover:bg-gray-700"
                                        >
                                            {/* <Github size={18} /> */}
                                            View Code
                                        </a>
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                                            style={{
                                                background: isDark
                                                    ? 'linear-gradient(135deg, #00F0FF, #8B5CF6)'
                                                    : 'linear-gradient(135deg, #00B4C8, #7850DC)',
                                                color: 'white',
                                            }}
                                        >
                                            <ExternalLink size={18} />
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