import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  level: string;
  description: string;
  image: string;
}

export default function Certifications() {
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState<string | null>(null);

  const certifications: Cert[] = [
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Foundation',
      description: 'AWS Cloud Practitioner certification demonstrating fundamental AWS cloud knowledge and services.',
      image: '/kunika1.jpeg'
    },
    {
      title: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Associate',
      description: 'AWS Solutions Architect Associate certification for designing distributed systems on AWS.',
      image: '/kunika2.jpeg'
    },
    {
      title: 'AWS Developer Associate',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Associate',
      description: 'AWS Developer Associate certification for developing and maintaining AWS applications.',
      image: '/kunika3.jpeg'
    },
    {
      title: 'AWS SysOps Administrator',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Associate',
      description: 'AWS SysOps Administrator Associate certification for system operations and deployment.',
      image: '/kunika4.jpeg'
    },
    {
      title: 'AWS DevOps Engineer',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Professional',
      description: 'AWS DevOps Engineer Professional certification for CI/CD and automation expertise.',
      image: '/kunika5.jpeg'
    },
    {
      title: 'AWS Security Specialist',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Specialty',
      description: 'AWS Security Specialty certification for advanced security implementation and compliance.',
      image: '/kunika6.jpeg'
    },
    {
      title: 'AWS Database Specialist',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Specialty',
      description: 'AWS Database Specialty certification for database design and optimization on AWS.',
      image: '/kunika7.jpeg'
    },
    {
      title: 'AWS Machine Learning',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Specialty',
      description: 'AWS Machine Learning Specialty certification for ML and AI solutions on AWS.',
      image: '/kunika8.jpeg'
    },
    {
      title: 'AWS Advanced Networking',
      issuer: 'Amazon Web Services',
      date: '2024',
      level: 'Specialty',
      description: 'AWS Advanced Networking Specialty certification for complex networking solutions.',
      image: '/kunika.jpeg'
    }
  ];

  const openModal = (img: string) => {
    setCurrentImg(img);
    setOpen(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="fancy-h1 mb-12"
        >
          Certifications
        </motion.h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: idx * 0.09, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true, amount: 0.2 }}
              tabIndex={0}
              aria-label={`Certificate: ${cert.title}`}
              className="relative flex flex-col justify-between glass-effect rounded-2xl shadow-2xl border-2 border-white/20 p-0 group focus-within:ring-2 focus-within:ring-white/40 overflow-hidden min-h-[340px] hover:scale-[1.045] hover:shadow-white/20 transition-all duration-300"
              style={{ boxShadow: '0 8px 32px 0 rgba(255,255,255,0.10)' }}
            >
              {/* Animated border */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="w-full h-full rounded-2xl border-4 border-transparent bg-gradient-to-br from-pink via-purple to-pink group-hover:blur-[2px] group-hover:opacity-80 opacity-70 animate-pulse"
                  style={{ filter: 'blur(2px)' }}
                />
              </div>
              <div className="relative z-10 flex flex-col h-full p-7">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 text-white/80 mb-1">
                  <span role="img" aria-label="Issuer">🏢</span>
                  <span className="font-medium">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 mb-1">
                  <span role="img" aria-label="Level">🎓</span>
                  <span>{cert.level}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 mb-1">
                  <span role="img" aria-label="Date">📅</span>
                  <span>{cert.date}</span>
                </div>
                <p className="text-base text-white/70 mt-3 mb-6 min-h-[48px]">
                  {cert.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: '0 4px 24px rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-auto w-full py-2 px-4 rounded-lg bg-gradient-to-r from-pink to-purple text-white font-semibold shadow-lg hover:from-purple hover:to-pink focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 flex items-center justify-center gap-2 relative overflow-hidden"
                  onClick={() => openModal(cert.image)}
                  type="button"
                  aria-label={`Preview certificate: ${cert.title}`}
                >
                  <span className="inline-block text-lg animate-pulse">👁️</span> Preview
                  <span className="absolute inset-0 rounded-lg pointer-events-none group-hover:ring-2 group-hover:ring-white/40 transition-all duration-200" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Modal for image preview */}
        <Transition show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <div className="fixed inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />
            </Transition.Child>
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-400"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <Dialog.Panel className="max-w-3xl w-full rounded-2xl glass-effect shadow-2xl p-4 relative animate-fade-in border border-white/20">
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 text-white hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                    onClick={() => setOpen(false)}
                    aria-label="Close preview"
                  >
                    <span className="text-2xl">✖️</span>
                  </motion.button>
                  <motion.img
                    src={currentImg ?? ''}
                    alt="Certificate preview"
                    className="w-full max-h-[80vh] object-contain rounded-xl border border-white/20 shadow-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4, type: 'spring', bounce: 0.25 }}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </section>
  );
}