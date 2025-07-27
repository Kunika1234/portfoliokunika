import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { AnimatePresence } from 'framer-motion';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Python', value: 'python' },
  { label: 'OpenCV', value: 'opencv' },
  { label: 'AWS Services', value: 'aws' },
  { label: 'Docker', value: 'docker' },
  { label: 'Other Tasks', value: 'other' },
];

const filterProject = (project, filter) => {
  if (filter === 'all') return true;
  if (filter === 'python') return project.techStack.some(t => t.toLowerCase().includes('python'));
  if (filter === 'opencv') return project.techStack.some(t => t.toLowerCase().includes('opencv'));
  if (filter === 'aws') return project.techStack.some(t => t.toLowerCase().includes('aws'));
  if (filter === 'docker') return project.techStack.some(t => t.toLowerCase().includes('docker'));
  if (filter === 'other') return !(
    project.techStack.some(t => ['python','opencv','aws','docker'].some(f => t.toLowerCase().includes(f)))
  );
  return true;
};

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeProjectTitle, setActiveProjectTitle] = useState('');
  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // At the top of the file, define the simple live demo projects
  const simpleLiveDemoProjects = [
    'Tic Tac Toe',
    'Calculator',
    'Cube Animation',
    'Holi Project',
    'New Year Project'
  ];

  const handleCardClick = (project) => {
    // For simple live demo projects, open live URL in new tab
    if (simpleLiveDemoProjects.includes(project.title) && project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener noreferrer');
      return;
    }
    // For all other projects, do nothing on card click (no modal)
  };

  const handleLiveDemoClick = (project, e) => {
    e.stopPropagation();
    // For simple live demo projects, open live URL in new tab
    if (simpleLiveDemoProjects.includes(project.title) && project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener noreferrer');
      return;
    }
    setActiveProjectTitle(project.title);
    setShowLiveDemo(true); // Only show live demo modal on button click
    setShowModal(true);
  };

  const projects = [
    {
      title: 'AWS DevOps Blue Green Deployment',
      description: 'A comprehensive analytics platform using machine learning to provide predictive insights and real-time data visualization.',
      techStack: ['EC2', 'Docker', 'Linux', 'CI/CD'],
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', // AWS logo
      githubUrl: 'https://github.com/sachinlunayach/aws-devops-bluegreen-deployment',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Jenkins Docker Node Pipeline',
      description: 'A CI/CD pipeline project demonstrating Jenkins integration with Docker and Node.js for automated builds and deployments.',
      techStack: ['Jenkins', 'Docker', 'Node.js', 'CI/CD'],
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', // Jenkins logo
      githubUrl: 'https://github.com/sachinlunayach/jenkins-docker-node-pipeline.git',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Food Waste Management',
      description: 'A web application to track, manage, and reduce food waste, promoting sustainability and efficient resource usage.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png', // Food waste icon
      githubUrl: 'https://github.com/sachinlunayach/Food_Waste_Management',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Twilio Communication Suite',
      description: 'Advanced communication platform with SMS, voice calls, and automated messaging capabilities using Twilio API.',
      techStack: ['Python', 'Flask', 'Twilio', 'REST API', 'SMS'],
      image: 'https://seeklogo.com/images/T/twilio-logo-DA7B5A8A0B-seeklogo.com.png', // Twilio logo
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'AWS EC2 Instance Manager',
      description: 'Cloud infrastructure management tool for creating and managing EC2 instances with hand gesture recognition.',
      techStack: ['AWS', 'EC2', 'OpenCV', 'Python', 'Boto3'],
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', // AWS logo
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Computer Vision Image Processor',
      description: 'Advanced image processing application with face detection, cropping, filtering, and accessory addition capabilities.',
      techStack: ['OpenCV', 'Python', 'Computer Vision', 'AI', 'Image Processing'],
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', // OpenCV logo
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Instagram Auto Poster',
      description: 'Automated Instagram posting tool with image processing and caption management for social media automation.',
      techStack: ['Python', 'Instagram API', 'Image Processing', 'Automation'],
      image: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', // Instagram icon
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'WhatsApp Automation Tool',
      description: 'Automated WhatsApp messaging system with scheduled message delivery and bulk messaging capabilities.',
      techStack: ['Python', 'WhatsApp API', 'Automation', 'Scheduling'],
      image: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', // WhatsApp icon
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'AWS S3 Bucket Manager',
      description: 'Cloud storage management tool for creating and managing S3 buckets across different AWS regions.',
      techStack: ['AWS', 'S3', 'Python', 'Boto3', 'Cloud Storage'],
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', // AWS logo
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'AI Image Recognition System',
      description: 'Machine learning-powered image recognition system using AWS Rekognition for object and scene detection.',
      techStack: ['AWS Rekognition', 'AI', 'Machine Learning', 'Python', 'Computer Vision'],
      image: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png', // AI recognition icon
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Email Automation System',
      description: 'Advanced email management system with scheduled sending, template support, and SMTP integration.',
      techStack: ['Python', 'SMTP', 'Email', 'Scheduling', 'Automation'],
      image: 'https://cdn-icons-png.flaticon.com/512/561/561127.png', // Email icon
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'IP Camera Surveillance',
      description: 'Real-time IP camera monitoring system with video streaming and photo capture capabilities.',
      techStack: ['OpenCV', 'IP Camera', 'Video Streaming', 'Python', 'Surveillance'],
      image: 'https://cdn-icons-png.flaticon.com/512/2920/2920257.png', // Camera icon
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Custom Image Generator',
      description: 'Dynamic image creation tool for generating custom shapes, lines, and graphics programmatically.',
      techStack: ['OpenCV', 'Python', 'Image Generation', 'Graphics', 'Custom Shapes'],
      image: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png', // Custom shapes icon
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Google Search Integration',
      description: 'Web search integration tool with Google and Bing search capabilities and result processing.',
      techStack: ['Python', 'Web Scraping', 'Search API', 'Google', 'Bing'],
      image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png', // Search icon
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Holi Project',
      description: 'A colorful Holi festival web project with interactive effects.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://cdn-icons-png.flaticon.com/512/2917/2917997.png', // Holi icon
      githubUrl: '',
      liveUrl: 'https://sachinlunayach.github.io/HoliProject/',
      featured: false
    },
    {
      title: 'New Year Project',
      description: 'Celebrate New Year 2024 with this festive web project.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://cdn-icons-png.flaticon.com/512/616/616494.png', // New Year icon
      githubUrl: '',
      liveUrl: 'https://sachinlunayach.github.io/HN24/',
      featured: false
    },
    {
      title: 'Cube Animation',
      description: 'A 3D cube animation project using web technologies.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png', // Cube icon
      githubUrl: '',
      liveUrl: 'https://sachinlunayach.github.io/cubeanimation1/',
      featured: false
    },
    {
      title: 'Calculator',
      description: 'A simple JavaScript calculator app.',
      techStack: ['JavaScript', 'HTML', 'CSS'],
      image: 'https://cdn-icons-png.flaticon.com/512/992/992651.png', // Calculator icon
      githubUrl: 'https://github.com/sachinlunayach/calcultor',
      liveUrl: 'https://sachinlunayach.github.io/calcultor/',
      featured: false
    },
    {
      title: 'Tic Tac Toe',
      description: 'A classic Tic Tac Toe game built with JavaScript.',
      techStack: ['JavaScript', 'HTML', 'CSS'],
      image: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png', // Tic Tac Toe icon
      githubUrl: 'https://github.com/sachinlunayach/tic-toe',
      liveUrl: 'https://sachinlunayach.github.io/tic-toe/',
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 bg-gradient-to-br from-surface to-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-3 sm:mb-4 tracking-tight">My Projects</h2>
          <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto px-4 sm:px-0">A showcase of my best work, with live demos and code for each project.</p>
        </motion.div>
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 lg:mb-14 px-2 sm:px-0">
          {FILTERS.map(f => (
            <motion.button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08, boxShadow: '0 4px 24px 0 rgba(0, 123, 255, 0.15)' }}
              animate={activeFilter === f.value ? { scale: 1.1, background: 'linear-gradient(90deg,#70012B,#4B011D)', color: '#fff', boxShadow: '0 6px 32px 0 rgba(112,1,43,0.25)' } : { scale: 1, background: '#25000E', color: '#70012B', boxShadow: 'none' }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`px-6 py-2 rounded-lg font-semibold text-lg focus:outline-none border-2 border-primary transition-all duration-200 ${activeFilter === f.value ? 'shadow-lg' : 'bg-surface text-primary hover:bg-highlight/80 hover:text-white'}`}
              style={{ minWidth: '100px', fontSize: '14px' }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projects.filter(p => filterProject(p, activeFilter)).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-effect border border-white/10 shadow-xl group cursor-pointer transition-all duration-300"
              onClick={() => handleCardClick(project)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-primary to-accent text-white px-3 sm:px-4 py-1 rounded-full text-xs font-bold shadow-lg">Featured</span>
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-7 flex flex-col gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-secondary text-sm sm:text-base mb-2 leading-relaxed min-h-[48px]">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-primary/10 animate-pulse"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-3 mt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-primary to-accent text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-highlight/80 transition-all duration-200 text-sm sm:text-base"
                    onClick={e => handleLiveDemoClick(project, e)}
                  >
                    <ExternalLink size={18} /> Live Demo
                  </motion.button>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-highlight/80 transition-all duration-200 text-sm sm:text-base"
                      onClick={e => e.stopPropagation()}
                    >
                      <Github size={18} /> Code
                    </motion.a>
                  )}
                </div>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showModal && (
            <ProjectModal
              show={showModal}
              onHide={() => setShowModal(false)}
              projectTitle={activeProjectTitle}
              showLiveDemo={showLiveDemo}
              liveUrl={projects.find(p => p.title === activeProjectTitle)?.liveUrl}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;