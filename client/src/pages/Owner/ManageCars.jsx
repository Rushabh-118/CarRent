import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ManageCars = () => {
  const { currency, isOwner, axios } = useAppContext();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOwnerCars = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/owner/cars');
      if (data.success) setCars(data.cars);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?');
      if (!confirm) return null;
      const { data } = await axios.post('/api/owner/delete-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, x: -30 }
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full min-h-screen">
      <Title title="Manage Cars" subtitle="View all listed cars, update details or remove them" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-5 text-left font-medium text-gray-600">Car</th>
                  <th className="p-5 text-left font-medium text-gray-600 hidden md:table-cell">Category</th>
                  <th className="p-5 text-left font-medium text-gray-600">Price</th>
                  <th className="p-5 text-left font-medium text-gray-600 hidden md:table-cell">Status</th>
                  <th className="p-5 text-left font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-primary"></div>
                      </div>
                    </td>
                  </tr>
                ) : cars.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No cars found in your inventory
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {cars.map((car) => (
                      <motion.tr
                        key={car._id}
                        variants={itemVariants}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="p-5">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={car.image} 
                              alt={`${car.brand} ${car.model}`} 
                              className="h-14 w-14 rounded-lg object-cover border border-gray-200"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{car.brand} {car.model}</p>
                              <p className="text-sm text-gray-500 mt-1">{car.seating_capacity} seats | {car.transmission}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 text-gray-700 hidden md:table-cell">{car.category}</td>
                        <td className="p-5 font-medium text-gray-900">{currency}{car.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></td>
                        <td className="p-5 hidden md:table-cell">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            car.isAvalible ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                          }`}>
                            {car.isAvalible ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td className="p-5">
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleAvailability(car._id)}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                              title={car.isAvalible ? "Mark unavailable" : "Mark available"}
                            >
                              <img 
                                src={car.isAvalible ? assets.eye_close_icon : assets.eye_icon} 
                                alt="Toggle status" 
                                className="h-10 w-10 opacity-70 hover:opacity-100"
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => deleteCar(car._id)}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                              title="Delete car"
                            >
                              <img 
                                src={assets.delete_icon} 
                                alt="Delete" 
                                className="h-10 w-10 opacity-70 hover:opacity-100"
                              />
                            </motion.button>
                          </div>
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

export default ManageCars;