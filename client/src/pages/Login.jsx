import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn,
  // Sparkles,
  Shield,
  AlertCircle
} from 'lucide-react';

const LoginPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Demo credentials
  const demoCredentials = {
    email: 'admin@portfolio.com',
    password: 'admin@123'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (formData.email === demoCredentials.email && formData.password === demoCredentials.password) {
        localStorage.setItem('adminToken', 'demo-token-12345');
        localStorage.setItem('adminUser', JSON.stringify({
          email: formData.email,
          name: 'Admin User',
          role: 'admin'
        }));
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  // const fillDemoCredentials = () => {
  //   setFormData({
  //     email: demoCredentials.email,
  //     password: demoCredentials.password
  //   });
  // };

  return (
    <div className={`min-h-screen flex items-center justify-center py-16 md:py-20 px-3 md:px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      {/* Background decoration - reduced on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyber-cyan/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-cyber-purple/10 blur-3xl" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand - Smaller on mobile */}
        <div className="text-center mb-6 md:mb-8">
          <div className={`inline-flex items-center justify-center ${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-2xl bg-gradient-to-r from-cyber-cyan to-cyber-purple shadow-lg mb-3 md:mb-4`}>
            <Shield size={isMobile ? 28 : 32} className="text-white" />
          </div>
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Portal
          </h1>
          {!isMobile && (
            <p className={`text-sm mt-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Sign in to manage your portfolio
            </p>
          )}
        </div>

        {/* Login Card - Reduced padding on mobile */}
        <div
          className={`rounded-xl md:rounded-2xl p-5 md:p-8 backdrop-blur-sm ${
            isDark
              ? 'bg-gray-800/50 border border-cyber-cyan/20'
              : 'bg-white/80 border border-gray-200'
          } shadow-2xl`}
        >
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Email Field */}
            <div>
              <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={isMobile ? 16 : 18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-9 md:pl-10 pr-3 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="admin@portfolio.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock size={isMobile ? 16 : 18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-9 md:pl-10 pr-9 md:pr-10 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={isMobile ? 16 : 18} className="text-gray-400 hover:text-cyber-cyan" />
                  ) : (
                    <Eye size={isMobile ? 16 : 18} className="text-gray-400 hover:text-cyber-cyan" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 md:p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-1.5 md:gap-2"
              >
                <AlertCircle size={isMobile ? 14 : 16} className="text-red-500" />
                <p className="text-xs md:text-sm text-red-500">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={isMobile ? 16 : 18} />
                  Sign In
                </>
              )}
            </button>

            {/* Demo Credentials Button */}
            {/* <button
              type="button"
              onClick={fillDemoCredentials}
              className={`w-full py-1.5 md:py-2 text-xs md:text-sm rounded-lg transition-all duration-300 ${
                isDark
                  ? 'text-cyber-cyan hover:bg-cyber-cyan/10'
                  : 'text-cyan-600 hover:bg-cyan-50'
              }`}
            >
              Use Demo Credentials
            </button> */}
          </form>

          {/* Demo Credentials Info - Simplified on mobile */}
          {/* <div className={`mt-4 md:mt-6 pt-4 md:pt-6 border-t text-center ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
              <Sparkles size={isMobile ? 12 : 14} className="text-cyber-cyan" />
              <span className={`text-[10px] md:text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                Demo Credentials
              </span>
            </div>
            {isMobile ? (
              <>
                <code className={`text-[10px] ${isDark ? 'text-cyber-cyan' : 'text-cyan-700'}`}>
                  admin@portfolio.com
                </code>
                <br />
                <code className={`text-[10px] ${isDark ? 'text-cyber-cyan' : 'text-cyan-700'}`}>
                  password: admin123
                </code>
              </>
            ) : (
              <code className={`text-xs ${isDark ? 'text-cyber-cyan' : 'text-cyan-700'}`}>
                Email: admin@portfolio.com<br />
                Password: admin123
              </code>
            )}
          </div> */}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-5 md:mt-6">
          <button
            onClick={() => navigate('/')}
            className={`text-xs md:text-sm ${isDark ? 'text-text-secondary hover:text-cyber-cyan' : 'text-gray-500 hover:text-cyan-600'}`}
          >
            ← Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;