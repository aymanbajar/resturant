// imports 
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoute';
import userRoutes from './routes/userRoute';

// initialize express app
const app =  express();

// configure dotenv
dotenv.config();

// define port
const PORT = process.env.PORT || 5000;
// 

// database connection
mongoose.connect(process.env.DATABASE_URL || '').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});
// for reading data from req body
app.use(express.json())
app.use(cors())


// endpoints

app.use('/recipe',recipeRoutes);
app.use('/user',userRoutes);



app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})