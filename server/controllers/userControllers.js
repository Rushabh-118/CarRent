import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//generate token
const generateToken = (userId) => {
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET);
}

//register user
export const registerUser = async (req,res) => {
     try {
        const { name, email, password} = req.body;
        console.log("BODY:", req.body);

        if(!name || !email || !password) return res.json({success: false, message: 'fill all the fields'})
        if(password.length < 8) return res.json({success: false, message: 'password must be 8 letters'})

        const userExists = await User.findOne({email})
        if(userExists) return res.json({success: false, message: 'user already exists'})

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password: hashedPassword});

        const token = generateToken(user._id.toString())
        res.json({success: true, token: token});
     } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
     }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id.toString())
    res.json({success: true, token: token});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user data
export const getUserData = async (req, res) => {
  try {
    const {user} = req;
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};