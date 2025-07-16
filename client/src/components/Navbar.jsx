import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const { setShowLogin, user, logout, isOwner, axios, setIsowner } = useAppContext() 
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

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
        <nav className={`flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 xl:px-32 text-gray-600 border-b border-borderColor relative transition-all
            ${location.pathname === '/' && 'bg-light'}`}>
            
            {/* Mobile menu button (left side) */}
            <div className="flex items-center gap-4">
                <button 
                    className="sm:hidden cursor-pointer focus:outline-none"
                    aria-label='Toggle Menu' 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div className="space-y-2">
                        <span className={`block h-0.5 w-6 bg-gray-600 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block h-0.5 w-6 bg-gray-600 transition-all ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block h-0.5 w-6 bg-gray-600 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </div>
                </button>

                <Link to='/' className="flex-shrink-0">
                    <img src={assets.logo} alt="CarRental Logo" className='h-8'/>
                </Link>
            </div>

            {/* Desktop Navigation Links (center) */}
            <div className="hidden sm:flex items-center gap-8 mx-6">
                {menuLinks.map((link, index) => (
                    <Link 
                        to={link.path} 
                        key={index}
                        className={`hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary font-medium' : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right side buttons */}
            <div className='flex items-center gap-4 sm:gap-6'>
                <button 
                    onClick={() => isOwner ? navigate('/owner') : changeRole()} 
                    className="hidden sm:block text-gray-600 hover:text-primary transition-colors"
                >
                    {isOwner ? 'Dashboard' : 'List cars'}
                </button>
                
                <button 
                    onClick={() => user ? logout() : setShowLogin(true)} 
                    className="px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    {user ? 'Logout' : 'Login'}
                </button>
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
                            ${location.pathname === '/' ? 'bg-light' : 'bg-white'}
                            shadow-lg border-r border-borderColor sm:hidden`}
                    >
                        <div className="flex flex-col space-y-4">
                            {menuLinks.map((link, index) => (
                                <Link 
                                    to={link.path} 
                                    key={index}
                                    className={`px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors
                                        ${location.pathname === link.path ? 'bg-gray-100 text-primary font-medium' : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            <button 
                                onClick={() => {
                                    isOwner ? navigate('/owner') : changeRole();
                                    setMobileMenuOpen(false);
                                }}
                                className="px-4 py-2 text-left rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {isOwner ? 'Dashboard' : 'List cars'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>  
    )
}

export default Navbar