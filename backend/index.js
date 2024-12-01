// packages
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

// utilities

import connectDB from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// app.get("/",(req,res)=>{
//     res.send("hello from backend index.js");
// });

app.use("/api/users",userRoutes);

app.listen(port,()=>console.log(`Server running on port: ${port}`));