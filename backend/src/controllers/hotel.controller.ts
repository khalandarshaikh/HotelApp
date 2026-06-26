import type { Request, Response } from "express";
import { redisClient } from "../config/redis.js";
import {
    createHotelService,
    getHotelsService,
    getHotelByIdService
} from "../services/hotel.service.js";

export const createHotel = async (req: Request, res: Response) => {
    try {
        const hotel = await createHotelService(req.body);
        await redisClient.del("hotels");
        res.status(201).json({
            success: true,
            data: hotel
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getHotels = async (req: Request, res: Response) => {
    try {
        const cache = await redisClient.get("hotels");

        if (cache) {
            console.log("Serving from Redis cache");
            const parsed = JSON.parse(cache);
            return res.json(Array.isArray(parsed) ? { success: true, data: parsed } : parsed);
        }

        const hotels = await getHotelsService();
        const payload = {
            success: true,
            data: hotels
        };
        await redisClient.set("hotels", JSON.stringify(payload), {
            EX: 120
        });
        console.log("Serving from MongoDB");
        res.json(payload);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getHotelById = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        if (!id || typeof id !== "string") {
            return res.status(400).json({
                message: "Invalid hotel id"
            });
        }
        const hotel = await getHotelByIdService(id);

        if (!hotel) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }

        res.json(hotel);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};