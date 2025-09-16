import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js"; 
dotenv.config();

import chatrouter from "./routes/chat.js";

const app = express();
// connectDB(); // Temporarily disabled - start MongoDB service to enable

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Monastery360 Backend is running 🚀");
});

// Chatbot API route
app.use("/api/chat", chatrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});