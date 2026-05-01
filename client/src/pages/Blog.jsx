import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { blogPosts, categories } from '../data/blogData';
import BlogCard from '../components/BlogCard';
import { Search, Filter, Sparkles } from 'lucide-react';

const Blog = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <span className="gradient-text">Blog & Articles</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            Sharing knowledge about web development, programming, and technology
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
            Showing {filteredPosts.length} of {blogPosts.length} articles
          </p>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className={`text-lg ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              No articles found matching your criteria.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-16 p-8 rounded-2xl text-center ${
            isDark
              ? 'bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10'
              : 'bg-gradient-to-r from-cyan-100 to-purple-100'
          }`}
        >
          <Sparkles size={32} className="mx-auto mb-4 text-cyber-cyan" />
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Stay Updated
          </h2>
          <p className={`mb-4 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            Get the latest articles delivered to your inbox
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-semibold hover:opacity-90">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;