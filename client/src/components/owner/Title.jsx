import React from 'react';
import { motion } from 'framer-motion';

const Title = ({ title, subtitle, align = 'left' }) => {
  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`max-w-4xl ${alignmentClasses[align]}`}
    >
      {/* Main Title */}
      <motion.h1 
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
        whileHover={{ scale: 1.01 }}
      >
        {title}
        {/* Underline effect */}
        <motion.span 
          className="block h-1 bg-gradient-to-r from-blue-500 to-purple-600 w-20 mt-2 mb-4 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        />
      </motion.h1>
      
      {/* Subtitle */}
      <motion.h2
        className="text-lg md:text-xl text-gray-600 mt-3 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {subtitle}
      </motion.h2>
    </motion.div>
  );
};

export default Title;