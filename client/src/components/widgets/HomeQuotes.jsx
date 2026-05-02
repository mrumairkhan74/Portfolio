import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Quote, RefreshCw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const HomeQuote = () => {
  const { isDark } = useTheme();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // Built-in inspiring quotes
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" }
  ];

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (response.ok) {
        const data = await response.json();
        setQuote({ text: data.content, author: data.author });
      } else {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      }
    } catch (error) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-rotate quote every 30 seconds
  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    fetchQuote();
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background - hidden on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyber-cyan/5 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-cyber-purple/5 blur-2xl" />
        </div>
      )}

      {/* Heading - Smaller on mobile */}
      <div className="text-center mb-2 md:mb-3">
        <h2 className={`${isMobile ? 'text-xs' : 'text-lg'} font-semibold tracking-wider flex items-center justify-center gap-1 md:gap-2 ${
          isDark ? 'text-cyber-cyan' : 'text-cyan-700'
        }`}>
          <Sparkles size={isMobile ? 10 : 14} />
          QUOTE OF THE DAY
          <Sparkles size={isMobile ? 10 : 14} />
        </h2>
      </div>

      {/* Quote Card - Reduced padding on mobile */}
      <div
        className={`relative rounded-xl md:rounded-2xl p-3 md:p-5 backdrop-blur-sm ${
          isDark
            ? 'bg-gray-800/30 border border-cyber-cyan/10'
            : 'bg-white/50 border border-cyan-200/50'
        } shadow-md md:shadow-lg`}
      >
        <div className="flex items-start gap-2 md:gap-4">
          {/* Quote Icon - Smaller on mobile */}
          <div className="flex-shrink-0">
            <div className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
              isDark
                ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20'
                : 'bg-gradient-to-r from-cyan-100 to-purple-100'
            }`}>
              <Quote size={isMobile ? 14 : 18} className={isDark ? 'text-cyber-cyan' : 'text-cyan-600'} />
            </div>
          </div>

          {/* Quote Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 md:gap-2"
                >
                  <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
                  <span className={`text-[11px] md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                    Loading...
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key={quote?.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Quote text - Smaller on mobile */}
                  <p className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} leading-relaxed mb-1 md:mb-2 ${
                    isDark ? 'text-text-secondary' : 'text-gray-700'
                  }`}>
                    "{isMobile && quote?.text?.length > 100 
                      ? `${quote.text.substring(0, 80)}...` 
                      : quote?.text}"
                  </p>
                  {/* Author - Smaller on mobile */}
                  <p className={`text-[10px] md:text-xs font-medium ${
                    isDark ? 'text-cyber-cyan' : 'text-cyan-700'
                  }`}>
                    — {quote?.author}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Refresh Button - Smaller on mobile */}
          <button
            onClick={nextQuote}
            disabled={loading}
            className={`flex-shrink-0 p-1.5 md:p-2 rounded-lg transition-all duration-300 ${
              isDark
                ? 'hover:bg-white/10 text-text-secondary hover:text-cyber-cyan'
                : 'hover:bg-gray-100 text-gray-500 hover:text-cyan-600'
            } disabled:opacity-50`}
            title="Get new quote"
          >
            <RefreshCw size={isMobile ? 12 : 16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Auto-refresh indicator - Right aligned */}
        {!isMobile && (
          <div className="absolute bottom-1.5 md:bottom-2 right-3 md:right-4">
            <div className="flex items-center gap-0.5 md:gap-1">
              <Sparkles size={8} className={isDark ? 'text-cyber-cyan/50' : 'text-cyan-400'} />
              <span className={`text-[8px] md:text-[10px] ${isDark ? 'text-text-secondary/50' : 'text-gray-400'}`}>
                Refreshes every 30s
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeQuote;