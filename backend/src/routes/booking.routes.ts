import express from "express";
import { createBooking, getMyBookings } from "../controllers/booking.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);

export default router;