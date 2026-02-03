// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { DB_NAME } from "./constants.js";

// dotenv.config();

// const app = express();

// const startServer = async () => {
//     try {
//         const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;

//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB");

//         const server = app.listen(process.env.PORT || 8000, () => {
//             console.log(`🚀 Server running on port ${process.env.PORT || 8000}`);
//         });

//         server.on("error", (err) => {
//             console.error(" Server failed to start:", err);
//             process.exit(1);
//         });

//     } catch (err) {
//         console.error("MongoDB connection failed:", err);
//         process.exit(1); 
//     }
// };

// startServer();




import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/db/index.js";

connectDB();