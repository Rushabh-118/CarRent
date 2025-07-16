import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const CarDetails = () => {
  const { id } = useParams();
  const { 
    cars, 
    currency, 
    axios, 
    pickupDate, 
    setPickupDate, 
    returnDate, 
    setReturnDate 
  } = useAppContext();
  
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axios.post('/api/booking/create', {
        car: id,
        pickupDate,
        returnDate
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/my-bookings');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setCar(cars.find(car => car._id === id));
  }, [cars, id]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const featureVariants = {
    hover: { 
      scale: 1.03,
      backgroundColor: "rgba(255,255,255,0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  if (!car) return <Loader />;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16"
    >
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ x: -5 }}
        className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <motion.img 
          src={assets.arrow_icon} 
          alt="Back"
          className="w-5 h-5 opacity-70"
          animate={{ x: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        Back to all cars
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl shadow-xl"
          >
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Title Section */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {car.brand} <span className="text-primary">{car.model}</span>
            </h1>
            <p className="text-lg text-gray-600">
              {car.category} • {car.year} • {car.location}
            </p>
          </motion.div>

          <motion.hr variants={itemVariants} className="border-gray-200 my-6" />

          {/* Specs Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats`, key: 'seats' },
              { icon: assets.fuel_icon, text: car.fuel_type, key: 'fuel' },
              { icon: assets.car_icon, text: car.transmission, key: 'transmission' },
              { icon: assets.location_icon, text: car.location, key: 'location' },
            ].map(({ icon, text, key }) => (
              <motion.div
                key={key}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <img src={icon} alt="" className="h-6 mb-2 opacity-80" />
                <span className="text-sm font-medium text-gray-700">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {car.description || "This premium vehicle offers exceptional comfort and performance. Experience luxury travel with advanced safety features and cutting-edge technology."}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-20">
              {[
                "360° Camera", "Bluetooth", "Navigation System", 
                "Sunroof", "Leather Seats", "Heated Seats",
                "Apple CarPlay", "Android Auto", "Premium Sound System"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  variants={featureVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setActiveFeature(index)}
                  onHoverEnd={() => setActiveFeature(null)}
                  className={`flex items-center p-3 rounded-lg cursor-default ${activeFeature === index ? 'bg-blue-50' : 'bg-white'} border border-gray-100`}
                >
                  <img 
                    src={assets.check_icon} 
                    alt="" 
                    className="h-5 w-5 mr-3" 
                  />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Booking Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-xl mb-20 rounded-2xl p-6 h-fit sticky top-24 space-y-6 border border-gray-100"
        >
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-900">
              {currency}{car.pricePerDay.toLocaleString()}
            </p>
            <span className="text-gray-500 text-sm">per day</span>
          </div>

          <motion.hr className="border-gray-200" />

          {/* Date Pickers */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-2">
              <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700">
                Pickup Date
              </label>
              <input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type="date"
                id="pickup-date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">
                Return Date
              </label>
              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                id="return-date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                min={pickupDate || new Date().toISOString().split("T")[0]}
              />
            </div>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Book Now"
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-500">
            No credit card required • Free cancellation
          </p>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default CarDetails;