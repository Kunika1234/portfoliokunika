import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect-dark border-b border-primary/30 shadow-xl backdrop-blur-md'
          : 'bg-transparent'
      }`}
      style={{
        boxShadow: isScrolled
          ? '0 4px 32px 0 rgba(112,1,43,0.12)' : 'none',
        borderBottom: isScrolled ? '2px solid #DDA15E' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Digital Signature as Navbar Brand */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-signature text-white select-none px-2 sm:px-3 py-1 rounded-lg"
            style={{
              fontFamily: 'Great Vibes, Satisfy, Dancing Script, cursive',
              fontSize: '2.3rem',
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              textShadow: '0 2px 8px rgba(56,189,248,0.18)',
            }}
          >
            {'<Kunika Prajapat/>'}
          </motion.div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 lg:ml-10 flex items-baseline space-x-3 lg:space-x-4">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.12, color: '#38bdf8' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-primary hover:text-accent transition-colors px-2 sm:px-3 py-2 rounded-md text-sm lg:text-base font-semibold"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary hover:text-accent transition-colors p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-accent/20 shadow-md transition-all"
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.1 }}
              aria-label="Toggle mobile menu"
            >
              <span className="text-xl sm:text-2xl">☰</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-start pt-24 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-effect-dark rounded-2xl p-6 sm:p-8 w-[95vw] sm:w-[90vw] max-w-sm shadow-2xl border border-primary/30"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        scrollToSection(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      whileHover={{ scale: 1.08, backgroundColor: '#70012B', color: '#fff' }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full text-primary hover:text-accent transition-colors px-4 py-3 rounded-lg text-base sm:text-lg font-semibold text-left transition-colors relative overflow-hidden"
                    >
                      <span>{item.name}</span>
                      <motion.span
                        layoutId="nav-underline-mobile"
                        className="absolute left-0 bottom-2 h-[2.5px] w-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        whileHover={{ scaleX: 1 }}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;