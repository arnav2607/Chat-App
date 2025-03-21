import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    
    try {
        // Check required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        // Save user and generate token
        await newUser.save();
        generateToken(newUser._id, res);

        // Send response
        res.status(201).json({
            _id: user._id,
        fullName: user.fullName,
        email:user.email,
        profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
   const {email,password}=req.body
   try{
    const user=await User.findOne({email})

    if(!{user}){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const isPswdcorrect =await bcrypt.compare(password,user.password);
    if(!isPswdcorrect){
        return res.status(400).json({message:"Invalid credentials"});
    }

    generateToken(user._id,res);

    res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email:user.email,
        profilePic: user.profilePic,
    });

   }
   catch(error){
    console.log("Error in login controller:", error);
        res.status(500).json({ message: "Internal Server Error" });

   }
};

export const logout = async(req, res) => {
   try {
    res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out succesfully"});
    
    
   } catch (error) {
    console.log("Error in logout controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
   }
};

export const updateProfile =async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user_id;

        if(!profilePic){
            return res.status(400).json({message:"Profile pic required"});
        }

        const uploadResponse=await cloudinary.uploader(profilePic)
        const updateduser=await User.findByIdAndUpdate(
            userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        );
        
        res.status(200).josn({message:"Profile Updated"});

    } catch (error) {
        console.log("Error in update profile ",error);
        res.status(500).json({message:"Internal Server Error "})
        
    }
}
export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkauth controller",error.message);
        res.status(500).json({message:"Internal server error "});
    }
}