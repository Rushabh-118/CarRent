import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express()
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
connectDB()

app.get('/', (req, res) => res.send('server is running...!'))
app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))