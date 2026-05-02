import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Calendar, Clock, Heart, MessageCircle, Tag, User } from 'lucide-react';

const BlogCard = ({ post, index }) => {
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

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!isMobile ? { y: -5 } : {}}
      className={`group rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-gray-800/50 hover:bg-gray-800'
          : 'bg-white hover:shadow-xl'
      } border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
    >
      <Link to={`/blog/${post.id}`}>
        {/* Image - Smaller on mobile */}
        <div className="relative overflow-hidden h-32 md:h-48">
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
          <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold mb-1 md:mb-2 line-clamp-2 group-hover:text-cyber-cyan transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {isMobile && post.title.length > 50 
              ? `${post.title.substring(0, 50)}...` 
              : post.title}
          </h3>

          {/* Excerpt - Shorter on mobile */}
          <p className={`text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            {isMobile && post.excerpt.length > 80 
              ? `${post.excerpt.substring(0, 80)}...` 
              : post.excerpt}
          </p>

          {/* Meta Info - Smaller icons and text on mobile */}
          <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs mb-2 md:mb-3">
            <div className="flex items-center gap-0.5 md:gap-1">
              <User size={isMobile ? 10 : 12} className="text-cyber-cyan" />
              <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.author}</span>
            </div>
            <div className="flex items-center gap-0.5 md:gap-1">
              <Calendar size={isMobile ? 10 : 12} className="text-cyber-purple" />
              <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.date}</span>
            </div>
            <div className="flex items-center gap-0.5 md:gap-1">
              <Clock size={isMobile ? 10 : 12} className="text-cyber-pink" />
              <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.readTime}</span>
            </div>
          </div>

          {/* Tags - Fewer on mobile */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
            {post.tags.slice(0, isMobile ? 2 : 3).map((tag, idx) => (
              <span
                key={idx}
                className={`text-[9px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${
                  isDark
                    ? 'bg-cyber-cyan/10 text-cyber-cyan'
                    : 'bg-cyan-100 text-cyan-700'
                }`}
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > (isMobile ? 2 : 3) && (
              <span className={`text-[9px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${
                isDark ? 'bg-white/10' : 'bg-gray-200'
              }`}>
                +{post.tags.length - (isMobile ? 2 : 3)}
              </span>
            )}
          </div>

          {/* Engagement Stats - Smaller icons on mobile */}
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
  );
};

export default BlogCard;