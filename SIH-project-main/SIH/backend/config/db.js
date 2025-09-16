import mongoose from "mongoose";

async function connectDB(){
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mysticsikkim';
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
