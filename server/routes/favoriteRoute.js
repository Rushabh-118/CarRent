import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favoriteController.js";
import { protect } from "../middleware/auth.js";

const favoriterouter = express.Router();

favoriterouter.post("/add", protect, addFavorite);
favoriterouter.post("/remove", protect, removeFavorite);
favoriterouter.get("/list", protect, getFavorites);

export default favoriterouter;