import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsowner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsowner(data.user.role === "owner");
      } else navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsowner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fetchCars();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);

  // Favorite API helpers
  const addFavorite = async (carId) => {
    try {
      const { data } = await axios.post("/api/favorite/add", { carId });
      if (!data.success) toast.error(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const removeFavorite = async (carId) => {
    try {
      const { data } = await axios.post("/api/favorite/remove", { carId });
      if (!data.success) toast.error(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const getFavorites = async () => {
    try {
      const { data } = await axios.get("/api/favorite/list");
      if (data.success) return data.favorites || [];
      toast.error(data.message);
      return [];
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  };

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsowner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    addFavorite,
    removeFavorite,
    getFavorites,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
