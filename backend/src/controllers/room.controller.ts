import type { Request, Response } from "express";
import { createRoomService, getRoomsByHotelService } from "../services/room.service.js";

export const createRoom = async (req: Request, res: Response) => {

    try {

        const room = await createRoomService(req.body);

        res.status(201).json(room);

    } catch (error) {

        res.status(500).json({ message: "Room creation failed" });

    }

};

export const getRoomsByHotel = async (req: Request, res: Response) => {

    try {

        const { hotelId } = req.params;

        if (!hotelId || typeof hotelId !== "string") {
            return res.status(400).json({ message: "Invalid hotelId" });
        }
        const rooms = await getRoomsByHotelService(hotelId);

        res.json(rooms);

    } catch (error) {

        res.status(500).json({ message: "Failed to fetch rooms" });

    }

};