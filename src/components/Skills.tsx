import React from 'react';
import { motion } from 'framer-motion';
import {
  SiDocker, SiAmazon, SiGithub, SiLinux, SiKubernetes,
  SiPython, SiJavascript, SiHtml5, SiCss3, SiMysql
} from 'react-icons/si';
import { FaUsers, FaComments, FaLightbulb, FaRocket, FaFileAlt } from 'react-icons/fa';
import { BiBrain } from 'react-icons/bi';

const technicalSkills = [
  { name: 'Docker', icon: SiDocker },
  { name: 'AWS Services', icon: SiAmazon },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'Linux', icon: SiLinux },
  { name: 'Python', icon: SiPython },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'HTML', icon: SiHtml5 },
  { name: 'CSS', icon: SiCss3 },
  { name: 'MS Office', icon: FaFileAlt },
  { name: 'SQL', icon: SiMysql },
];

const softSkills = [
  { name: 'Communication Skills', icon: FaComments },
  { name: 'Teamwork', icon: FaUsers },
  { name: 'Leadership', icon: FaRocket },
  { name: 'Problem Solving', icon: FaLightbulb },
  { name: 'Quick Learner', icon: BiBrain },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 60, scale: 0.9 },
  onscreen: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, bounce: 0.35, duration: 0.7 } },
};

const Skills = () => (
  <section id="skills" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="fancy-h1">My Skills</h2>
        <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto drop-shadow">
          A comprehensive showcase of my technical expertise and soft skills
        </p>
      </motion.div>

      {/* Technical Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          Technical Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {technicalSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative flex flex-col items-center justify-center glass-effect rounded-2xl shadow-xl p-6 sm:p-8 group hover:shadow-white/20 transition-all duration-300 cursor-pointer min-h-[160px] border border-white/20"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0], boxShadow: '0 8px 32px 0 rgba(255,255,255,0.18)' }}
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink via-purple to-pink shadow-lg mb-4 group-hover:scale-110 group-hover:shadow-2xl transition-transform duration-300">
                <skill.icon size={38} className="text-white drop-shadow-lg" />
              </div>
              <span className="text-white text-base sm:text-lg font-semibold text-center mt-2 group-hover:text-white transition-colors duration-200" style={{wordBreak: 'break-word'}}>
                {skill.name}
              </span>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-2 group-hover:ring-white/40 transition-all duration-200" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Soft Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          Soft Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {softSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative flex flex-col items-center justify-center glass-effect rounded-2xl shadow-xl p-6 sm:p-8 group hover:shadow-white/20 transition-all duration-300 cursor-pointer min-h-[160px] border border-white/20"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0], boxShadow: '0 8px 32px 0 rgba(255,255,255,0.18)' }}
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple via-pink to-purple shadow-lg mb-4 group-hover:scale-110 group-hover:shadow-2xl transition-transform duration-300">
                <skill.icon size={38} className="text-white drop-shadow-lg" />
              </div>
              <span className="text-white text-base sm:text-lg font-semibold text-center mt-2 group-hover:text-white transition-colors duration-200" style={{wordBreak: 'break-word'}}>
                {skill.name}
              </span>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-2 group-hover:ring-white/40 transition-all duration-200" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;