import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Clock
} from 'lucide-react';

const ContactPage = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'mrumairkhan74@gmail.com',
      link: 'mailto:mrumairkhan74@gmail.com',
      color: '#00F0FF'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+92 347 6985088',
      link: 'tel:+923476985088',
      color: '#8B5CF6'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Jand, Attock, Pakistan',
      link: null,
      color: '#EC4899'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: 'Within 24 hours',
      link: null,
      color: '#10B981'
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Show limited FAQs on mobile
  const visibleFaqs = isMobile ? [
    { q: 'What is your typical response time?', a: 'I usually respond within 24 hours during business days.' },
    { q: 'Do you work with international clients?', a: 'Absolutely! I work with clients from all around the world.' }
  ] : [
    { q: 'What is your typical response time?', a: 'I usually respond within 24 hours during business days.' },
    { q: 'Do you work with international clients?', a: 'Absolutely! I work with clients from all around the world.' },
    { q: 'What is your development process?', a: 'I follow agile methodology with regular updates and communication.' },
    { q: 'Do you provide post-launch support?', a: 'Yes, I offer maintenance and support packages for all projects.' }
  ];

  return (
    <div className={`min-h-screen py-16 md:py-20 px-3 md:px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header - Smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-3 md:mb-4`}>
            <span className="gradient-text">Get In Touch</span>
          </h1>
          {!isMobile && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
              Have a project in mind? Let's discuss how we can work together to create something amazing.
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Side - Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 md:space-y-6"
          >
            {/* Contact Cards - Smaller on mobile */}
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={!isMobile ? { x: 10 } : {}}
                  className={`p-4 md:p-5 rounded-xl md:rounded-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800/50 hover:bg-gray-800'
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center`}
                      style={{ backgroundColor: `${info.color}20` }}
                    >
                      <Icon size={isMobile ? 18 : 22} style={{ color: info.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm md:text-base mb-0.5 md:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className={`text-xs md:text-sm ${isDark ? 'text-text-secondary hover:text-cyber-cyan' : 'text-gray-600 hover:text-cyan-600'}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-xs md:text-sm ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Available for freelance work
                </span>
              </div>
              <p className={`text-xs md:text-sm mt-1.5 md:mt-2 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                Currently open to new opportunities and collaborations
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form - Smaller padding on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit}
              className={`p-5 md:p-6 rounded-xl md:rounded-2xl ${
                isDark ? 'bg-gray-800/50' : 'bg-white'
              } shadow-lg`}
            >
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send Me a Message
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                    }`}
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1.5 md:mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={isMobile ? 4 : 5}
                    className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all resize-none ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 md:py-3 text-sm md:text-base rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={isMobile ? 16 : 18} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2 md:p-3 rounded-lg bg-green-500/20 text-green-600 flex items-center gap-2 text-xs md:text-sm"
                  >
                    <CheckCircle size={isMobile ? 16 : 18} />
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2 md:p-3 rounded-lg bg-red-500/20 text-red-600 flex items-center gap-2 text-xs md:text-sm"
                  >
                    <AlertCircle size={isMobile ? 16 : 18} />
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section - Simplified on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-10 md:mt-12 p-5 md:p-6 rounded-xl md:rounded-2xl ${
            isDark ? 'bg-gray-800/50' : 'bg-white'
          } shadow-lg`}
        >
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 md:mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {visibleFaqs.map((faq, idx) => (
              <div key={idx} className="space-y-1.5 md:space-y-2">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <MessageCircle size={isMobile ? 14 : 16} className="text-cyber-cyan flex-shrink-0" />
                  <h3 className={`font-semibold text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {faq.q}
                  </h3>
                </div>
                <p className={`text-xs md:text-sm pl-5 md:pl-6 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
          {isMobile && (
            <div className="text-center mt-4 pt-2">
              <button className={`text-xs ${isDark ? 'text-cyber-cyan' : 'text-cyan-600'}`}>
                View More FAQs →
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;