import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {currency, axios, user} = useAppContext();

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.get('/api/booking/user')
      if(data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    user && fetchBookings();
  }, [user])

  const bookingCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12 max-w-7xl mx-auto'>
      <div className='mt-20'>
        <Title 
          title="My Bookings" 
          subtitle="Manage your bookings and view details" 
          align="left"
        />

      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-4 h-64 animate-pulse">
              <div className="bg-gray-200 h-32 rounded-md mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <img 
            src={assets.empty_booking} 
            alt="No bookings" 
            className="w-48 h-48 object-contain mb-6 opacity-80"
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No bookings yet</h3>
          <p className="text-gray-500 max-w-md">
            You haven't made any bookings yet. Start exploring our collection and book your perfect ride!
          </p>
        </motion.div>
      ) : (
        <div className="mt-8 space-y-6">
          <AnimatePresence>
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                variants={bookingCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="md:col-span-1">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl overflow-hidden mb-4 shadow-sm"
                  >
                    <img 
                      src={booking.car.image} 
                      alt={booking.car.brand} 
                      className="w-full h-auto object-cover aspect-video transition-transform duration-500 hover:scale-105" 
                    />
                  </motion.div>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {booking.car.year} | {booking.car.category} | {booking.car.location}
                  </p>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      Booking #{index+1}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <img src={assets.calendar_icon_colored} alt="" className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Rental Period</p>
                      <p className="font-medium">
                        {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <img src={assets.location_icon_colored} alt="" className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Pick-up Location</p>
                      <p className="font-medium">{booking.car.location}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1 flex flex-col justify-between">
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Total Amount</p>
                    <motion.h3 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold text-blue-600 mb-1"
                    >
                      {currency}{booking.price}
                    </motion.h3>
                    <p className="text-gray-400 text-xs">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default MyBookings