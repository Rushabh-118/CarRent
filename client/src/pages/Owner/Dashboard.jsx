import { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Dashboard = () => {
    const { axios, isOwner, currency } = useAppContext();
    const [data, setData] = useState({
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        recentBookings: [],
        monthlyRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    const dashCards = [
        { title: 'Total Cars', value: data.totalCars, icon: assets.carIconColored },
        { title: 'Total Bookings', value: data.totalBookings, icon: assets.listIconColored },
        { title: 'Pending', value: data.pendingBookings, icon: assets.cautionIconColored },
        { title: 'Confirmed', value: data.completedBookings, icon: assets.listIconColored }
    ];

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const { data } = await axios('/api/owner/dashboard');
            if (data.success) {
                setData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOwner) fetchDashboardData();
    }, [isOwner]);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const cardHover = {
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)"
    };

    return (
        <div className='px-4 pt-10 md:px-10 flex-1 min-h-screen bg-gray-50'>
            <Title title="Admin Dashboard" subtitle="Overview of your car rental business" />
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <>
                    {/* Dashboard Cards */}
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className='grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8 max-w-5xl'
                    >
                        {dashCards.map((card, index) => (
                            <motion.div 
                                key={index} 
                                variants={item}
                                whileHover={cardHover}
                                className='flex items-center gap-2 justify-between p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300'
                            >
                                <div>
                                    <h1 className='text-sm font-medium text-gray-500'>{card.title}</h1>
                                    <p className='text-2xl font-bold text-gray-800'>{card.value}</p>
                                </div>
                                <div className='flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full'>
                                    <img src={card.icon} alt={card.title} className='w-6 h-6' />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Recent Bookings and Revenue */}
                    <div className='flex flex-col lg:flex-row items-start gap-6 mb-8 w-full'>
                        {/* Recent Bookings */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm w-full lg:max-w-2xl'
                        >
                            <div className='flex justify-between items-center mb-4'>
                                <div>
                                    <h1 className='text-xl font-semibold text-gray-800'>Recent Bookings</h1>
                                    <p className='text-gray-500 text-sm'>Latest customers bookings</p>
                                </div>
                            </div>
                            
                            <div className='space-y-4'>
                                {data.recentBookings?.length > 0 ? (
                                    <AnimatePresence>
                                        {data.recentBookings.map((booking, index) => (
                                            <motion.div 
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className='p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200'
                                            >
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                                                            <img src={assets.listIconColored} alt="" className='w-5 h-5' />
                                                        </div>
                                                        <div>
                                                            <h2 className='text-sm font-semibold text-gray-800'>{booking.car.brand} | {booking.car.model}</h2>
                                                            <p className='text-xs text-gray-500'>Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <p className='text-sm font-medium text-gray-700'>{currency} {booking.price}</p>
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-rose-400 text-red-800'}`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className='flex flex-col items-center justify-center py-8 text-gray-400'
                                    >
                                        <img src={assets.emptyState} alt="No bookings" className='w-24 h-24 mb-4' />
                                        <p>No recent bookings found</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Monthly Revenue */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm w-full lg:max-w-xs'
                        >
                            <h1 className='text-xl font-semibold text-gray-800 mb-1'>Monthly Revenue</h1>
                            <p className='text-gray-500 text-sm mb-6'>Total revenue of this month</p>
                            
                            <div className='flex items-end gap-2 mb-6'>
                                <p className='text-primary text-4xl font-bold'>{currency} {data.monthlyRevenue}</p>
                                <span className='text-green-500 text-sm font-medium flex items-center'>
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 5.414V6a1 1 0 01-1 1z" clipRule="evenodd" />
                                    </svg>
                                    12% from last month
                                </span>
                            </div>
                            
                            <div className='h-40 bg-gray-100 rounded-lg flex items-end'>
                                {/* Simple bar chart animation */}
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: "70%" }}
                                    transition={{ duration: 1 }}
                                    className='w-8 bg-primary rounded-t-md mx-1'
                                />
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: "50%" }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className='w-8 bg-primary/70 rounded-t-md mx-1'
                                />
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: "80%" }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className='w-8 bg-primary rounded-t-md mx-1'
                                />
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: "60%" }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className='w-8 bg-primary/70 rounded-t-md mx-1'
                                />
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: "90%" }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className='w-8 bg-primary rounded-t-md mx-1'
                                />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;