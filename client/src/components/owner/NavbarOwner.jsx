import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const NavbarOwner = () => {
    const { user } = useAppContext();

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between px-6 md:px-10 py-4 bg-white border-b border-gray-200 shadow-sm"
        >
            <Link to='/' className="hover:opacity-90 transition-opacity">
                <img 
                    src={assets.logo} 
                    alt="Company Logo" 
                    className="h-8 object-contain hover:scale-105 transition-transform duration-200"
                />
            </Link>

            <div className="flex items-center gap-2">
                <p className="text-gray-700 font-medium text-sm md:text-base">
                    Welcome, <span className="text-blue-600">{user?.name || "Owner"}</span>
                </p>
                {user?.image && (
                    <img 
                        src={user.image} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full ml-2 object-cover border-2 border-white shadow-sm"
                    />
                )}
            </div>
        </motion.div>
    )
}

export default NavbarOwner;