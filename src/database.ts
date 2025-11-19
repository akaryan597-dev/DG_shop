import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../server/.env')});

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error("MONGODB_URI is not defined in .env file");
            process.exit(1);
        }
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
