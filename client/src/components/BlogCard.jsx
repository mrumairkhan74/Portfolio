import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Calendar, Clock, Heart, MessageCircle, Tag, User } from 'lucide-react';

const BlogCard = ({ post, index }) => {
  const { isDark } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
          <div className="flex flex-wrap gap-4 text-xs mb-3">
            <div className="flex items-center gap-1">
              <User size={12} className="text-cyber-cyan" />
              <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-cyber-purple" />
              <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-cyber-pink" />
              <span className={isDark ? 'text-text-secondary' : 'text-gray-500'}>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className={`text-xs px-2 py-1 rounded-full ${
                  isDark
                    ? 'bg-cyber-cyan/10 text-cyber-cyan'
                    : 'bg-cyan-100 text-cyan-700'
                }`}
              >
                #{tag}
              </span>
            ))}
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
  );
};

export default BlogCard;