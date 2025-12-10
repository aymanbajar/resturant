// imports 
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import recipeRoutes from './routes/recipeRoute';
import userRoutes from './routes/userRoute';

// initialize express app
const app =  express();

// configure dotenv
dotenv.config();

// define port
const PORT = process.env.PORT || 5000;

// database connection
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));


// ---------- FIXED CORS ----------
app.use(cors({
    origin: [
        "https://resturant-nu-bice.vercel.app/", // ضع رابط الفرونت هنا
        "http://localhost:5173",
    ],
    credentials: true,
}));

// body parser
app.use(express.json());

// ---------- STATIC FILES BEFORE ROUTES ----------
app.use('/images', express.static('public/images'));

// ROUTES
app.use('/recipe', recipeRoutes);
app.use('/user', userRoutes);

// LISTENER
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
