import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { FiSearch, FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';

const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const { navigate, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext();
    const videoRefs = useRef([]);

    // Your original city list
    const cityList = [
        "Nadiad", "Vadodara", "Ahemedabad", "Bharuch", "Surat"
    ];

    // Fallback images if videos don't load
    const carImages = {
        luxury: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        sports: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
        suv: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const handleVideoHover = (index, isHovering) => {
        const video = videoRefs.current[index];
        if (video) {
            if (isHovering) {
                video.play().catch(e => console.log("Video play failed:", e));
            } else {
                video.pause();
                video.currentTime = 0;
            }
        }
    };

    return (
        <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Background image (not video) */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <img 
                    src={carImages.luxury} 
                    alt="Premium Luxury Car" 
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
            </div>

            {/* Content */}
            <motion.div 
                className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-6"
                    variants={itemVariants}
                >
                    <span className="text-blue-400">Premium</span> Car Rentals
                </motion.h1>
                
                <motion.p 
                    className="text-lg md:text-xl max-w-2xl mb-12"
                    variants={itemVariants}
                >
                    Experience the thrill of driving the world's finest vehicles. From luxury sedans to high-performance sports cars, we offer exclusive rentals for every occasion.
                </motion.p>

                {/* Search Form */}
                <motion.form 
                    onSubmit={handleSearch}
                    className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/10"
                    variants={itemVariants}
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Pickup Location */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMapPin className="text-blue-400" />
                            </div>
                            <select
                                required
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            >
                                <option value="" className="text-gray-400">Pickup Location</option>
                                {cityList.map((city) => (
                                    <option 
                                        value={city} 
                                        key={city}
                                        className="text-gray-800"
                                    >
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Pickup Date */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiCalendar className="text-blue-400" />
                            </div>
                            <input
                                value={pickupDate}
                                onChange={e => setPickupDate(e.target.value)}
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full pl-10 pr-4 py-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent [&::-webkit-calendar-picker-indicator]:invert"
                                required
                            />
                        </div>

                        {/* Return Date */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiClock className="text-blue-400" />
                            </div>
                            <input
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full pl-10 pr-4 py-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent [&::-webkit-calendar-picker-indicator]:invert"
                                required
                            />
                        </div>

                        {/* Search Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            <FiSearch />
                            Find Your Car
                        </motion.button>
                    </div>
                </motion.form>

                {/* Featured Cars with Video on Hover */}
                <motion.div 
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4"
                    variants={itemVariants}
                >
                    {[
                        { image: carImages.luxury, title: "Luxury Sedans", desc: "Executive comfort and style" },
                        { image: carImages.sports, title: "Sports Cars", desc: "Thrilling performance" },
                        { image: carImages.suv, title: "Premium SUVs", desc: "Spacious and powerful" }
                    ].map((car, index) => (
                        <motion.div 
                            key={index}
                            className="relative group overflow-hidden rounded-xl h-64"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            onHoverStart={() => handleVideoHover(index, true)}
                            onHoverEnd={() => handleVideoHover(index, false)}
                        >
                            {/* Video element */}
                            <video
                                ref={el => videoRefs.current[index] = el}
                                muted
                                loop
                                playsInline
                                preload="auto"
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-100 opacity-0"
                            >
                                <source src={car.video} type="video/mp4" />
                            </video>
                            
                            {/* Fallback image */}
                            <img 
                                src={car.image} 
                                alt={car.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 opacity-100"
                                loading="lazy"
                            />
                            
                            {/* Content overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                            <div className="absolute bottom-0 left-0 p-6 z-20 text-left">
                                <h3 className="text-xl font-bold">{car.title}</h3>
                                <p className="text-gray-300">{car.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;