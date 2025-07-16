import React, { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const { user, axios, fetchUser } = useAppContext();
    const location = useLocation();
    const [image, setImage] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const updateImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            const { data } = await axios.post('/api/owner/update-image', formData);
            if (data.success) {
                fetchUser();
                toast.success(data.message, {
                    style: {
                        background: '#4BB543',
                        color: '#fff',
                    },
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#4BB543',
                    },
                });
                setImage('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative min-h-screen flex flex-col items-center pt-8 w-72 text-sm border-r border-gray-200 bg-white"
        >
            {/* Profile Section */}
            <div className="group relative flex flex-col items-center mb-8 w-full px-4">
                <label 
                    htmlFor="image" 
                    className="cursor-pointer flex flex-col items-center relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="relative rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                        <img 
                            src={image ? URL.createObjectURL(image) : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" 
                        />
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/30 rounded-full flex justify-center items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <input 
                        type="file" 
                        id="image" 
                        accept="image/*" 
                        onChange={(e) => setImage(e.target.files[0])} 
                        className="hidden" 
                    />
                </label>

                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 text-lg font-semibold text-gray-800 text-center"
                >
                    {user?.name}
                </motion.p>
                <p className="text-sm text-gray-500 mt-1">Owner</p>
            </div>

            {/* Save Button */}
            <AnimatePresence>
                {image && (
                    <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={updateImage}
                        className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                        Save
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Navigation Links */}
            <nav className="w-full mt-2 flex-1 flex flex-col gap-1 px-4">
                {ownerMenuLinks.map((link, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                    >
                        <NavLink 
                            to={link.path} 
                            className={({ isActive }) => `
                                relative flex items-center gap-3 w-full py-3 pl-6 pr-4 rounded-xl transition-all duration-200
                                ${isActive 
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium shadow-sm border border-gray-100' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                        >
                            <div className={`p-2 rounded-lg ${location.pathname === link.path ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                <img 
                                    src={link.path === location.pathname ? link.coloredIcon : link.icon} 
                                    alt="icon" 
                                    className="w-5 h-5" 
                                />
                            </div>
                            <span className="text-sm">{link.name}</span>
                            {link.path === location.pathname && (
                                <div className="ml-auto bg-gradient-to-b from-blue-500 to-purple-600 w-1.5 h-6 rounded-l-full"></div>
                            )}
                        </NavLink>
                    </motion.div>
                ))}
            </nav>
        </motion.aside>
    );
};

export default Sidebar;