import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
//   Github, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Star,
  Code2,
  Database,
  Cloud,
  Shield,
  Zap,
  Layers,
  Server,
  Layout,
  Smartphone,
  Lock,
  Send,
  X
} from 'lucide-react';

// Import the same projects data
const projectsData = [
  {
    _id: '1',
    title: 'Wuddy - Social + Professional Network',
    description: 'Real-time chat, communities, and professional networking platform. Combines social features with team communication tools.',
    fullDescription: `Wuddy is a comprehensive social + professional networking web app where users can connect, chat, and collaborate in real time. It combines features of social platforms and team communication tools, making it easy for professionals to network and share ideas.

Key Features:
• Real-time messaging with Socket.io
• User authentication with JWT
• Create and join communities
• Share posts and media
• Professional networking tools
• Responsive design for all devices

The platform handles thousands of concurrent users with optimized database queries and real-time updates. Built with performance and scalability in mind.`,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redux Toolkit', 'Tailwind CSS', 'JWT'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/00F0FF?text=Wuddy',
    images: [
      'https://placehold.co/800x500/1a1a2e/00F0FF?text=Wuddy+Home',
      'https://placehold.co/800x500/1a1a2e/8B5CF6?text=Wuddy+Chat',
      'https://placehold.co/800x500/1a1a2e/EC4899?text=Wuddy+Profile'
    ],
    likes: 15,
    comments: [
      { id: 1, author: 'TechRecruiter', text: 'Great platform! The real-time chat works flawlessly.', date: '2024-02-10', avatar: 'https://placehold.co/40x40' },
      { id: 2, author: 'DevCommunity', text: 'Love the professional networking features.', date: '2024-02-05', avatar: 'https://placehold.co/40x40' }
    ],
    githubUrl: 'https://github.com/mrumairkhan74/Wuddy',
    liveUrl: 'https://wuddy.vercel.app',
    category: 'Full Stack',
    featured: true,
    date: '2024-02-01',
    duration: '3 months',
    role: 'Full Stack Developer'
  },
  {
    _id: '2',
    title: 'GeariX - Automotive E-commerce',
    description: 'Full-featured e-commerce platform for automotive parts with Stripe payment integration.',
    fullDescription: `GeariX is a complete e-commerce solution for automotive parts and accessories. Features include product catalog, shopping cart, user authentication, order management, and secure Stripe payment integration.

Key Features:
• Product browsing with filters
• Shopping cart functionality
• Secure checkout with Stripe
• User accounts and order history
• Admin dashboard for inventory
• Email notifications for orders

Built for performance and scalability, GeariX handles product inventory management and secure payment processing.`,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux', 'CSS3'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/8B5CF6?text=GeariX',
    images: [
      'https://placehold.co/800x500/1a1a2e/8B5CF6?text=GeariX+Products',
      'https://placehold.co/800x500/1a1a2e/00F0FF?text=GeariX+Cart',
      'https://placehold.co/800x500/1a1a2e/EC4899?text=GeariX+Checkout'
    ],
    likes: 23,
    comments: [
      { id: 1, author: 'ShopOwner', text: 'The payment integration is seamless!', date: '2024-01-28', avatar: 'https://placehold.co/40x40' }
    ],
    githubUrl: 'https://github.com/mrumairkhan74/GeariX',
    liveUrl: 'https://gearix.vercel.app',
    category: 'E-commerce',
    featured: true,
    date: '2024-01-25',
    duration: '2 months',
    role: 'Lead Developer'
  },
  {
    _id: '3',
    title: 'We Chat - Real-time Messenger',
    description: 'Real-time messaging app with one-to-one and group chat functionality.',
    fullDescription: `We Chat is a modern messaging platform supporting both one-to-one and group conversations. Features include real-time message delivery, typing indicators, online status, and message history.

Key Features:
• One-to-one and group messaging
• Real-time updates with Socket.io
• User presence indicators
• Typing indicators
• Message history
• File sharing capabilities

Built with Socket.io for real-time bidirectional communication and MongoDB for message persistence.`,
    technologies: ['React', 'Express', 'MongoDB', 'Socket.io', 'Node.js', 'CSS3'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/EC4899?text=We+Chat',
    images: [
      'https://placehold.co/800x500/1a1a2e/EC4899?text=We+Chat+Chat',
      'https://placehold.co/800x500/1a1a2e/00F0FF?text=We+Chat+Groups',
      'https://placehold.co/800x500/1a1a2e/8B5CF6?text=We+Chat+Profile'
    ],
    likes: 34,
    comments: [
      { id: 1, author: 'MessengerUser', text: 'Super fast real-time updates!', date: '2024-01-20', avatar: 'https://placehold.co/40x40' },
      { id: 2, author: 'TeamLead', text: 'Group chat works perfectly.', date: '2024-01-18', avatar: 'https://placehold.co/40x40' }
    ],
    githubUrl: 'https://github.com/mrumairkhan74/WeChat',
    liveUrl: 'https://wechat.vercel.app',
    category: 'Real-time',
    featured: true,
    date: '2024-01-15',
    duration: '1.5 months',
    role: 'Full Stack Developer'
  }
];

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProject = projectsData.find(p => p._id === id);
      if (foundProject) {
        setProject(foundProject);
        setLikesCount(foundProject.likes);
        setComments(foundProject.comments);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: commentAuthor || 'Anonymous',
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      avatar: 'https://placehold.co/40x40'
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setCommentAuthor('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return <Code2 size={16} />;
    if (techLower.includes('node')) return <Server size={16} />;
    if (techLower.includes('mongo')) return <Database size={16} />;
    if (techLower.includes('express')) return <Layers size={16} />;
    if (techLower.includes('socket')) return <Zap size={16} />;
    if (techLower.includes('stripe')) return <Lock size={16} />;
    if (techLower.includes('tailwind')) return <Layout size={16} />;
    if (techLower.includes('responsive')) return <Smartphone size={16} />;
    return <Code2 size={16} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-20 px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'} `}>
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all duration-300 ${
            isDark
              ? 'bg-white/5 hover:bg-white/10 text-text-secondary'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <ArrowLeft size={18} />
          Back to Projects
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Gallery */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div
                className={`rounded-2xl overflow-hidden mb-4 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-xl`}
              >
                <img
                  src={project.images?.[activeImage] || project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {project.images && project.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === idx
                          ? 'border-cyber-cyan'
                          : isDark
                          ? 'border-transparent hover:border-cyber-cyan/50'
                          : 'border-gray-200 hover:border-cyan-400'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDark
                      ? 'bg-cyber-cyan/20 text-cyber-cyan'
                      : 'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  {project.category}
                </span>
                {project.featured && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? 'bg-cyber-pink/20 text-cyber-pink'
                        : 'bg-pink-100 text-pink-700'
                    }`}
                  >
                    Featured
                  </span>
                )}
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-cyber-cyan" />
                  <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} className="text-cyber-purple" />
                  <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.role}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-cyber-pink" />
                  <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.duration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                About This Project
              </h3>
              <div className={`text-sm leading-relaxed space-y-3 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                {project.fullDescription.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                        : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                    }`}
                  >
                    {getTechIcon(tech)}
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {/* <Github size={18} /> */}
                View Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, #00F0FF, #8B5CF6)'
                    : 'linear-gradient(135deg, #00B4C8, #7850DC)',
                  color: 'white',
                }}
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            </div>

            {/* Like & Share */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  liked
                    ? 'text-cyber-pink'
                    : isDark
                    ? 'text-text-secondary hover:text-cyber-pink'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <Heart size={20} fill={liked ? '#EC4899' : 'none'} />
                <span>{likesCount} Likes</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isDark
                      ? 'text-text-secondary hover:text-cyber-cyan'
                      : 'text-gray-600 hover:text-cyan-600'
                  }`}
                >
                  <Share2 size={18} />
                  Share
                </button>

                {showShareMenu && (
                  <div
                    className={`absolute right-0 mt-2 p-2 rounded-lg shadow-xl z-10 ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-cyber-cyan/10 w-full"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-12 p-6 rounded-2xl ${
            isDark ? 'bg-gray-800/50' : 'bg-white'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <MessageCircle size={20} className="text-cyber-cyan" />
            Comments ({comments.length})
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                }`}
              />
            </div>
            <div className="flex gap-3">
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan resize-none ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                }`}
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {comments.length === 0 ? (
              <p className={`text-center py-8 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center text-white text-sm font-bold">
                        {comment.author[0].toUpperCase()}
                      </div>
                      <div>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {comment.author}
                        </span>
                        <span className={`text-xs ml-2 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                          {comment.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm ml-10 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                    {comment.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Add Clock component since it's used
const Clock = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default ProjectDetailsPage;