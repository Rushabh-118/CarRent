import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiDroplet, FiNavigation, FiClock, FiStar } from 'react-icons/fi';
import { FaCarAlt, FaGasPump } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import { GiCarDoor } from 'react-icons/gi';

const CarCard = ({ car }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    // Calculate a rating for demonstration (you can replace with actual rating)
    const rating = Math.min(5, (Math.random() * 4 + 1)).toFixed(1);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ 
                y: -8,
                boxShadow: '0 20px 25px -10px rgba(0, 0, 0, 0.15)'
            }}
            onClick={() => {
                navigate(`/car-details/${car._id}`);
                window.scrollTo(0, 0);
            }}
            className="relative border border-gray-100 rounded-2xl overflow-hidden bg-white cursor-pointer transition-all duration-400 hover:border-primary/20 group"
            style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}
        >
            
            {/* Image with badges */}
            <div className="relative h-52 w-full overflow-hidden">
                <motion.img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                />
                
                {/* Availability badge */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                        car.isAvailable ? 'bg-rose-500' : 'bg-green-500'
                    }`}
                >
                    {car.isAvailable ? 'Booked' : 'Available Now'}
                </motion.div>
                
                {/* Price badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-4 right-4 bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 rounded-xl shadow-xl flex flex-col items-center"
                >
                    <span className="font-bold text-lg leading-5">{currency}{car.pricePerDay}</span>
                    <span className="text-xs font-light opacity-90">per day</span>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-5 relative z-0">
                {/* Title and basic info */}
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{car.brand} {car.model}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {car.year}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <span className="font-medium text-gray-600">{car.category}</span>
                    </div>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
                            <FiUsers size={16} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Seats</p>
                            <p className="font-medium text-sm">{car.seating_capacity}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
                            <FaGasPump size={14} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Fuel</p>
                            <p className="font-medium text-sm">{car.fuel_type}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
                            <FaCarAlt size={14} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Gearbox</p>
                            <p className="font-medium text-sm">{car.transmission}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
                            <GiCarDoor size={16} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Doors</p>
                            <p className="font-medium text-sm">{car.doors || 4}</p>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    <div className="flex items-center">
                        <FiNavigation className="text-gray-500 mr-2" size={14} />
                        <span className="text-sm text-gray-700 truncate">{car.location}</span>
                    </div>
                </div>
            </div>

            {/* View Details Button - appears on hover */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 flex items-end justify-center pb-6 pointer-events-none"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto bg-white text-primary px-6 py-2 rounded-full shadow-lg font-medium border border-primary/20 hover:bg-primary hover:text-white transition-colors duration-300"
                >
                    View Details
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default CarCard;