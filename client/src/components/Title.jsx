import React from 'react';
import { motion } from 'framer-motion';

const Title = ({ title, subtitle, align = 'center' }) => {
  const alignmentClasses = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col ${alignmentClasses}`}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-sm md:text-base text-gray-500 mt-3 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default Title;
