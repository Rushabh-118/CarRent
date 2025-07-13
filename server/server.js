import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";

const app = express()
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
connectDB()

app.get('/', (req, res) => res.send('server is running...!'))
app.use('/api/user',userRouter);
app.use('/api/owner',ownerRouter);


app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))