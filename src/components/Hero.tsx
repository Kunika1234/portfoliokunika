import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  useEffect(() => {
    const texts = [
      'Cloud Engineer',
      'DevOps Engineer'
    ];

    const timeout = setTimeout(() => {
      if (charIndex < texts[currentIndex].length) {
        setCurrentText(prev => prev + texts[currentIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCurrentText('');
          setCharIndex(0);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [charIndex, currentIndex]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fancy-h1 px-4 sm:px-0"
          >
            I'm{' '}
            <motion.span
              className="gradient-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Kunika Prajapat
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-secondary mb-6 sm:mb-8 h-8 sm:h-10 md:h-12 px-4 sm:px-0"
          >
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-primary"
            >
              |
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-8"
          >
         I'm a passionate DevOps and Cloud Engineer with hands-on knowledge of tools like docker ,kubernetes, linux ,git and github,aws services.
         I enjoy automating processes , managing cloud infrastructure and continuously learning new technologies to improve system efficiency.           
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0"
          >
            <motion.a
              href="/Resume_Kunika.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(139, 69, 19, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="gradient-bg text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              Download Resume
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
              Get In Touch
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-4 sm:gap-6 px-4 sm:px-0"
          >
            {[
              { icon: Github, href: 'https://github.com/Kunika1234', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/kunika-prajapat-486a06311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:kunikaprajapat1026@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                className="p-2.5 sm:p-3 glass-effect rounded-full text-white hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;