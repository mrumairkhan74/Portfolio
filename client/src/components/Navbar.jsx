import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Code2,
  Mail,
  LogIn,
  LogOut,
  Menu,
  X,
  Briefcase,
  LayoutDashboard,
  Sparkles,
  User,
  Sun,
  Moon,
  BookOpen
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  // ALL HOOKS MUST BE CALLED FIRST - NO CONDITIONAL BEFORE THIS
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/blog', name: 'Blog', icon: BookOpen },
    { path: '/projects', name: 'Projects', icon: Briefcase },
    { path: '/skills', name: 'Skills', icon: Code2 },
    { path: '/contact', name: 'Contact', icon: Mail },
  ];

  const adminLinks = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
  ];

  // CHECK CONDITION AFTER ALL HOOKS - BEFORE RETURN
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';
  if (isAdminRoute) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 shadow-lg' : 'py-5'
          }`}
        style={{
          backgroundColor: scrolled
            ? isDark
              ? 'rgba(6, 6, 12, 0.92)'
              : 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? isDark
              ? '1px solid rgba(0, 240, 255, 0.12)'
              : '1px solid rgba(0, 180, 200, 0.2)'
            : 'none'
        }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <Sparkles
                    size={28}
                    className={isDark ? 'text-cyber-cyan' : 'text-cyan-600'}
                    style={{
                      filter: isDark
                        ? 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))'
                        : 'drop-shadow(0 0 4px rgba(0, 180, 200, 0.3))'
                    }}
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: isDark
                        ? 'radial-gradient(circle, rgba(0, 240, 255, 0.4), transparent)'
                        : 'radial-gradient(circle, rgba(0, 180, 200, 0.2), transparent)',
                      filter: 'blur(6px)'
                    }}
                  />
                </div>
                <span className={`text-xl font-bold tracking-tight bg-gradient-to-r ${isDark
                  ? 'from-cyber-cyan via-cyber-purple to-cyber-pink'
                  : 'from-cyan-600 via-purple-600 to-pink-600'
                  } bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient`}>
                  Umair Khan
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link key={link.path} to={link.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${isActive
                        ? (isDark ? 'text-cyber-cyan' : 'text-cyan-600')
                        : (isDark ? 'text-text-secondary' : 'text-gray-600')
                        }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium text-sm">{link.name}</span>

                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full -z-10"
                          style={{
                            background: isDark
                              ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(139, 92, 246, 0.06))'
                              : 'linear-gradient(135deg, rgba(0, 180, 200, 0.1), rgba(120, 80, 220, 0.08))',
                            border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.25)' : 'rgba(0, 180, 200, 0.3)'}`
                          }}
                          transition={{ type: 'spring', duration: 0.5 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Admin Section */}
              {isAdmin && (
                <>
                  {adminLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;
                    return (
                      <Link key={link.path} to={link.path}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${isActive
                            ? (isDark ? 'text-cyber-pink' : 'text-pink-600')
                            : (isDark ? 'text-text-secondary' : 'text-gray-600')
                            }`}
                        >
                          <Icon size={18} />
                          <span className="font-medium text-sm">{link.name}</span>

                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 rounded-full -z-10"
                              style={{
                                background: isDark
                                  ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.06))'
                                  : 'linear-gradient(135deg, rgba(220, 60, 140, 0.1), rgba(120, 80, 220, 0.08))',
                                border: `1px solid ${isDark ? 'rgba(236, 72, 153, 0.25)' : 'rgba(220, 60, 140, 0.3)'}`
                              }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </>
              )}

              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`ml-2 px-3 py-2 rounded-full flex items-center gap-2 transition-all duration-300 border ${isDark
                  ? 'bg-cyber-cyan/10 border-cyber-cyan/25 text-cyber-cyan hover:bg-cyber-cyan/20'
                  : 'bg-cyan-100/50 border-cyan-300 text-cyan-700 hover:bg-cyan-100'
                  }`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-sm font-medium hidden sm:inline">
                  {isDark ? 'Light' : 'Dark'}
                </span>
              </motion.button>

              {/* Auth Button */}
              {isAdmin ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className={`ml-4 px-5 py-2 rounded-full flex items-center gap-2 font-medium transition-all duration-300 text-sm border ${isDark
                    ? 'bg-gradient-to-r from-cyber-pink/20 to-cyber-purple/15 border-cyber-pink/35 text-cyber-pink hover:from-cyber-pink/30 hover:to-cyber-purple/25'
                    : 'bg-gradient-to-r from-pink-100 to-purple-100 border-pink-300 text-pink-700 hover:from-pink-200 hover:to-purple-200'
                    }`}
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`ml-4 px-5 py-2 rounded-full flex items-center gap-2 font-medium transition-all duration-300 text-sm border ${isDark
                      ? 'bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/10 border-cyber-cyan/30 text-cyber-cyan hover:from-cyber-cyan/25 hover:to-cyber-purple/20'
                      : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-300 text-cyan-700 hover:from-cyan-200 hover:to-purple-200'
                      }`}
                  >
                    <User size={16} />
                    Admin
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden relative w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDark
                ? 'bg-cyber-cyan/10 border-cyber-cyan/25 hover:bg-cyber-cyan/20'
                : 'bg-cyan-100/50 border-cyan-300 hover:bg-cyan-100'
                }`}
            >
              {isOpen ? (
                <X size={18} className={isDark ? 'text-cyber-cyan' : 'text-cyan-700'} />
              ) : (
                <Menu size={18} className={isDark ? 'text-cyber-cyan' : 'text-cyan-700'} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Keep as is */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 z-40 md:hidden backdrop-blur-md ${isDark ? 'bg-black/95' : 'bg-white/95'
                }`}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed right-0 top-0 bottom-0 w-72 z-50 md:hidden shadow-2xl border-l ${isDark
                ? 'bg-gradient-to-br from-gray-900 to-gray-950 border-cyber-cyan/15'
                : 'bg-gradient-to-br from-white to-gray-50 border-cyan-200'
                }`}
            >
              <div className="flex flex-col h-full pt-24 px-6">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        whileHover={{ x: 10 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${isActive
                          ? isDark
                            ? 'bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/5 border border-cyber-cyan/20 text-cyber-cyan'
                            : 'bg-gradient-to-r from-cyan-100 to-purple-100 border border-cyan-300 text-cyan-700'
                          : isDark
                            ? 'text-gray-400 hover:text-cyan-400'
                            : 'text-gray-600 hover:text-cyan-600'
                          }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{link.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
                {isAdmin && (
                  <>
                    <div className={`h-px my-4 ${isDark ? 'bg-cyber-cyan/10' : 'bg-cyan-200'}`} />
                    {adminLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            whileHover={{ x: 10 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${isActive
                              ? isDark
                                ? 'bg-gradient-to-r from-cyber-pink/10 to-cyber-purple/5 border border-cyber-pink/20 text-cyber-pink'
                                : 'bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-300 text-pink-700'
                              : isDark
                                ? 'text-gray-400 hover:text-pink-400'
                                : 'text-gray-600 hover:text-pink-600'
                              }`}
                          >
                            <Icon size={20} />
                            <span className="font-medium">{link.name}</span>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </>
                )}
                <div className={`h-px my-4 ${isDark ? 'bg-cyber-cyan/10' : 'bg-cyan-200'}`} />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 w-full transition-all duration-300 border ${isDark
                    ? 'bg-cyber-cyan/10 border-cyber-cyan/25 text-cyber-cyan hover:bg-cyber-cyan/20'
                    : 'bg-cyan-100/50 border-cyan-300 text-cyan-700 hover:bg-cyan-100'
                    }`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </motion.button>
                <div className="flex-1" />
                {isAdmin ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-8 w-full transition-all duration-300 border ${isDark
                      ? 'bg-gradient-to-r from-cyber-pink/20 to-cyber-purple/15 border-cyber-pink/35 text-cyber-pink hover:from-cyber-pink/30 hover:to-cyber-purple/25'
                      : 'bg-gradient-to-r from-pink-100 to-purple-100 border-pink-300 text-pink-700 hover:from-pink-200 hover:to-purple-200'
                      }`}
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-8 w-full transition-all duration-300 border ${isDark
                        ? 'bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/10 border-cyber-cyan/30 text-cyber-cyan hover:from-cyber-cyan/25 hover:to-cyber-purple/20'
                        : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-300 text-cyan-700 hover:from-cyan-200 hover:to-purple-200'
                        }`}
                    >
                      <User size={20} />
                      <span className="font-medium">Admin Login</span>
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;