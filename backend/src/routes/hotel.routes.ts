import express from "express";
import {
    createHotel,
    getHotels,
    getHotelById
} from "../controllers/hotel.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createHotel);
router.get("/", getHotels);
router.get("/:id", getHotelById);

export default router;