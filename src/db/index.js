import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }   
};

export default connectDB;