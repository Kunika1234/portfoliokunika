import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Users, Server, Terminal } from 'lucide-react';

const About = () => {
  const traits = [
    {
      icon: Server,
      title: 'Aspiring DevOps Engineer',
      description: 'Hands-on with CI/CD, Docker, and infrastructure automation'
    },
    {
      icon: Terminal,
      title: 'Linux Enthusiast',
      description: 'Gaining deep skills in Linux systems and command-line operations'
    },
    {
      icon: Cloud,
      title: 'Cloud Learner',
      description: 'Working with AWS services to build and deploy cloud solutions'
    },
    {
      icon: Users,
      title: 'Technical Volunteer',
      description: 'Supporting tech events and sharing knowledge at Linux World'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated SVG background shape */}
      <motion.svg
        className="absolute -top-32 -left-32 w-[600px] h-[600px] opacity-30 z-0"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.circle
          cx="300" cy="300" r="250"
          fill="url(#paint0_radial)"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 300) rotate(90) scale(250)">
            <stop stopColor="#70012B" />
            <stop offset="1" stopColor="#5D0124" stopOpacity="0.7" />
          </radialGradient>
        </defs>
      </motion.svg>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-highlight bg-clip-text text-transparent drop-shadow-lg"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-white max-w-3xl mx-auto px-4 sm:px-0"
          >
            Get to know the person behind the code
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Profile Image with animated border */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-accent to-highlight p-1 shadow-2xl"
                animate={{ boxShadow: [
                  '0 0 40px 0 #70012B',
                  '0 0 60px 10px #5D0124',
                  '0 0 40px 0 #70012B'
                ] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              >
                <img
                  src="/kunika.jpeg"
                  alt="Kunika Prajapat"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-accent"
                />
              </motion.div>
              {/* Animated SC badge */}
              <motion.div
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 bg-gradient-to-br from-pink-500 to-yellow-400 rounded-full flex items-center justify-center shadow-xl border-2 sm:border-4 border-white animate-bounce-slow"
                animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                <motion.span
                  className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-widest"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  KP
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.div
              className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-primary/30 transition-shadow duration-300 backdrop-blur-md bg-white/10 border border-primary/30"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Hello, I'm Kunika Prajapat!
              </h3>
              <p className="text-white leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                I'm an aspiring DevOps Engineer with a strong foundation in Linux, cloud technologies, and automation. 
                Currently pursuing a Bachelor's degree (B.Tech) in Computer Science & Engineering from RTU, Kota, 
                I'm continuously refining my skills in the DevOps and Cloud domain.
              </p>
              <p className="text-white leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                My journey in tech bridges web development, artificial intelligence, and scalable cloud architecture. 
                I'm passionate about continuous learning and excited to contribute to real-world projects that challenge and grow my abilities.
              </p>
              <p className="text-white leading-relaxed text-sm sm:text-base">
                When I'm not coding, you'll find me exploring emerging tech trends, volunteering at Linux World, or sharing knowledge through open-source contributions and technical communities.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Traits with staggered animation */}
        <motion.div
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } }
          }}
        >
          {traits.map((trait) => (
            <motion.div
              key={trait.title}
              className="flex flex-col items-center justify-center glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-primary/30 transition-shadow duration-300 backdrop-blur-md bg-white/10 border border-primary/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
              transition={{ duration: 0.6, type: 'spring' }}
              viewport={{ once: true }}
            >
              <span className="mb-4">
                <trait.icon size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10 text-accent drop-shadow-lg" />
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 text-center">
                {trait.title}
              </h4>
              <p className="text-white text-center text-sm sm:text-base">
                {trait.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;