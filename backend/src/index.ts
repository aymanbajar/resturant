// imports 
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import recipeRoutes from './routes/recipe';

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


// endpoints

app.use('/recipe',recipeRoutes);



app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})