import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routrs/user_route.js';
import authRouter from './routrs/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routrs/listingroute.js';
import path from 'path'

dotenv.config();
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI).then(()=>{
    console.log('Connected to MONGODB');
}).catch((err)=>{
    console.log(err);
})

const __dirname = path.resolve();


const app =express()
app.listen(3000,()=>{
    console.log('server is running');
});
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",listingRouter)
//Response present at api/user/test
//Creation of Middleware
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success :false,
        statusCode,
        message,
    });
});

