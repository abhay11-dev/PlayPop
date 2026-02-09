import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
})); // For all middlewares and configurations


app.use(express.json({limit: '10kb'})); // To parse JSON bodies
app.use(express.urlencoded({ extended: true , limit:'10kb'})); // To parse URL-encoded bodies
app.use(express.static('public')); // To serve static files
app.use(cookieParser()); // To parse cookies



//routes
import userRouter from './routes/user.routes.js';


//routes declaration
app.use("/api/v1/users",userRouter);


export {app};