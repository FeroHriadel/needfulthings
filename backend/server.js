import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import morgan from 'morgan'; //console.logs server requests

dotenv.config();

connectDB();

const app = express();


//middleware
app.use(express.json());
app.use(morgan('dev')); //morgan has to be placed before routes



//paypal - get PAYPAL_CLIENT_ID from .env
app.get('/api/config/paypal', (req, res) => res.json({clientId: process.env.PAYPAL_CLIENT_ID}))
//google maps - get GOOGLEMAPS_KEY from .env
app.get('/api/config/googlemaps', (req, res) => res.json({googlemapsKey: process.env.GOOGLEMAPS_KEY}))



//api routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.inverse))