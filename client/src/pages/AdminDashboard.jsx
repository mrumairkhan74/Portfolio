import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
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
    ChevronLeft,
    User
} from 'lucide-react';

// Import thunks
import {
    fetchAllBlogsThunk,
    createBlogThunk,
    updateBlogThunk,
    deleteBlogThunk,
} from '../features/blog/blogSlice';
import {
    fetchAllProjectsThunk,
    createProjectThunk,
    updateProjectThunk,
    deleteProjectThunk,
} from '../features/projects/projectSlice';
import { logoutThunk, getMeThunk } from '../features/auth/authSlice';

const AdminDashboard = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get state from Redux
    const { user, isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
    const {
        projects = [],
        pagination: projectPagination,
        loading: projectsLoading,
    } = useSelector((state) => state.projects || {});
    const {
        blogs = [],
        pagination: blogPagination,
        loading: blogsLoading,
    } = useSelector((state) => state.blogs || {});

    // State variables
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [authChecked, setAuthChecked] = useState(false); // IMPORTANT: Added this
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        excerpt: '',
        content: '',
        fullDescription: '',
        technologies: '',
        imageUrl: '',
        imageFile: null,
        category: '',
        tags: '',
        githubUrl: '',
        liveUrl: '',
        isFeatured: false
    });

    // Pagination state
    const [projectFilters, setProjectFilters] = useState({ page: 1, limit: 10 });
    const [blogFilters, setBlogFilters] = useState({ page: 1, limit: 10 });

    // Check authentication - FIXED VERSION
    useEffect(() => {
        const initAuth = async () => {
            // If already authenticated in Redux, don't check again
            if (isAuthenticated && user) {
                setAuthChecked(true);
                return;
            }

            // Check if token exists in localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                // No token, redirect to login
                navigate('/login');
                return;
            }

            try {
                // Try to get user data with the token
                await dispatch(getMeThunk()).unwrap();
                setAuthChecked(true);
            } catch (error) {
                console.error('Auth failed:', error);
                localStorage.removeItem('token'); // Clear invalid token
                navigate('/login');
            }
        };

        initAuth();
    }, [dispatch, navigate, isAuthenticated, user]);

    // Fetch data when authenticated - ONLY ONE useEffect for data fetching
    useEffect(() => {
        if (authChecked && (isAuthenticated || user)) {
            if (activeTab === 'projects' || activeTab === 'overview') {
                dispatch(fetchAllProjectsThunk(projectFilters));
            }
            if (activeTab === 'blogs' || activeTab === 'overview') {
                dispatch(fetchAllBlogsThunk(blogFilters));
            }
        }
    }, [dispatch, activeTab, projectFilters, blogFilters, isAuthenticated, user, authChecked]);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = async () => {
        try {
            await dispatch(logoutThunk()).unwrap();
            localStorage.removeItem('token'); // Clear token on logout
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/login');
        }
    };

    const handleDelete = async (type, id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                if (type === 'project') {
                    await dispatch(deleteProjectThunk(id)).unwrap();
                    // Refresh the list
                    dispatch(fetchAllProjectsThunk(projectFilters));
                } else if (type === 'blog') {
                    await dispatch(deleteBlogThunk(id)).unwrap();
                    dispatch(fetchAllBlogsThunk(blogFilters));
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('Failed to delete. Please try again.');
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
            fullDescription: item.fullDescription || '',
            technologies: item.technologies?.join(', ') || '',
            imageUrl: item.imageUrl || '',
            imageFile: null,
            category: item.category || '',
            tags: item.tags?.join(', ') || '',
            githubUrl: item.githubUrl || '',
            liveUrl: item.liveUrl || '',
            isFeatured: item.isFeatured || false
        });
        setShowModal(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                imageFile: file,
                imageUrl: URL.createObjectURL(file)
            });
        }
    };

    const handleSave = async () => {
        try {
            // Prepare FormData for file upload
            const submitData = new FormData();

            if (editingItem.type === 'project') {
                submitData.append('title', formData.title);
                submitData.append('description', formData.description);
                submitData.append('fullDescription', formData.fullDescription);
                submitData.append('technologies', formData.technologies);
                submitData.append('category', formData.category);
                submitData.append('githubUrl', formData.githubUrl);
                submitData.append('liveUrl', formData.liveUrl);
                submitData.append('isFeatured', formData.isFeatured);
                if (formData.imageFile) {
                    submitData.append('image', formData.imageFile);
                }

                if (editingItem._id) {
                    // Update existing project
                    await dispatch(updateProjectThunk({
                        id: editingItem._id,
                        updateData: submitData
                    })).unwrap();
                } else {
                    // Create new project
                    await dispatch(createProjectThunk(submitData)).unwrap();
                }

                // Refresh projects list
                dispatch(fetchAllProjectsThunk(projectFilters));

            } else if (editingItem.type === 'blog') {
                submitData.append('title', formData.title);
                submitData.append('excerpt', formData.excerpt);
                submitData.append('content', formData.content);
                submitData.append('category', formData.category);
                submitData.append('tags', formData.tags);
                if (formData.imageFile) {
                    submitData.append('image', formData.imageFile);
                }

                if (editingItem._id) {
                    // Update existing blog
                    await dispatch(updateBlogThunk({
                        id: editingItem._id,
                        updateData: submitData
                    })).unwrap();
                } else {
                    // Create new blog
                    await dispatch(createBlogThunk(submitData)).unwrap();
                }

                // Refresh blogs list
                dispatch(fetchAllBlogsThunk(blogFilters));
            }

            setShowModal(false);
            setEditingItem(null);
            resetFormData();
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save. Please check your inputs and try again.');
        }
    };

    const resetFormData = () => {
        setFormData({
            title: '',
            description: '',
            excerpt: '',
            content: '',
            fullDescription: '',
            technologies: '',
            imageUrl: '',
            imageFile: null,
            category: '',
            tags: '',
            githubUrl: '',
            liveUrl: '',
            isFeatured: false
        });
    };

    // Show loading while checking auth - UPDATED CONDITION
    if (authLoading || !authChecked) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-cyan"></div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!isAuthenticated && !user) {
        return null;
    }

    const stats = [
        { label: 'Total Projects', value: projectPagination?.totalProjects || 0, icon: FolderGit2, color: 'from-cyber-cyan to-cyan-600' },
        { label: 'Blog Posts', value: blogPagination?.totalBlogs || 0, icon: BookOpen, color: 'from-cyber-purple to-purple-600' },
        { label: 'Total Likes', value: 0, icon: Heart, color: 'from-cyber-pink to-pink-600' },
        { label: 'Total Comments', value: 0, icon: MessageCircle, color: 'from-cyan-500 to-blue-600' },
    ];

    const visibleStats = isMobile ? stats.slice(0, 2) : stats;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'blogs', label: 'Blog Posts', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    const isLoading = projectsLoading || blogsLoading;

    return (
        <div className={`min-h-screen ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
            {/* Top Navigation Bar */}
            <div className={`fixed top-0 left-0 right-0 z-30 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3">
                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-1.5 md:p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-cyan"
                        >
                            <Menu size={isMobile ? 18 : 20} />
                        </button>

                        <div className={`hidden ${!isMobile && 'lg:flex'} items-center gap-2`}>
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center">
                                <LayoutDashboard size={isMobile ? 12 : 16} className="text-white" />
                            </div>
                            {!isMobile && (
                                <span className={`font-bold text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Admin Panel
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        {!isMobile && user && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-3 border-cyber-purple flex items-center justify-center">
                                    {user.image?.url ? (
                                        <img src={user.image.url} alt={user.name} className="object-cover rounded-full w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center">
                                            <User size={20} className="text-white" />
                                        </div>
                                    )}
                                </div>
                                <span className={`flex flex-col items-start text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                                    {user.name || 'Admin'}
                                    <span className='text-red-500 text-xs'>{user.role}</span>
                                </span>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className={`p-1.5 md:p-2 rounded-lg transition-all duration-300 ${isDark
                                ? 'hover:bg-red-500/10 text-red-400'
                                : 'hover:bg-red-50 text-red-600'
                                }`}
                            title="Logout"
                        >
                            <LogOut size={isMobile ? 16 : 18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-[49px] md:top-[57px] bottom-0 z-40 transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } w-56 md:w-64 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}>
                <div className="h-full flex flex-col">
                    <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    if (isMobile) setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg transition-all duration-300 text-sm md:text-base ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan'
                                    : isDark
                                        ? 'text-text-secondary hover:bg-white/5'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <tab.icon size={isMobile ? 16 : 18} />
                                <span className="text-xs md:text-sm font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {!isMobile && (
                        <div className="p-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                            <div className={`text-xs text-center ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                <p>Portfolio v1.0</p>
                                <p className="mt-1">© 2024 All rights reserved</p>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className={`min-h-screen transition-all duration-300 ${!isMobile && sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
                <div className="pt-[49px] md:pt-[57px]">
                    <div className="p-3 md:p-6">
                        {isLoading && (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-cyan"></div>
                            </div>
                        )}

                        {activeTab === 'overview' && (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                                    {visibleStats.map((stat, idx) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className={`p-3 md:p-6 rounded-xl md:rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}
                                            >
                                                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-2 md:mb-4`}>
                                                    <Icon size={isMobile ? 14 : 18} className="text-white" />
                                                </div>
                                                <h3 className={`text-lg md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {stat.value}
                                                </h3>
                                                <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                                    {stat.label}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}>
                                    <h2 className={`text-base md:text-xl font-bold mb-3 md:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Recent Activity
                                    </h2>
                                    <div className="space-y-2 md:space-y-3">
                                        {[...(projects || []), ...(blogs || [])]
                                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                            .slice(0, isMobile ? 3 : 5)
                                            .map((item, idx) => (
                                                <div key={idx} className={`flex items-center justify-between p-2 md:p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-medium text-xs md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                                                        <p className={`text-[10px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                                            {new Date(item.createdAt).toLocaleDateString()} • {item.category}
                                                        </p>
                                                    </div>
                                                    <ChevronRight size={isMobile ? 14 : 16} className="text-cyber-cyan flex-shrink-0 ml-2" />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'projects' && (
                            <div>
                                <div className="flex justify-between items-center mb-4 md:mb-6">
                                    <h2 className={`text-base md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Manage Projects
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setEditingItem({ type: 'project' });
                                            resetFormData();
                                            setShowModal(true);
                                        }}
                                        className="px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-base rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white flex items-center gap-1 md:gap-2"
                                    >
                                        <Plus size={isMobile ? 14 : 16} />
                                        {!isMobile && 'Add Project'}
                                    </button>
                                </div>

                                <div className="space-y-2 md:space-y-3">
                                    {(projects || []).map(project => (
                                        <div key={project._id} className={`p-2 md:p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow flex justify-between items-center`}>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-semibold text-xs md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                                                <p className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>{project.category}</p>
                                            </div>
                                            <div className="flex gap-1 md:gap-2 ml-2">
                                                <button onClick={() => handleEdit('project', project)} className="p-1 md:p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-cyan">
                                                    <Edit size={isMobile ? 14 : 16} />
                                                </button>
                                                <button onClick={() => handleDelete('project', project._id)} className="p-1 md:p-2 rounded-lg hover:bg-red-500/10 text-red-500">
                                                    <Trash2 size={isMobile ? 14 : 16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination for Projects */}
                                {projectPagination && projectPagination.totalPages > 1 && (
                                    <div className="flex justify-center gap-2 mt-6">
                                        <button
                                            onClick={() => setProjectFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                                            disabled={projectPagination.currentPage === 1}
                                            className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow disabled:opacity-50`}
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <span className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                            Page {projectPagination.currentPage} of {projectPagination.totalPages}
                                        </span>
                                        <button
                                            onClick={() => setProjectFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                                            disabled={projectPagination.currentPage === projectPagination.totalPages}
                                            className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow disabled:opacity-50`}
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'blogs' && (
                            <div>
                                <div className="flex justify-between items-center mb-4 md:mb-6">
                                    <h2 className={`text-base md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Manage Blog Posts
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setEditingItem({ type: 'blog' });
                                            resetFormData();
                                            setShowModal(true);
                                        }}
                                        className="px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-base rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white flex items-center gap-1 md:gap-2"
                                    >
                                        <Plus size={isMobile ? 14 : 16} />
                                        {!isMobile && 'Add Post'}
                                    </button>
                                </div>

                                <div className="space-y-2 md:space-y-3">
                                    {(blogs || []).map(post => (
                                        <div key={post._id} className={`p-2 md:p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow flex justify-between items-center`}>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-semibold text-xs md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                                                <p className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>{post.category}</p>
                                            </div>
                                            <div className="flex gap-1 md:gap-2 ml-2">
                                                <button onClick={() => handleEdit('blog', post)} className="p-1 md:p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-cyan">
                                                    <Edit size={isMobile ? 14 : 16} />
                                                </button>
                                                <button onClick={() => handleDelete('blog', post._id)} className="p-1 md:p-2 rounded-lg hover:bg-red-500/10 text-red-500">
                                                    <Trash2 size={isMobile ? 14 : 16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination for Blogs */}
                                {blogPagination && blogPagination.totalPages > 1 && (
                                    <div className="flex justify-center gap-2 mt-6">
                                        <button
                                            onClick={() => setBlogFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                                            disabled={blogPagination.currentPage === 1}
                                            className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow disabled:opacity-50`}
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <span className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                            Page {blogPagination.currentPage} of {blogPagination.totalPages}
                                        </span>
                                        <button
                                            onClick={() => setBlogFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                                            disabled={blogPagination.currentPage === blogPagination.totalPages}
                                            className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow disabled:opacity-50`}
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}>
                                <h2 className={`text-base md:text-xl font-bold mb-2 md:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Analytics Coming Soon
                                </h2>
                                <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                                    Advanced analytics will be available in the next update with backend integration.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Edit/Create Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
                        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl md:rounded-2xl p-4 md:p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 md:top-4 md:right-4 p-1 rounded-lg hover:bg-white/10"
                            >
                                <X size={isMobile ? 18 : 20} />
                            </button>

                            <h2 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {editingItem?._id ? 'Edit' : 'Add New'} {editingItem?.type === 'project' ? 'Project' : 'Blog Post'}
                            </h2>

                            <div className="space-y-2 md:space-y-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-50 border-gray-300 text-gray-900'
                                        }`}
                                />

                                {editingItem?.type === 'project' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Short Description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <textarea
                                            placeholder="Full Description"
                                            value={formData.fullDescription}
                                            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                                            rows={4}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Technologies (comma-separated)"
                                            value={formData.technologies}
                                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Category"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <input
                                            type="url"
                                            placeholder="GitHub URL"
                                            value={formData.githubUrl}
                                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <input
                                            type="url"
                                            placeholder="Live URL"
                                            value={formData.liveUrl}
                                            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                    </>
                                )}

                                {editingItem?.type === 'blog' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Excerpt"
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <textarea
                                            placeholder="Content"
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={6}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Category"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Tags (comma-separated)"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-gray-50 border-gray-300 text-gray-900'
                                                }`}
                                        />
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-50 border-gray-300 text-gray-900'
                                        }`}
                                />

                                {formData.imageUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="w-full py-2 text-sm md:text-base rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Save size={isMobile ? 14 : 16} />
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