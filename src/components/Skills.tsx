import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiDocker, SiJenkins, SiGithubactions, SiAmazon, SiGithub, SiPython, SiC, SiJavascript, SiHtml5, SiCss3, SiFigma, SiFirebase, SiBootstrap, SiJquery, SiReact, SiFlask, SiMongodb, SiLinux, SiNginx, SiApache, SiWordpress, SiKubernetes, SiNodedotjs
} from 'react-icons/si';
import { FaGitAlt, FaMobileAlt, FaCloud, FaRegFileCode, FaRegFileAlt } from 'react-icons/fa';

const Skills = () => {
  const skillCategories = [
    {
      title: 'DevOps',
      skills: [
        { name: 'Docker', icon: SiDocker },
        { name: 'Jenkins CI/CD', icon: SiJenkins },
        { name: 'Github Actions', icon: SiGithubactions },
        { name: 'AWS Services', icon: SiAmazon },
        { name: 'Kubernetes', icon: SiKubernetes },
        { name: 'Cloudwatch', icon: FaCloud },
        { name: 'EC2 & Web Server logs', icon: FaRegFileAlt },
        { name: 'Git', icon: FaGitAlt },
        { name: 'GitHub', icon: SiGithub },
        { name: 'Linux', icon: SiLinux },
      ]
    },
    {
      title: 'Full Stack Web Development',
      skills: [
        { name: 'Wordpress', icon: SiWordpress },
        { name: 'AJAX', icon: FaRegFileCode },
        { name: 'REST APIs', icon: FaRegFileCode },
        { name: 'Python', icon: SiPython },
        { name: 'C', icon: SiC },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'HTML5', icon: SiHtml5 },
        { name: 'CSS3', icon: SiCss3 },
        { name: 'Firebase', icon: SiFirebase },
        { name: 'Apache', icon: SiApache },
        { name: 'Nginx', icon: SiNginx },
        { name: 'Bootstrap', icon: SiBootstrap },
        { name: 'jQuery', icon: SiJquery },
        { name: 'ReactJS', icon: SiReact },
        { name: 'Flask', icon: SiFlask },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Node.js', icon: SiNodedotjs },
      ]
    },
    {
      title: 'Other Skills',
      skills: [
        { name: 'Figma', icon: SiFigma },
        { name: 'FlutterFlow', icon: FaMobileAlt },
      ]
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise
          </p>
        </motion.div>

        {/* DevOps Engineer Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10" style={{fontFamily: 'cursive'}}>As a DevOps Engineer</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {skillCategories[0].skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-[#23272f] flex items-center justify-center mb-3 shadow-lg border-2 border-[#23272f] hover:border-primary transition-all duration-300">
                  <skill.icon size={60} className="text-white" />
                </div>
                <span className="text-white text-lg font-semibold text-center" style={{wordBreak: 'break-word'}}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Stack Web Developer Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10" style={{fontFamily: 'cursive'}}>As a Full Stack Web Developer</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {skillCategories[1].skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-[#23272f] flex items-center justify-center mb-3 shadow-lg border-2 border-[#23272f] hover:border-primary transition-all duration-300">
                  <skill.icon size={60} className="text-white" />
                </div>
                <span className="text-white text-lg font-semibold text-center" style={{wordBreak: 'break-word'}}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other Skills Section */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10" style={{fontFamily: 'cursive'}}>Other Skills</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {skillCategories[2].skills.length === 0 ? (
              <span className="text-secondary text-lg">(Add more skills here!)</span>
            ) : (
              skillCategories[2].skills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-[#23272f] flex items-center justify-center mb-3 shadow-lg border-2 border-[#23272f] hover:border-primary transition-all duration-300">
                    <skill.icon size={60} className="text-white" />
                  </div>
                  <span className="text-white text-lg font-semibold text-center" style={{wordBreak: 'break-word'}}>{skill.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;