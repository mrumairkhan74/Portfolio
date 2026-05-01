import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Quote, RefreshCw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const HomeQuote = () => {
  const { isDark } = useTheme();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  // Built-in inspiring quotes (will fetch from API but fallback to these)
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
      // Try free API
      const response = await fetch('https://api.quotable.io/random');
      if (response.ok) {
        const data = await response.json();
        setQuote({ text: data.content, author: data.author });
      } else {
        // Use local quotes
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      }
    } catch (error) {
      // Use local quotes if API fails
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
    }, 30000); // Change quote every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    fetchQuote();
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyber-cyan/5 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-cyber-purple/5 blur-2xl" />
      </div>

      {/* Heading */}
      <div className="text-center mb-3">
        <h2 className={`text-lg font-semibold tracking-wider flex items-center justify-center gap-2 ${
          isDark ? 'text-cyber-cyan' : 'text-cyan-700'
        }`}>
          <Sparkles size={14} />
          QUOTE OF THE DAY
          <Sparkles size={14} />
        </h2>
      </div>

      <div
        className={`relative rounded-2xl p-5 md:p-6 backdrop-blur-sm ${
          isDark
            ? 'bg-gray-800/30 border border-cyber-cyan/10'
            : 'bg-white/50 border border-cyan-200/50'
        } shadow-lg`}
      >
        <div className="flex items-start gap-4">
          {/* Quote Icon */}
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark
                ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20'
                : 'bg-gradient-to-r from-cyan-100 to-purple-100'
            }`}>
              <Quote size={18} className={isDark ? 'text-cyber-cyan' : 'text-cyan-600'} />
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
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
                  <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                    Loading wisdom...
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
                  <p className={`text-sm md:text-base leading-relaxed mb-2 ${
                    isDark ? 'text-text-secondary' : 'text-gray-700'
                  }`}>
                    "{quote?.text}"
                  </p>
                  <p className={`text-xs font-medium ${
                    isDark ? 'text-cyber-cyan' : 'text-cyan-700'
                  }`}>
                    — {quote?.author}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Refresh Button */}
          <button
            onClick={nextQuote}
            disabled={loading}
            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
              isDark
                ? 'hover:bg-white/10 text-text-secondary hover:text-cyber-cyan'
                : 'hover:bg-gray-100 text-gray-500 hover:text-cyan-600'
            } disabled:opacity-50`}
            title="Get new quote"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Auto-refresh indicator */}
        <div className="absolute bottom-2 right-4">
          <div className="flex items-center gap-1">
            <Sparkles size={10} className={isDark ? 'text-cyber-cyan/50' : 'text-cyan-400'} />
            <span className={`text-[10px] ${isDark ? 'text-text-secondary/50' : 'text-gray-400'}`}>
              Refreshes every 30s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeQuote;