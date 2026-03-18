import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";

export const createBookingService = async (
    userId: string,
    roomId: string,
    checkIn: Date,
    checkOut: Date
) => {

    const room = await Room.findById(roomId);

    if (!room) {
        throw new Error("Room not found");
    }

    /**
     * Check overlapping bookings
     */
    const existingBooking = await Booking.findOne({
        room: roomId,
        $or: [
            {
                checkIn: { $lte: checkOut },
                checkOut: { $gte: checkIn }
            }
        ]
    });

    if (existingBooking) {
        throw new Error("Room already booked for selected dates");
    }

    const booking = await Booking.create({
        user: userId,
        room: roomId,
        checkIn,
        checkOut
    });

    return booking;
};

export const getMyBookingsService = async (userId: string) => {
    const bookings = await Booking.find({ user: userId })
        .populate({ path: "room", populate: { path: "hotel" } })
        .lean();

    return bookings;
};