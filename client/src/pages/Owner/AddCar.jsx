import { useState } from "react";
import { motion } from "framer-motion";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onsubmithandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));
      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.success) {
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
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonHover = {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  };

  const buttonTap = {
    scale: 0.98,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-10 md:px-10 flex-1 bg-gray-50 min-h-screen"
    >
      <Title
        title="Add New Car"
        subtitle="Fill in the details to add a new car to your fleet"
        align="left"
      />

      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={onsubmithandler}
        className="flex flex-col gap-6 max-w-3xl mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        {/* Image Upload */}
        <motion.div variants={item} className="flex w-full items-center gap-4">
          <label
            htmlFor="carimage"
            className="relative cursor-pointer group"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Car preview"
              className="h-24 w-32 object-cover rounded-lg border-2 border-dashed border-gray-300 group-hover:border-primary transition-all duration-300"
            />
            {!image && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg">
                <svg
                  className="w-8 h-8 text-gray-400 group-hover:text-primary transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
            )}
            <input
              type="file"
              id="carimage"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
              required
            />
          </label>
          <div>
            <p className="text-sm text-gray-600 mb-1">Upload a high-quality car image</p>
            <p className="text-xs text-gray-400">Recommended size: 800x600px</p>
          </div>
        </motion.div>

        {/* Brand and Model */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Brand</label>
            <input
              type="text"
              placeholder="e.g. Toyota, Honda"
              className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Model</label>
            <input
              type="text"
              placeholder="e.g. Camry, Civic"
              className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              required
            />
          </div>
        </motion.div>

        {/* Year, Price, Category */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Year</label>
            <input
              type="number"
              placeholder="e.g. 2023"
              min="2000"
              max={new Date().getFullYear() + 1}
              className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Price Per Day ({currency})</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{currency}</span>
              <input
                type="number"
                placeholder="e.g. 1000"
                min="1"
                className="pl-8 pr-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                value={car.pricePerDay}
                onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
              required
            >
              <option value="">Select category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </motion.div>

        {/* Transmission, Fuel, Seats */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
              required
            >
              <option value="">Select transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
              required
            >
              <option value="">Select fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Petrol">Petrol</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-medium mb-1">Seating Capacity</label>
            <input
              type="number"
              placeholder="e.g. 5"
              min="1"
              max="12"
              className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={car.seating_capacity}
              onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
              required
            />
          </div>
        </motion.div>

        {/* Location */}
        <motion.div variants={item} className="flex flex-col w-full">
          <label className="text-gray-700 font-medium mb-1">Location</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="px-4 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
            required
          >
            <option value="">Select location</option>
            <option value="Nadiad">Nadiad</option>
            <option value="Vadodara">Vadodara</option>
            <option value="Bharuch">Bharuch</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Surat">Surat</option>
          </select>
        </motion.div>

        {/* Description */}
        <motion.div variants={item} className="flex flex-col w-full">
          <label className="text-gray-700 font-medium mb-1">Description</label>
          <textarea
            rows={5}
            placeholder="Describe the car features, condition, and any special notes..."
            className="px-4 py-3 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            required
          ></textarea>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          variants={item}
          whileHover={buttonHover}
          whileTap={buttonTap}
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 px-6 py-3 mt-2 rounded-lg font-medium w-full md:w-auto ${isLoading ? 'bg-primary/80' : 'bg-primary'} text-white shadow-md transition-all`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding Car...
            </>
          ) : (
            <>
              <img src={assets.tick_icon} alt="" className="w-5 h-5" />
              Add Car to Fleet
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddCar;