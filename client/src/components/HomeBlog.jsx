import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { blogPosts } from '../data/blogData';
import { Calendar, Clock, Heart, MessageCircle, ArrowRight } from 'lucide-react';

const HomeBlog = () => {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get recent posts - fewer on mobile
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, isMobile ? 2 : 3);

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
            <span className="gradient-text">Latest Articles</span>
          </h2>
          {!isMobile && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Sharing knowledge about web development, programming, and technology
            </p>
          )}
        </motion.div>

        {/* Blog Grid - Fewer columns on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={!isMobile ? { y: -5 } : {}}
              className={`group rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800/50 hover:bg-gray-800'
                  : 'bg-white hover:shadow-xl'
              } border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
            >
              <Link to={`/blog/${post.id}`}>
                {/* Image - Smaller on mobile */}
                <div className="relative overflow-hidden h-36 md:h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge - Smaller on mobile */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className={`px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${
                      isDark
                        ? 'bg-cyber-cyan/90 text-white'
                        : 'bg-cyan-600 text-white'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content - Reduced padding on mobile */}
                <div className="p-3 md:p-5">
                  {/* Title - Smaller on mobile */}
                  <h3 className={`${isMobile ? 'text-sm' : 'text-xl'} font-bold mb-1 md:mb-2 line-clamp-2 group-hover:text-cyber-cyan transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {isMobile && post.title.length > 40 
                      ? `${post.title.substring(0, 40)}...` 
                      : post.title}
                  </h3>

                  {/* Excerpt - Hidden on mobile? Or shorter */}
                  {!isMobile && (
                    <p className={`text-sm mb-3 md:mb-4 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Info - Smaller on mobile */}
                  <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-xs mb-2 md:mb-3">
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <Calendar size={isMobile ? 10 : 12} className="text-cyber-purple" />
                      <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <Clock size={isMobile ? 10 : 12} className="text-cyber-pink" />
                      <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Engagement Stats - Smaller on mobile */}
                  <div className={`flex gap-3 md:gap-4 pt-2 md:pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <Heart size={isMobile ? 12 : 14} className="text-cyber-pink" />
                      <span className={`text-[10px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                        {post.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <MessageCircle size={isMobile ? 12 : 14} className="text-cyber-cyan" />
                      <span className={`text-[10px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button - Smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <Link to="/blog">
            <motion.button
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              className={`px-5 md:px-8 py-1.5 md:py-3 text-sm md:text-base rounded-full font-semibold flex items-center gap-1.5 md:gap-2 mx-auto transition-all duration-300 ${
                isDark
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/30'
                  : 'bg-cyan-100 text-cyan-700 border border-cyan-300 hover:bg-cyan-200'
              }`}
            >
              View All Articles
              <ArrowRight size={isMobile ? 14 : 18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBlog;