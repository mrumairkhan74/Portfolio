import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn,
  Sparkles,
  Shield,
  AlertCircle
} from 'lucide-react';

const LoginPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


  };



  return (
    <div className={`min-h-screen flex items-center justify-center py-20 px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyber-cyan/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-cyber-purple/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyber-cyan to-cyber-purple shadow-lg mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Portal
          </h1>
          <p className={`text-sm mt-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Login Card */}
        <div
          className={`rounded-2xl p-8 backdrop-blur-sm ${
            isDark
              ? 'bg-gray-800/50 border border-cyber-cyan/20'
              : 'bg-white/80 border border-gray-200'
          } shadow-2xl`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
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
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
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
                    <EyeOff size={18} className="text-gray-400 hover:text-cyber-cyan" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-cyber-cyan" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
              >
                <AlertCircle size={16} className="text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>

          </form>

         
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className={`text-sm ${isDark ? 'text-text-secondary hover:text-cyber-cyan' : 'text-gray-500 hover:text-cyan-600'}`}
          >
            ← Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;