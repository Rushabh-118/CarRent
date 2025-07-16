import React, { useEffect, useState } from 'react';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ManageBookings = () => {
  const { axios, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/booking/owner');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/booking/change-status', { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { opacity: 0, x: -30 }
  };

  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-600',
    confirmed: 'bg-green-50 text-green-600',
    cancelled: 'bg-red-50 text-red-600'
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full min-h-screen">
      <Title 
        title="Manage Bookings" 
        subtitle="Track all customer bookings, approve or cancel requests" 
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left font-medium text-gray-600">Car</th>
                  <th className="p-4 text-left font-medium text-gray-600 hidden md:table-cell">Date Range</th>
                  <th className="p-4 text-left font-medium text-gray-600">Total</th>
                  <th className="p-4 text-left font-medium text-gray-600 hidden md:table-cell">Payment</th>
                  <th className="p-4 text-left font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {bookings.map((booking) => (
                      <motion.tr
                        key={booking._id}
                        variants={itemVariants}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={booking.car.image} 
                              alt={`${booking.car.brand} ${booking.car.model}`}
                              className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                            />
                            <div className="hidden md:block">
                              <p className="font-medium text-gray-900">{booking.car.brand} {booking.car.model}</p>
                              <p className="text-sm text-gray-500">{booking.car.seating_capacity} seats</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 hidden md:table-cell">
                          <div className="flex flex-col">
                            <span>{new Date(booking.pickupDate).toLocaleDateString()}</span>
                            <span className="text-sm text-gray-500">to</span>
                            <span>{new Date(booking.returnDate).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-gray-900">
                          {currency}{booking.price.toLocaleString()}
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Offline
                          </span>
                        </td>
                        <td className="p-4">
                          {booking.status === "pending" ? (
                            <motion.select
                              whileHover={{ scale: 1.02 }}
                              whileFocus={{ scale: 1.02 }}
                              onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                              value={booking.status}
                              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                              <option value="pending">Pending</option>
                              <option value="cancelled">Cancel</option>
                              <option value="confirmed">Confirm</option>
                            </motion.select>
                          ) : (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageBookings;