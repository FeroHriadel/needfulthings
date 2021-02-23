import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

//routes
app.use('/api/categories', categoryRoutes);

//middleware
//middleware will come here

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.inverse))