import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

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
    
    // Simulate API call
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
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-cyber-cyan/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
            Have a project in mind? Let's discuss how we can work together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className={`p-5 rounded-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800/50 hover:bg-gray-800'
                      : 'bg-white hover:shadow-lg'
                  } border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark ? 'bg-cyber-cyan/20' : 'bg-cyan-100'
                    }`}>
                      <Icon size={22} className={isDark ? 'text-cyber-cyan' : 'text-cyan-600'} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                        {info.label}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className={`text-base font-semibold hover:text-cyber-cyan transition-colors ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Availability Badge */}
            <div className={`p-5 rounded-2xl ${
              isDark ? 'bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10' : 'bg-gradient-to-r from-cyan-50 to-purple-50'
            } border ${isDark ? 'border-cyber-cyan/20' : 'border-cyan-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Available for freelance work
                </span>
              </div>
              <p className={`text-sm mt-2 ml-6 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                Currently open to new opportunities and collaborations
              </p>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className={`p-6 rounded-2xl ${
                isDark ? 'bg-gray-800/50' : 'bg-white'
              } shadow-lg border ${isDark ? 'border-cyber-cyan/10' : 'border-gray-200'}`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send a Message
              </h3>

              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Your Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
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
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all ${
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
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-700'}`}>
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan transition-all resize-none ${
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
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-600 flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
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