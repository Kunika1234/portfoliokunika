import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Kunika1234', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kunika-prajapat-486a06311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kunika.prajapat@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-transparent backdrop-blur-2xl border-t-0 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated glowing border */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="w-full h-full rounded-t-3xl border-t-4 border-b-0 border-x-0 border-gradient-to-r from-[#38b6ff] via-[#b388ff] to-[#ffd803] animate-pulse opacity-60" style={{ borderTopStyle: 'solid' }} />
      </motion.div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.08, rotate: -2, textShadow: '0 0 16px #38b6ff' }}
              onClick={scrollToTop}
              className="cursor-pointer select-none"
            >
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">Kunika Prajapat</h3>
              <p className="text-primary font-semibold tracking-wide">Tech Explorer & Problem Solver</p>
            </motion.div>
            <p className="text-secondary text-sm leading-relaxed">
              Passionate about leveraging cutting-edge technology to solve real-world problems. 
              Specializing in AI, web development, and cloud solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  whileHover={{ x: 8, color: '#38b6ff', scale: 1.08 }}
                  className="block text-secondary hover:text-primary transition-all text-sm font-semibold tracking-wide nav-link-unique"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.18, boxShadow: '0 0 16px #38b6ff, 0 0 32px #b388ff' }}
                  className="w-11 h-11 glass-effect rounded-full flex items-center justify-center text-secondary hover:text-white hover:bg-primary/30 transition-all border-2 border-white/10 hover:border-[#38b6ff]"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="text-secondary text-sm">
              Feel free to reach out for collaborations or just a friendly hello!
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-secondary text-sm">
              <span>© {currentYear} Kunika Prajapat. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-400 fill-current" />
              </motion.div>
              <span>and lots of ☕</span>
            </div>
            
            <div className="text-secondary text-sm">
              <span>Built with React, TypeScript & Framer Motion</span>
            </div>
          </div>
        </motion.div>
        {/* Floating scroll-to-top button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.18, boxShadow: '0 0 16px #38b6ff' }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#38b6ff] via-[#b388ff] to-[#ffd803] text-white p-3 rounded-full shadow-xl border-2 border-white/20 hover:border-[#38b6ff] backdrop-blur-lg"
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;