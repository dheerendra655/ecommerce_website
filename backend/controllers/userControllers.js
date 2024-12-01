
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";

const createUser = asyncHandler(async(req,res)=>{
    const{userName,email,password}=req.body;
    
    if(!userName || !email || !password){
        throw new Error("please fill all the fields");  
    }

    const userExists = await User.findOne({email});
    if(userExists){res.status(400).send("user already exists")};

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({userName,email,password:hashedPassword});

    try {
       await newUser.save();

       res.status(201).json({_id: newUser._id, userName : newUser.userName, email: newUser.email,password:newUser.password,isAdmin:newUser.isAdmin});
    } catch (error) {
        res.status(400);
        throw new Error("invalid user data");
    }
})

export {createUser};