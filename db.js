import mongoose from 'mongoose';
import dotenv from 'dotenv';
  
// Load env variables
dotenv.config({ path: './config/config.env' });

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error('MongoDB connection string is not defined');
}

const connectDB = async () => { 
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas using Mongoose!"); // we could use some different colors for messages 
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`); 
        process.exit(1);
    }
};

export default connectDB; 