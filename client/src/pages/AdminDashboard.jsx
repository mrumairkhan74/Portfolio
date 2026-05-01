import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { projectsData as initialProjects } from '../components/ProjectSection';
import { blogPosts as initialBlogPosts } from '../data/blogData';
import {
    LayoutDashboard,
    FolderGit2,
    BookOpen,
    MessageCircle,
    Heart,
    Plus,
    Edit,
    Trash2,
    X,
    Save,
    LogOut,
    ChevronRight,
    BarChart3,
    Menu,
    User,
    ChevronLeft
} from 'lucide-react';

const AdminDashboard = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [projects, setProjects] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true); // Start open on desktop
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        excerpt: '',
        content: '',
        technologies: '',
        imageUrl: '',
        category: '',
        tags: '',
        githubUrl: '',
        liveUrl: ''
    });

    // Load data
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }

        // Load projects from localStorage or use initial
        const savedProjects = localStorage.getItem('admin_projects');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        } else {
            setProjects(initialProjects);
            localStorage.setItem('admin_projects', JSON.stringify(initialProjects));
        }

        // Load blog posts from localStorage or use initial
        const savedBlogs = localStorage.getItem('admin_blogs');
        if (savedBlogs) {
            setBlogPosts(JSON.parse(savedBlogs));
        } else {
            setBlogPosts(initialBlogPosts);
            localStorage.setItem('admin_blogs', JSON.stringify(initialBlogPosts));
        }
    }, [navigate]);

    // Handle responsive sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    const handleDelete = (type, id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            if (type === 'project') {
                const updated = projects.filter(p => p.id !== id);
                setProjects(updated);
                localStorage.setItem('admin_projects', JSON.stringify(updated));
            } else if (type === 'blog') {
                const updated = blogPosts.filter(b => b.id !== id);
                setBlogPosts(updated);
                localStorage.setItem('admin_blogs', JSON.stringify(updated));
            }
        }
    };

    const handleEdit = (type, item) => {
        setEditingItem({ type, ...item });
        setFormData({
            title: item.title || '',
            description: item.description || '',
            excerpt: item.excerpt || '',
            content: item.content || '',
            technologies: item.technologies?.join(', ') || '',
            imageUrl: item.imageUrl || '',
            category: item.category || '',
            tags: item.tags?.join(', ') || '',
            githubUrl: item.githubUrl || '',
            liveUrl: item.liveUrl || ''
        });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingItem.type === 'project') {
            const updatedProject = {
                ...editingItem,
                title: formData.title,
                description: formData.description,
                technologies: formData.technologies.split(',').map(t => t.trim()),
                imageUrl: formData.imageUrl,
                category: formData.category,
                githubUrl: formData.githubUrl,
                liveUrl: formData.liveUrl
            };

            let updatedProjects;
            if (editingItem.id) {
                updatedProjects = projects.map(p => p.id === editingItem.id ? updatedProject : p);
            } else {
                updatedProject.id = Date.now().toString();
                updatedProject.date = new Date().toISOString().split('T')[0];
                updatedProject.likes = 0;
                updatedProject.comments = [];
                updatedProjects = [updatedProject, ...projects];
            }

            setProjects(updatedProjects);
            localStorage.setItem('admin_projects', JSON.stringify(updatedProjects));
        } else if (editingItem.type === 'blog') {
            const updatedBlog = {
                ...editingItem,
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                imageUrl: formData.imageUrl,
                category: formData.category,
                tags: formData.tags.split(',').map(t => t.trim())
            };

            let updatedBlogs;
            if (editingItem.id) {
                updatedBlogs = blogPosts.map(b => b.id === editingItem.id ? updatedBlog : b);
            } else {
                updatedBlog.id = Date.now().toString();
                updatedBlog.date = new Date().toISOString().split('T')[0];
                updatedBlog.author = 'Umair Khan';
                updatedBlog.readTime = '5 min read';
                updatedBlog.likes = 0;
                updatedBlog.comments = 0;
                updatedBlogs = [updatedBlog, ...blogPosts];
            }

            setBlogPosts(updatedBlogs);
            localStorage.setItem('admin_blogs', JSON.stringify(updatedBlogs));
        }

        setShowModal(false);
        setEditingItem(null);
        setFormData({});
    };

    const stats = [
        { label: 'Total Projects', value: projects.length, icon: FolderGit2, color: 'from-cyber-cyan to-cyan-600' },
        { label: 'Blog Posts', value: blogPosts.length, icon: BookOpen, color: 'from-cyber-purple to-purple-600' },
        { label: 'Total Likes', value: projects.reduce((sum, p) => sum + (p.likes || 0), 0) + blogPosts.reduce((sum, b) => sum + (b.likes || 0), 0), icon: Heart, color: 'from-cyber-pink to-pink-600' },
        { label: 'Total Comments', value: projects.reduce((sum, p) => sum + (p.comments?.length || 0), 0) + blogPosts.reduce((sum, b) => sum + (b.comments || 0), 0), icon: MessageCircle, color: 'from-cyan-500 to-blue-600' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'blogs', label: 'Blog Posts', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    // Get admin user info
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    return (
        <div className={`min-h-screen ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
            {/* Top Navigation Bar */}
            <div className={`fixed top-0 left-0 right-0 z-30 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between px-4 md:px-6 py-3">
                    {/* Left side - Menu buttons + Logo */}
                    <div className="flex items-center gap-3">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-cyan lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        
                        {/* Desktop sidebar toggle button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden lg:flex p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-cyan"
                            title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                        >
                            {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                        </button>
                        
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center">
                                <LayoutDashboard size={16} className="text-white" />
                            </div>
                            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Panel</span>
                        </div>
                    </div>

                    {/* Right side - User info */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center">
                                <User size={14} className="text-white" />
                            </div>
                            <span className={`text-sm hidden md:inline ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                {adminUser.email || 'Admin'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className={`p-2 rounded-lg transition-all duration-300 ${isDark
                                    ? 'hover:bg-red-500/10 text-red-400'
                                    : 'hover:bg-red-50 text-red-600'
                                }`}
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Below top bar */}
            <aside className={`fixed left-0 top-[57px] bottom-0 z-40 transition-all duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } w-64 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}>
                <div className="h-full flex flex-col">
                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    if (window.innerWidth < 1024) {
                                        setSidebarOpen(false);
                                    }
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan'
                                        : isDark
                                            ? 'text-text-secondary hover:bg-white/5'
                                            : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <tab.icon size={18} />
                                <span className="text-sm font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                        <div className={`text-xs text-center ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                            <p>Portfolio v1.0</p>
                            <p className="mt-1">© 2024 All rights reserved</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
                <div className="pt-[57px]">
                    <div className="p-4 md:p-6">
                        {/* Rest of your content - same as before */}
                        {activeTab === 'overview' && (
                            <>
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                                    {stats.map((stat, idx) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className={`p-4 md:p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}
                                            >
                                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3 md:mb-4`}>
                                                    <Icon size={18} className="text-white" />
                                                </div>
                                                <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {stat.value}
                                                </h3>
                                                <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                                    {stat.label}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Recent Activity */}
                                <div className={`rounded-2xl p-4 md:p-6 ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}>
                                    <h2 className={`text-lg md:text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Recent Activity
                                    </h2>
                                    <div className="space-y-3">
                                        {[...projects, ...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((item, idx) => (
                                            <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                <div>
                                                    <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                                                    <p className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                                        {item.date} • {item.category}
                                                    </p>
                                                </div>
                                                <ChevronRight size={16} className="text-cyber-cyan" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'projects' && (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Manage Projects
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setEditingItem({ type: 'project' });
                                            setFormData({});
                                            setShowModal(true);
                                        }}
                                        className="px-3 md:px-4 py-2 text-sm md:text-base rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Add Project
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {projects.map(project => (
                                        <div key={project.id} className={`p-3 md:p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow flex justify-between items-center`}>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-semibold text-sm md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                                                <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>{project.category}</p>
                                            </div>
                                            <div className="flex gap-2 ml-2">
                                                <button onClick={() => handleEdit('project', project)} className="p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-cyan">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete('project', project.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'blogs' && (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Manage Blog Posts
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setEditingItem({ type: 'blog' });
                                            setFormData({});
                                            setShowModal(true);
                                        }}
                                        className="px-3 md:px-4 py-2 text-sm md:text-base rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Add Post
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {blogPosts.map(post => (
                                        <div key={post.id} className={`p-3 md:p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow flex justify-between items-center`}>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-semibold text-sm md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                                                <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>{post.category}</p>
                                            </div>
                                            <div className="flex gap-2 ml-2">
                                                <button onClick={() => handleEdit('blog', post)} className="p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-cyan">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete('blog', post.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className={`rounded-2xl p-4 md:p-6 ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}>
                                <h2 className={`text-lg md:text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Analytics Coming Soon
                                </h2>
                                <p className={isDark ? 'text-text-secondary' : 'text-gray-500'}>
                                    Advanced analytics will be available in the next update with backend integration.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Edit/Create Modal - Keep your existing modal code */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>

                            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {editingItem?.id ? 'Edit' : 'Add New'} {editingItem?.type === 'project' ? 'Project' : 'Blog Post'}
                            </h2>

                            <div className="space-y-3">
                                {/* Form fields - keep your existing form fields */}
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-gray-50 border-gray-300 text-gray-900'
                                        }`}
                                />
                                {/* Add other form fields as needed */}
                                <button
                                    onClick={handleSave}
                                    className="w-full py-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white flex items-center justify-center gap-2"
                                >
                                    <Save size={16} />
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;