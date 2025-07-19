import React, { useState } from 'react'
import { FaCar, FaBars, FaTimes } from 'react-icons/fa'
import { menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const { setShowLogin, user, logout, isOwner, axios, setIsowner } = useAppContext() 
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Add scroll effect for transparent to solid background
    React.useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const changeRole = async () => {
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsowner(true)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
<nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 text-white transition-all duration-300
            ${scrolled ? 'bg-white/20 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
            
            {/* Left side - Logo and mobile menu */}
            <div className="flex items-center gap-4">
                <button 
                    className="sm:hidden cursor-pointer focus:outline-none"
                    aria-label='Toggle Menu' 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <FaTimes className="w-6 h-6 text-gray-800" />
                    ) : (
                        <FaBars className="w-6 h-6 text-gray-800" />
                    )}
                </button>

                <Link to='/' className="flex items-center gap-2">
                    <FaCar className="text-blue-600 text-2xl" />
                    <span className="text-xl font-bold text-gray-800">CarRental</span>
                </Link>
            </div>

            {/* Center - Desktop Navigation Links */}
            <div className="hidden sm:flex items-center gap-6 mx-4">
                {menuLinks.map((link, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            to={link.path} 
                            className={`hover:text-blue-600 text-gray-700 transition-colors ${location.pathname === link.path ? 'text-blue-600 font-medium' : ''}`}
                        >
                            {link.name}
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Right side - User info and buttons */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="hidden md:flex items-center gap-2 mr-2">
                        <p className="text-gray-700 font-medium text-sm">
                            Welcome, <span className="text-blue-600">{user?.name || "Guest"}</span>
                        </p>
                        {user?.image && (
                            <img 
                                src={user.image} 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                            />
                        )}
                    </div>
                )}
                
                <div className="flex items-center gap-3">
                    <motion.button 
                        onClick={() => isOwner ? navigate('/owner') : changeRole()} 
                        className="hidden text-gray-700 sm:block hover:text-blue-600 transition-colors text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isOwner ? 'Dashboard' : 'List cars'}
                    </motion.button>
                    
                    <motion.button 
                        onClick={() => user ? logout() : setShowLogin(true)} 
                        className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {user ? 'Logout' : 'Login'}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-50 p-4 overflow-y-auto
                            bg-white shadow-lg border-r border-gray-200 sm:hidden`}
                    >
                        {user && (
                            <div className="flex items-center gap-3 mb-4 p-2 border-b border-gray-200">
                                {user?.image && (
                                    <img 
                                        src={user.image} 
                                        alt="Profile" 
                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                    />
                                )}
                                <div>
                                    <p className="text-sm text-gray-600">Welcome back</p>
                                    <p className="font-medium text-gray-800">{user?.name || "Guest"}</p>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex flex-col space-y-2">
                            {menuLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link 
                                        to={link.path} 
                                        className={`px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700
                                            ${location.pathname === link.path ? 'bg-gray-100 text-blue-600 font-medium' : ''}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.button 
                                onClick={() => {
                                    isOwner ? navigate('/owner') : changeRole();
                                    setMobileMenuOpen(false);
                                }}
                                className="px-3 py-2.5 text-left rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isOwner ? 'Dashboard' : 'List cars'}
                            </motion.button>
                            
                            <motion.button 
                                onClick={() => {
                                    user ? logout() : setShowLogin(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="px-3 py-2.5 mt-2 text-left rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {user ? 'Logout' : 'Login'}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>  
    )
}

export default Navbar