import mongoose from "mongoose";

export interface IHotel extends mongoose.Document {
    name: string;
    city: string;
}

const hotelSchema = new mongoose.Schema<IHotel>(
    {
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);

export default Hotel;