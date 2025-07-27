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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-surface to-muted min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12 tracking-tight drop-shadow-lg"
        >
          Certifications
        </motion.h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              tabIndex={0}
              aria-label={`Certificate: ${cert.title}`}
              className="relative flex flex-col justify-between bg-white/95 rounded-2xl shadow-2xl border border-primary/20 p-7 hover:scale-[1.04] hover:shadow-primary/40 hover:border-primary transition-all duration-300 group focus-within:ring-2 focus-within:ring-primary"
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <span role="img" aria-label="Issuer">🏢</span>
                  <span className="font-medium">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <span role="img" aria-label="Level">🎓</span>
                  <span>{cert.level}</span>
                </div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <span role="img" aria-label="Date">📅</span>
                  <span>{cert.date}</span>
                </div>
                <p className="text-base text-slate-800 mt-3 mb-6 min-h-[48px]">
                  {cert.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mt-auto w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg hover:from-secondary hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2 relative overflow-hidden"
                onClick={() => openModal(cert.image)}
                type="button"
                aria-label={`Preview certificate: ${cert.title}`}
              >
                <span className="inline-block text-lg animate-pulse">👁️</span> Preview
                <span className="absolute inset-0 rounded-lg pointer-events-none group-hover:ring-2 group-hover:ring-primary/40 transition-all duration-200" />
              </motion.button>
            </motion.div>
          ))}
        </div>
        {/* Modal for image preview */}
        <Transition show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
            </Transition.Child>
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-3xl w-full rounded-2xl bg-white shadow-2xl p-4 relative animate-fade-in">
                  <button
                    className="absolute top-3 right-3 text-slate-600 hover:text-primary bg-slate-100 hover:bg-primary/10 rounded-full p-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setOpen(false)}
                    aria-label="Close preview"
                  >
                    <span className="text-2xl">✖️</span>
                  </button>
                  <img
                    src={currentImg ?? ''}
                    alt="Certificate preview"
                    className="w-full max-h-[80vh] object-contain rounded-xl border"
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