import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { blogPosts } from '../data/blogData';
import { Calendar, Clock, Heart, MessageCircle, ArrowRight } from 'lucide-react';

const HomeBlog = () => {
  const { isDark } = useTheme();
  
  // Get only the 3 most recent blog posts
  const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

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
            <span className="gradient-text">Latest Articles</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            Sharing knowledge about web development, programming, and technology
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800/50 hover:bg-gray-800'
                  : 'bg-white hover:shadow-2xl'
              } border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
            >
              <Link to={`/blog/${post.id}`}>
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? 'bg-cyber-cyan/90 text-white'
                        : 'bg-cyan-600 text-white'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 line-clamp-2 group-hover:text-cyber-cyan transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 text-xs mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-cyber-purple" />
                      <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-cyber-pink" />
                      <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className={`flex gap-4 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-1">
                      <Heart size={14} className="text-cyber-pink" />
                      <span className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                        {post.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} className="text-cyber-cyan" />
                      <span className={`text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition-all duration-300 ${
                isDark
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/30'
                  : 'bg-cyan-100 text-cyan-700 border border-cyan-300 hover:bg-cyan-200'
              }`}
            >
              View All Articles
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBlog;