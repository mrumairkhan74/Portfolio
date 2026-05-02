import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { blogPosts } from '../data/blogData';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Heart, 
  MessageCircle, 
  Share2, 
  Copy, 
  Check,
  User,
  Tag
} from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [copied, setCopied] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        setLikesCount(foundPost.likes);
      }
      setLoading(false);
    }, 300);
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`w-12 md:w-16 h-12 md:h-16 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4`} />
          <p className={`text-sm md:text-base ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Article not found</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-5 md:px-6 py-2 text-sm md:text-base rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-16 md:py-20 px-3 md:px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/blog')}
          className={`flex items-center gap-1.5 md:gap-2 mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
            isDark
              ? 'bg-white/5 hover:bg-white/10 text-text-secondary'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <ArrowLeft size={isMobile ? 16 : 18} />
          Back to Blog
        </motion.button>

        {/* Hero Image - Smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl md:rounded-2xl overflow-hidden mb-5 md:mb-8 shadow-xl"
        >
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-48 md:h-96 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Content - Reduced padding on mobile */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-xl md:rounded-2xl p-5 md:p-8 ${
            isDark ? 'bg-gray-800/50' : 'bg-white'
          } shadow-lg`}
        >
          {/* Category */}
          <div className="mb-3 md:mb-4">
            <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm ${
              isDark
                ? 'bg-cyber-cyan/20 text-cyber-cyan'
                : 'bg-cyan-100 text-cyan-700'
            }`}>
              {post.category}
            </span>
          </div>

          {/* Title - Smaller on mobile */}
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {post.title}
          </h1>

          {/* Meta Info - Wrap on mobile */}
          <div className="flex flex-wrap gap-3 md:gap-6 mb-5 md:mb-8 pb-4 md:pb-6 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <div className="flex items-center gap-1.5 md:gap-2">
              <User size={isMobile ? 12 : 16} className="text-cyber-cyan" />
              <span className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Calendar size={isMobile ? 12 : 16} className="text-cyber-purple" />
              <span className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Clock size={isMobile ? 12 : 16} className="text-cyber-pink" />
              <span className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>{post.readTime}</span>
            </div>
          </div>

          {/* Content - Mobile optimized typography */}
          <div 
            className={`prose prose-sm md:prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}
            style={{
              fontSize: isMobile ? '14px' : '16px',
              lineHeight: isMobile ? '1.6' : '1.8'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags - Smaller on mobile */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full flex items-center gap-0.5 md:gap-1 ${
                    isDark
                      ? 'bg-cyber-cyan/10 text-cyber-cyan'
                      : 'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  <Tag size={isMobile ? 10 : 12} />
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Engagement - Column on mobile, row on desktop */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <div className="flex gap-3 md:gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  liked
                    ? 'text-cyber-pink'
                    : isDark
                    ? 'bg-white/5 text-text-secondary hover:bg-white/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart size={isMobile ? 14 : 18} fill={liked ? '#EC4899' : 'none'} />
                <span>{likesCount}</span>
              </button>
              <div className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base ${
                isDark ? 'bg-white/5 text-text-secondary' : 'bg-gray-100 text-gray-600'
              }`}>
                <MessageCircle size={isMobile ? 14 : 18} />
                <span>{post.comments}</span>
              </div>
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                isDark
                  ? 'bg-white/5 text-text-secondary hover:bg-white/10'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {copied ? <Check size={isMobile ? 14 : 18} /> : <Share2 size={isMobile ? 14 : 18} />}
              {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;