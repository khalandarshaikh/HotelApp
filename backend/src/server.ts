import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import connectRedis from "./config/redis.js";

import authRoutes from "./routes/auth.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import roomRoutes from "./routes/room.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- DATABASE -------------------- */

// Initialize databases and services before starting the server
const start = async () => {
    try {
        await connectDB();
        await connectRedis();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

start();

/* -------------------- HEALTH CHECK -------------------- */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hotel Booking API running 🚀",
    });
});

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);

/* -------------------- ERROR HANDLER -------------------- */

app.use(errorMiddleware);

/* -------------------- SERVER -------------------- */

// server is started in `start()` after DB and Redis connect