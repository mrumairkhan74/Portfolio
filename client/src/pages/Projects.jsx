import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Heart,
  MessageCircle,
  Eye,
  // ExternalLink,
  X,
  ChevronDown,
  Calendar,
  Star,
  // TrendingUp,
  // Clock
} from 'lucide-react';

// Import projects data
const projectsData = [
  {
    _id: '1',
    title: 'Wuddy - Social + Professional Network',
    description: 'Real-time chat, communities, and professional networking platform. Combines social features with team communication tools.',
    fullDescription: 'Comprehensive social + professional networking web app where users can connect, chat, and collaborate in real time.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redux Toolkit', 'Tailwind CSS', 'JWT'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/00F0FF?text=Wuddy',
    likes: 15,
    comments: 12,
    githubUrl: 'https://github.com/mrumairkhan74/Wuddy',
    liveUrl: 'https://wuddy.vercel.app',
    category: 'Full Stack',
    featured: true,
    date: '2024-02-01',
    views: 1250
  },
  {
    _id: '2',
    title: 'GeariX - Automotive E-commerce',
    description: 'Full-featured e-commerce platform for automotive parts with Stripe payment integration.',
    fullDescription: 'Complete e-commerce solution for automotive parts and accessories with secure payment processing.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux', 'CSS3'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/8B5CF6?text=GeariX',
    likes: 23,
    comments: 8,
    githubUrl: 'https://github.com/mrumairkhan74/GeariX',
    liveUrl: 'https://gearix.vercel.app',
    category: 'E-commerce',
    featured: true,
    date: '2024-01-25',
    views: 980
  },
  {
    _id: '3',
    title: 'We Chat - Real-time Messenger',
    description: 'Real-time messaging app with one-to-one and group chat functionality.',
    fullDescription: 'Modern messaging platform supporting one-to-one and group conversations with real-time updates.',
    technologies: ['React', 'Express', 'MongoDB', 'Socket.io', 'Node.js', 'CSS3'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/EC4899?text=We+Chat',
    likes: 34,
    comments: 15,
    githubUrl: 'https://github.com/mrumairkhan74/WeChat',
    liveUrl: 'https://wechat.vercel.app',
    category: 'Real-time',
    featured: true,
    date: '2024-01-15',
    views: 2100
  },
  {
    _id: '4',
    title: 'TrackMantis - Issue Tracker',
    description: 'Project management tool with analytics dashboard for tracking issues and tasks.',
    fullDescription: 'Comprehensive issue tracking and project management tool with analytics dashboard.',
    technologies: ['MERN', 'JWT', 'Charts.js', 'Tailwind CSS', 'MongoDB', 'Express'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/00F0FF?text=TrackMantis',
    likes: 19,
    comments: 6,
    githubUrl: 'https://github.com/mrumairkhan74/TrackMantis',
    liveUrl: 'https://trackmantis.vercel.app',
    category: 'Productivity',
    featured: false,
    date: '2024-01-10',
    views: 750
  },
  {
    _id: '5',
    title: 'C-News - News Aggregator',
    description: 'Curated news platform aggregating content from multiple sources in one interface.',
    fullDescription: 'Modern news aggregator that fetches and displays curated news from multiple APIs.',
    technologies: ['React', 'REST API', 'CSS3', 'News API', 'Responsive Design'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/8B5CF6?text=C-News',
    likes: 12,
    comments: 4,
    githubUrl: 'https://github.com/mrumairkhan74/C-News',
    liveUrl: 'https://cnews.vercel.app',
    category: 'Frontend',
    featured: false,
    date: '2024-01-05',
    views: 520
  },
  {
    _id: '6',
    title: 'Animated Background',
    description: 'Interactive animated background component with modern visual effects.',
    fullDescription: 'Reusable animated background component library featuring interactive visual effects.',
    technologies: ['CSS3', 'HTML5', 'JavaScript', 'Canvas API'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/EC4899?text=Animated+Background',
    likes: 8,
    comments: 2,
    githubUrl: 'https://github.com/mrumairkhan74/animated-background',
    liveUrl: 'https://animated-background.vercel.app',
    category: 'Frontend',
    featured: false,
    date: '2023-12-28',
    views: 380
  },
  {
    _id: '7',
    title: 'Responsive Gym Website',
    description: 'Modern, fully responsive gym and fitness website template.',
    fullDescription: 'Complete gym website template with responsive design and modern UI components.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/00F0FF?text=Gym+Website',
    likes: 6,
    comments: 1,
    githubUrl: 'https://github.com/mrumairkhan74/gym-page-responsive',
    liveUrl: 'https://gym-page.vercel.app',
    category: 'Frontend',
    featured: false,
    date: '2023-12-20',
    views: 290
  },
  {
    _id: '8',
    title: 'Interactive Game Page',
    description: 'Engaging browser-based game page with interactive elements.',
    fullDescription: 'Fun interactive game page with smooth animations and engaging gameplay mechanics.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Game Logic'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/8B5CF6?text=Game+Page',
    likes: 5,
    comments: 0,
    githubUrl: 'https://github.com/mrumairkhan74/game-page',
    liveUrl: 'https://game-page.vercel.app',
    category: 'Frontend',
    featured: false,
    date: '2023-12-15',
    views: 210
  },
  {
    _id: '9',
    title: 'Animated Responsive Navbar',
    description: 'Modern navigation bar with smooth animations and responsive design.',
    fullDescription: 'Highly customizable animated navigation bar component with mobile responsiveness.',
    technologies: ['CSS3', 'HTML5', 'JavaScript', 'Flexbox/Grid'],
    imageUrl: 'https://placehold.co/600x400/1a1a2e/EC4899?text=Navbar',
    likes: 7,
    comments: 3,
    githubUrl: 'https://github.com/mrumairkhan74/navbar-resposive-and-animated',
    liveUrl: 'https://animated-navbar.vercel.app',
    category: 'Frontend',
    featured: false,
    date: '2023-12-10',
    views: 340
  }
];

const Projects = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  // const [showFilters, setShowFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setVisibleCount(window.innerWidth < 768 ? 6 : 9);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get unique categories - limit on mobile
  const categories = ['all', ...new Set(projectsData.map(p => p.category))];
  const visibleCategories = isMobile ? categories.slice(0, 4) : categories;

  // Filter and sort projects
  useEffect(() => {
    let results = [...projectsData];

    if (searchTerm) {
      results = results.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      results = results.filter(project => project.category === selectedCategory);
    }

    switch (sortBy) {
      case 'latest':
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'most-liked':
        results.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-viewed':
        results.sort((a, b) => b.views - a.views);
        break;
      case 'most-commented':
        results.sort((a, b) => b.comments - a.comments);
        break;
      default:
        break;
    }

    setFilteredProjects(results);
  }, [searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('latest');
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const displayedProjects = isMobile ? filteredProjects.slice(0, visibleCount) : filteredProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className={`min-h-screen py-16 md:py-20 px-3 md:px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header - Smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-2 md:mb-4`}>
            <span className="gradient-text">All Projects</span>
          </h1>
          {!isMobile && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Explore my complete portfolio of web development projects
            </p>
          )}
        </motion.div>

        {/* Search and Filter Bar - Sticky on mobile with adjusted top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`sticky ${isMobile ? 'top-16' : 'top-20'} z-20 mb-6 md:mb-8 p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-md ${
            isDark ? 'bg-gray-900/80' : 'bg-white/80'
          } shadow-lg`}
        >
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Search Input - Full width on mobile */}
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`} size={isMobile ? 16 : 18} />
              <input
                type="text"
                placeholder={isMobile ? "Search projects..." : "Search by title, description, or technology..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 md:pl-10 pr-8 md:pr-10 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X size={isMobile ? 14 : 16} className="text-gray-400 hover:text-cyber-cyan" />
                </button>
              )}
            </div>

            {/* Action Buttons Row - Wrap on mobile */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-sm rounded-lg border transition-all ${
                  isFilterOpen
                    ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan'
                    : isDark
                    ? 'border-gray-700 hover:border-cyber-cyan'
                    : 'border-gray-300 hover:border-cyan-500'
                }`}
              >
                <Filter size={isMobile ? 14 : 18} />
                Filters
                <ChevronDown size={isMobile ? 12 : 16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex gap-1.5 md:gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 md:p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-cyber-cyan text-white'
                      : isDark
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Grid3x3 size={isMobile ? 16 : 18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 md:p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-cyber-cyan text-white'
                      : isDark
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <List size={isMobile ? 16 : 18} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 md:pt-4 mt-3 md:mt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                        Category
                      </label>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {visibleCategories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm capitalize transition-all ${
                              selectedCategory === cat
                                ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white'
                                : isDark
                                ? 'bg-gray-800 hover:bg-gray-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`w-full px-2 md:px-3 py-1.5 md:py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
                          isDark
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-gray-100 border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="most-liked">Most Liked</option>
                        <option value="most-viewed">Most Viewed</option>
                        <option value="most-commented">Most Commented</option>
                      </select>
                    </div>
                  </div>

                  {(searchTerm || selectedCategory !== 'all' || sortBy !== 'latest') && (
                    <button
                      onClick={clearFilters}
                      className="mt-3 md:mt-4 text-xs md:text-sm text-cyber-cyan hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            Showing {displayedProjects.length} of {filteredProjects.length} projects
          </p>
        </div>

        {/* Projects Grid/List View */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 md:py-20"
          >
            <p className={`text-base md:text-lg ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              No projects found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-3 md:mt-4 px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              <AnimatePresence mode="wait">
                {displayedProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={!isMobile ? { y: -8 } : {}}
                    className={`group rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800/50 hover:bg-gray-800'
                        : 'bg-white hover:shadow-xl'
                    }`}
                  >
                    <Link to={`/project/${project._id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {project.featured && (
                          <div className="absolute top-2 left-2 md:top-3 md:left-3">
                            <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-cyber-cyan text-white text-[10px] md:text-xs rounded-full flex items-center gap-0.5 md:gap-1">
                              <Star size={isMobile ? 10 : 12} />
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 md:p-5">
                        <h3 className={`text-base md:text-lg font-bold mb-1.5 md:mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        <p className={`text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                          {project.technologies.slice(0, isMobile ? 2 : 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${
                                isDark
                                  ? 'bg-cyber-cyan/10 text-cyber-cyan'
                                  : 'bg-cyan-100 text-cyan-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > (isMobile ? 2 : 3) && (
                            <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                              +{project.technologies.length - (isMobile ? 2 : 3)}
                            </span>
                          )}
                        </div>
                        <div className={`flex justify-between items-center pt-2 md:pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <div className="flex gap-2 md:gap-3">
                            <span className="flex items-center gap-0.5 md:gap-1 text-xs md:text-sm">
                              <Heart size={isMobile ? 12 : 14} className="text-cyber-pink" />
                              <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.likes}</span>
                            </span>
                            <span className="flex items-center gap-0.5 md:gap-1 text-xs md:text-sm">
                              <MessageCircle size={isMobile ? 12 : 14} className="text-cyber-cyan" />
                              <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.comments}</span>
                            </span>
                            <span className="flex items-center gap-0.5 md:gap-1 text-xs md:text-sm">
                              <Eye size={isMobile ? 12 : 14} className="text-cyber-purple" />
                              <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.views}</span>
                            </span>
                          </div>
                          <span className={`text-[10px] md:text-xs flex items-center gap-0.5 md:gap-1 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                            <Calendar size={isMobile ? 10 : 12} />
                            {isMobile ? project.date.slice(5) : project.date}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Load More Button for Mobile */}
            {isMobile && visibleCount < filteredProjects.length && (
              <div className="text-center mt-6 md:mt-8">
                <button
                  onClick={loadMore}
                  className="px-5 md:px-6 py-1.5 md:py-2 rounded-lg text-sm md:text-base bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white"
                >
                  Load More ({filteredProjects.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 md:space-y-4"
          >
            {displayedProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                layout
                whileHover={!isMobile ? { x: 8 } : {}}
                className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800/50 hover:bg-gray-800'
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <Link to={`/project/${project._id}`} className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full md:w-32 lg:w-48 h-24 md:h-28 lg:h-32 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="flex-1">
                        <h3 className={`text-sm md:text-lg lg:text-xl font-bold mb-0.5 md:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        <p className={`text-xs md:text-sm mb-1.5 md:mb-2 line-clamp-1 md:line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                          {project.description}
                        </p>
                      </div>
                      {project.featured && (
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-cyber-cyan text-white text-[10px] md:text-xs rounded-full flex-shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                      {project.technologies.slice(0, isMobile ? 2 : 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${
                            isDark
                              ? 'bg-cyber-cyan/10 text-cyber-cyan'
                              : 'bg-cyan-100 text-cyan-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                      <span className="flex items-center gap-0.5 md:gap-1">
                        <Heart size={isMobile ? 12 : 14} className="text-cyber-pink" />
                        <span>{project.likes}</span>
                      </span>
                      <span className="flex items-center gap-0.5 md:gap-1">
                        <MessageCircle size={isMobile ? 12 : 14} className="text-cyber-cyan" />
                        <span>{project.comments}</span>
                      </span>
                      <span className="flex items-center gap-0.5 md:gap-1">
                        <Eye size={isMobile ? 12 : 14} className="text-cyber-purple" />
                        <span>{project.views}</span>
                      </span>
                      {!isMobile && (
                        <span className="flex items-center gap-0.5 md:gap-1">
                          <Calendar size={isMobile ? 12 : 14} className="text-cyber-cyan" />
                          <span>{project.date}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Summary - Simplified on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-10 md:mt-12 p-4 md:p-6 rounded-xl md:rounded-2xl ${
            isDark ? 'bg-gray-800/50' : 'bg-white'
          } shadow-lg`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
            <div>
              <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-cyber-cyan`}>{projectsData.length}</div>
              <div className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>Total Projects</div>
            </div>
            <div>
              <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-cyber-purple`}>
                {projectsData.reduce((sum, p) => sum + p.likes, 0)}
              </div>
              <div className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>Total Likes</div>
            </div>
            <div>
              <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-cyber-pink`}>
                {projectsData.reduce((sum, p) => sum + p.comments, 0)}
              </div>
              <div className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>Total Comments</div>
            </div>
            <div>
              <div className={`${isMobile ? 'text-base' : 'text-2xl'} font-bold text-cyber-cyan`}>
                {projectsData.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </div>
              <div className={`text-[10px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>Total Views</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;