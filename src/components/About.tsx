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
      title: 'ML Enthusiast',
      description: 'Building and deploying machine learning models'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="fancy-h1 mb-6">About Me</h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            I'm a passionate tech enthusiast with a deep interest in DevOps, cloud computing, and system administration. 
            My journey in technology is driven by curiosity and a desire to build efficient, scalable solutions.
          </p>
        </motion.div>

        {/* Profile Image and Info Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                className="w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 mx-auto rounded-full overflow-hidden bg-transparent shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.02 }}
              >
                <img
                  src="/kunika.jpeg"
                  alt="Kunika Prajapat"
                  className="w-full h-full object-cover rounded-full shadow-xl"
                />
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
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Hello, I'm Kunika Prajapat!
              </h3>
              <p className="text-white leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Hello! I'm Kunika Prajapat, currently pursuing MCA (Master of Computer Applications) at Vivekananda Global University.
              </p>
              <p className="text-white leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                I completed my BCA (Bachelor's of Computer Science and Application) building a strong foundation in computer science principles. My passion for technology drives me to explore various domains including DevOps, cloud computing, and web development.
              </p>
              <p className="text-white leading-relaxed text-sm sm:text-base">
              My current focus is on building scalable, secure, and efficient cloud-native solutions using modern DevOps practices
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Traits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 sm:p-8 rounded-2xl text-center group"
            >
              <div className="mb-4 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-primary to-accent text-white"
                >
                  <trait.icon size={24} className="sm:w-6 sm:h-6" />
                </motion.div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {trait.title}
              </h3>
              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                {trait.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="glass-effect p-8 sm:p-10 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              My Journey
            </h3>
            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-6">
              I started my tech journey with a curiosity about how systems work and how to make them more efficient. 
              This led me to explore Linux, cloud platforms, and automation tools. Today, I'm focused on DevOps practices, 
              containerization, and infrastructure as code.
            </p>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              I believe in continuous learning and sharing knowledge with the community. Whether it's contributing to open-source 
              projects or helping others learn new technologies, I'm always excited to be part of the tech ecosystem.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;