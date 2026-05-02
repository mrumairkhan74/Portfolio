import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { blogPosts, categories } from '../data/blogData';
import BlogCard from '../components/BlogCard';
import { Search, Filter, Sparkles, X } from 'lucide-react';

const Blog = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Show limited categories on mobile
  const visibleCategories = isMobile ? ['All', 'Tutorial', 'Database', 'Security'] : categories;

  return (
    <div className={`min-h-screen py-16 md:py-20 px-3 md:px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header - smaller text on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-3 md:mb-4`}>
            <span className="gradient-text">Blog & Articles</span>
          </h1>
          {!isMobile && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Sharing knowledge about web development, programming, and technology
            </p>
          )}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={isMobile ? 16 : 18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 md:pl-10 pr-4 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
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

            {/* Mobile Filter Toggle */}
            {isMobile && (
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
                  showMobileFilters
                    ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan'
                    : isDark
                      ? 'border-gray-700 text-text-secondary'
                      : 'border-gray-300 text-gray-600'
                }`}
              >
                <Filter size={16} />
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            )}

            {/* Categories - Desktop always visible, Mobile conditional */}
            {(showMobileFilters || !isMobile) && (
              <div className={`flex flex-wrap gap-2 ${isMobile ? 'mt-2' : ''}`}>
                {visibleCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white shadow-lg'
                        : isDark
                          ? 'bg-gray-800 text-text-secondary hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-4 md:mb-6">
          <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
            Showing {filteredPosts.length} of {blogPosts.length} articles
          </p>
        </div>

        {/* Blog Grid - 1 column on mobile, 3 on desktop */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 md:py-20"
          >
            <p className={`text-base md:text-lg ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              No articles found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className={`mt-4 px-4 md:px-6 py-2 rounded-lg text-sm md:text-base ${
                isDark
                  ? 'bg-cyber-cyan/20 text-cyber-cyan'
                  : 'bg-cyan-100 text-cyan-700'
              }`}
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPosts.slice(0, isMobile ? 6 : filteredPosts.length).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} isMobile={isMobile} />
            ))}
          </div>
        )}

        {/* Load More for Mobile */}
        {isMobile && filteredPosts.length > 6 && (
          <div className="text-center mt-6">
            <button
              onClick={() => {/* Implement load more logic */}}
              className={`px-4 py-2 rounded-lg text-sm ${
                isDark
                  ? 'bg-gray-800 text-cyber-cyan'
                  : 'bg-gray-200 text-cyan-700'
              }`}
            >
              Load More Articles
            </button>
          </div>
        )}

        {/* Newsletter Section - Simplified on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-12 md:mt-16 p-5 md:p-8 rounded-xl md:rounded-2xl text-center ${
            isDark
              ? 'bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10'
              : 'bg-gradient-to-r from-cyan-100 to-purple-100'
          }`}
        >
          <Sparkles size={isMobile ? 24 : 32} className="mx-auto mb-3 md:mb-4 text-cyber-cyan" />
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Stay Updated
          </h2>
          {!isMobile && (
            <p className={`mb-4 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Get the latest articles delivered to your inbox
            </p>
          )}
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder={isMobile ? "Email" : "Enter your email"}
              className={`flex-1 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <button className="px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-semibold hover:opacity-90">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;