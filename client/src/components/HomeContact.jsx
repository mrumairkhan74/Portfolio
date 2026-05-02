import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare
} from 'lucide-react';

const HomeContact = () => {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mrumairkhan74@gmail.com', link: 'mailto:mrumairkhan74@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+92 347 6985088', link: 'tel:+923476985088' },
    { icon: MapPin, label: 'Location', value: 'Jand, Attock, Pakistan', link: null },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours', link: null },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className={`py-12 md:py-20 px-3 md:px-4 relative overflow-hidden`}>
      {/* Background Decoration - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-cyber-cyan/5 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl" />
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
            <span className="gradient-text">Get In Touch</span>
          </h2>
          {!isMobile && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Have a project in mind? Let's discuss how we can work together
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 md:gap-8">
          {/* Left Side - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3 md:space-y-4"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={!isMobile ? { x: 10 } : {}}
                  className={`p-3 md:p-5 rounded-xl md:rounded-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800/50 hover:bg-gray-800'
                      : 'bg-white hover:shadow-lg'
                  } border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center ${
                      isDark ? 'bg-cyber-cyan/20' : 'bg-cyan-100'
                    }`}>
                      <Icon size={isMobile ? 18 : 22} className={isDark ? 'text-cyber-cyan' : 'text-cyan-600'} />
                    </div>
                    <div>
                      <h3 className={`text-xs md:text-sm font-medium ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                        {info.label}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className={`text-sm md:text-base font-semibold hover:text-cyber-cyan transition-colors ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-sm md:text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Availability Badge - Smaller on mobile */}
            <div className={`p-3 md:p-5 rounded-xl md:rounded-2xl ${
              isDark ? 'bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10' : 'bg-gradient-to-r from-cyan-50 to-purple-50'
            } border ${isDark ? 'border-cyber-cyan/20' : 'border-cyan-200'}`}>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-xs md:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Available for freelance work
                </span>
              </div>
              <p className={`text-[11px] md:text-sm mt-1.5 md:mt-2 ml-5 md:ml-6 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                Currently open to new opportunities
              </p>
            </div>
          </motion.div>

          {/* Right Side - Contact Form - Reduced padding on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className={`p-4 md:p-6 rounded-xl md:rounded-2xl ${
                isDark ? 'bg-gray-800/50' : 'bg-white'
              } shadow-lg border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
            >
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send a Message
              </h3>

              <div className="space-y-3 md:space-y-4">
                {/* Name Field */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Your Name *
                  </label>
                  <div className="relative">
                    <User size={isMobile ? 14 : 18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-8 md:pl-10 pr-3 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
                        errors.name
                          ? 'border-red-500'
                          : isDark
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[10px] md:text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={isMobile ? 10 : 12} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={isMobile ? 14 : 18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-8 md:pl-10 pr-3 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
                        errors.email
                          ? 'border-red-500'
                          : isDark
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] md:text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={isMobile ? 10 : 12} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare size={isMobile ? 14 : 18} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={isMobile ? 3 : 4}
                      className={`w-full pl-8 md:pl-10 pr-3 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all resize-none ${
                        errors.message
                          ? 'border-red-500'
                          : isDark
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  {errors.message && (
                    <p className="text-[10px] md:text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={isMobile ? 10 : 12} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button - Smaller on mobile */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-1.5 md:py-3 text-sm md:text-base rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-3.5 h-3.5 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={isMobile ? 14 : 18} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message - Smaller on mobile */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2 md:p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-600 flex items-center gap-1.5 md:gap-2"
                  >
                    <CheckCircle size={isMobile ? 14 : 18} />
                    <span className="text-[11px] md:text-sm">Message sent! I'll get back soon.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;