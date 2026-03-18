import express from "express";
import { createRoom, getRoomsByHotel } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/", createRoom);

router.get("/:hotelId", getRoomsByHotel);

export default router;