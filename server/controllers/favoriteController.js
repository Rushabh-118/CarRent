import User from "../Models/User.js";
import Car from "../Models/Car.js";

export const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId } = req.body;
    if (!carId) return res.json({ success: false, message: "Car ID required" });
    await User.findByIdAndUpdate(userId, { $addToSet: { favorites: carId } });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId } = req.body;
    if (!carId) return res.json({ success: false, message: "Car ID required" });
    await User.findByIdAndUpdate(userId, { $pull: { favorites: carId } });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("favorites");
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
