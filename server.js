// importing the required modules or dependecies 
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'; // cors middleware

import transactions from './routes/transactions.js';
import connectDB from './db.js'; // Import the connectDB function

dotenv.config();  // Load environment variables from the .env file

connectDB(); // Call the function to connect to the database

const app = express();

// More restrictive CORS configuration (Recommended for production)
app.use(cors({
    origin: 'http://localhost:5173', // Only allow requests from your client's origin
    credentials: true, // If you need to send cookies or authorization headers
  }));

app.use(express.json()); // This allows us to accept JSON data in the body
// this needs to be in top route url 

// morgan 
app.use(morgan('dev')); // This logs the HTTP requests to the console

app.use('/api/v1/transactions', transactions);
/* whenever we make request to this address it would route to the transactions file 
get method */ 

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));