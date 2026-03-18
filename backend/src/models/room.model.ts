import mongoose from "mongoose";

export interface IRoom extends mongoose.Document {
    hotel: mongoose.Types.ObjectId;
    roomNumber: string;
    price: number;
    capacity: number;
}

const roomSchema = new mongoose.Schema<IRoom>(
    {
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
            required: true
        },
        roomNumber: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        capacity: {
            type: Number,
            default: 2
        }
    },
    { timestamps: true }
);

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;