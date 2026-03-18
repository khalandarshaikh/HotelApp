import mongoose from "mongoose";

export interface IBooking extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;