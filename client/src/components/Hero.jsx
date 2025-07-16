import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    // Parallax scroll effect
    const ref = useRef(null);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    // Text animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section 
            ref={ref}
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Background with parallax effect */}
            <motion.div 
                className="absolute inset-0 bg-black/30 z-0"
                style={{ opacity: opacityBg }}
            >
                <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        y: yBg,
                        backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2383&q=80')" 
                    }}
                />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-1"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-1"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <motion.div 
                    className="container mx-auto px-6 lg:px-12"
                    initial="hidden"
                    animate="visible"
                    variants={container}
                >
                    <div className="max-w-2xl">
                        <motion.span 
                            className="inline-block text-blue-400 font-medium mb-4 tracking-wider"
                            variants={item}
                        >
                            PREMIUM MOBILITY SOLUTIONS
                        </motion.span>
                        
                        <motion.h1 
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
                            variants={item}
                        >
                            <span className="text-white">Redefining</span>{' '}
                            <span className="text-blue-400">Luxury</span>{' '}
                            <span className="text-white">Travel</span>
                        </motion.h1>
                        
                        <motion.p 
                            className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg"
                            variants={item}
                        >
                            Experience unparalleled comfort with our curated fleet of premium vehicles, tailored for those who demand excellence.
                        </motion.p>
                        
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            variants={item}
                        >
                            <motion.button
                                whileHover={{ 
                                    x: 5,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg font-medium"
                                onClick={() => navigate('/cars')}
                            >
                                Explore Fleet <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scrolling indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <motion.div 
                        className="w-1 h-2 bg-white rounded-full mt-2"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;