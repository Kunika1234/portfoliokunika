import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blogs = () => {
  const blogs = [
    {
      title: 'Building Scalable AI Applications with Microservices',
      excerpt: 'Learn how to architect and deploy AI-powered applications using microservices patterns for better scalability and maintainability.',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'AI/ML',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      title: 'The Future of Web Development: What to Expect in 2024',
      excerpt: 'Explore the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      title: 'Optimizing Cloud Infrastructure for Cost and Performance',
      excerpt: 'Best practices for managing cloud resources efficiently while maintaining high performance and reducing operational costs.',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Cloud Computing',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Introduction to Computer Vision with OpenCV',
      excerpt: 'A comprehensive guide to getting started with computer vision projects using OpenCV and Python.',
      date: '2023-12-28',
      readTime: '12 min read',
      category: 'AI/ML',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Implementing CI/CD Pipelines with GitHub Actions',
      excerpt: 'Step-by-step tutorial on setting up automated deployment pipelines using GitHub Actions for modern web applications.',
      date: '2023-12-20',
      readTime: '7 min read',
      category: 'DevOps',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'React Performance Optimization Techniques',
      excerpt: 'Advanced techniques and best practices for optimizing React applications for better user experience and performance.',
      date: '2023-12-15',
      readTime: '9 min read',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI/ML': 'bg-primary/20 text-primary',
      'Web Development': 'bg-accent/20 text-accent',
      'Cloud Computing': 'bg-secondary/20 text-secondary',
      'DevOps': 'bg-primary/20 text-primary'
    };
    return colors[category] || 'bg-secondary/20 text-secondary';
  };

  return (
    <section id="blogs" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest Blogs
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Sharing insights, tutorials, and thoughts on technology
          </p>
        </motion.div>

        {/* Featured Blogs */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {blogs.filter(blog => blog.featured).map((blog, index) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="gradient-bg text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-secondary text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-secondary mb-4 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-primary font-medium"
                >
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Regular Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogs.filter(blog => !blog.featured).map((blog, index) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-3 text-secondary text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-secondary text-sm mb-3 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-1 text-primary font-medium text-sm"
                >
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;