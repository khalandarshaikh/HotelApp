import type { Request, Response } from "express";
import { createBookingService, getMyBookingsService } from "../services/booking.service.js";

export const createBooking = async (req: any, res: Response) => {
    try {
        const { roomId, checkIn, checkOut } = req.body;

        const booking = await createBookingService(
            req.user.id,
            roomId,
            new Date(checkIn),
            new Date(checkOut)
        );

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyBookings = async (req: Request, res: Response) => {

    try {

        const userId = (req as any).user.id;

        const bookings = await getMyBookingsService(userId);

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};