import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiNavigation, FiHeart } from 'react-icons/fi';
import { FaGasPump, FaCarAlt } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';

const CarCard = ({ car }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const { user, addFavorite, removeFavorite } = useAppContext();
    const [isFavorite, setIsFavorite] = React.useState(false);

    React.useEffect(() => {
        if (user && user.favorites) {
            setIsFavorite(user.favorites.includes(car._id));
        }
    }, [user, car._id]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
                scale: { type: 'spring', stiffness: 300 }
            }}
            whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }}
            onClick={() => {
                navigate(`/car-details/${car._id}`);
                window.scrollTo(0, 0);
            }}
            className="relative border border-gray-100 rounded-2xl overflow-hidden bg-white cursor-pointer transition-all duration-500 hover:border-blue-500/30 group"
            style={{
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
            }}
        >
            {/* Image with badges */}
            <div className="relative h-72 w-full overflow-hidden">
                <motion.img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                />
                
                {/* Favorite button */}
                <motion.button
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (!isFavorite) {
                            const success = await addFavorite(car._id);
                            if (success) setIsFavorite(true);
                        } else {
                            const success = await removeFavorite(car._id);
                            if (success) setIsFavorite(false);
                        }
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm bg-white/80 shadow-sm"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <FiHeart 
                        className={`text-lg ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                </motion.button>
                
                {/* Availability badge */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                        car.isAvailable ? 'bg-rose-500' : 'bg-green-500'
                    }`}
                >
                    {car.isAvailable ? 'Booked' : 'Available Now'}
                </motion.div>
                
                {/* Price badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl shadow-xl flex flex-col items-center"
                >
                    <span className="font-bold text-lg leading-5">{currency}{car.pricePerDay}</span>
                    <span className="text-xs font-light opacity-90">per day</span>
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Title and basic info */}
                <div className="mb-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                {car.brand} {car.model}
                            </h3>
                            <p className="text-sm text-gray-500">{car.category}</p>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {car.year}
                        </span>
                    </div>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100/80 p-2 rounded-lg text-blue-600">
                            <FiUsers size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Seats</p>
                            <p className="font-medium text-sm">{car.seating_capacity}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100/80 p-2 rounded-lg text-blue-600">
                            <FaGasPump size={16} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Fuel</p>
                            <p className="font-medium text-sm">{car.fuel_type}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100/80 p-2 rounded-lg text-blue-600">
                            <FaCarAlt size={16} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Gearbox</p>
                            <p className="font-medium text-sm">{car.transmission}</p>
                        </div>
                    </div>
                </div>

                {/* Location and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                        <FiNavigation className="mr-2 text-blue-500" />
                        <span className="truncate max-w-[120px]">{car.location}</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        View Details →
                    </motion.button>
                </div>
            </div>

            {/* Hover overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
            />
        </motion.div>
    );
};

export default CarCard;