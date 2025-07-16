import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  return (
    <div className="relative overflow-hidden rounded-2xl mx-4 md:mx-auto max-w-7xl">
      {/* Background gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 to-blue-600/80 z-0"></div>
      
      {/* Background image - Using high-quality Unsplash image */}
      <img 
        src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
        alt="Luxury car"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />
      
      <div className="relative z-10 flex flex-col items-start justify-between p-8 md:p-12 lg:flex-row lg:items-center min-h-[400px]">
        {/* Text content with animations */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Premium <span className="text-blue-300">Car Rental</span> Service
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Experience luxury and comfort with our exclusive fleet of premium vehicles
          </p>
          
          {/* Stats ribbon */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="font-bold text-2xl">200+</p>
              <p className="text-sm opacity-80">Vehicles</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="font-bold text-2xl">24/7</p>
              <p className="text-sm opacity-80">Support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="font-bold text-2xl">50+</p>
              <p className="text-sm opacity-80">Locations</p>
            </div>
          </div>
        </motion.div>
        
        {/* Car image with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative mt-8 lg:mt-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
            alt="Premium car"
            className="w-full max-w-xl rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
          />
          <div className="absolute -bottom-6 -left-6 bg-white text-blue-800 px-4 py-2 rounded-lg shadow-lg font-bold">
            From {currency}500/day
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;