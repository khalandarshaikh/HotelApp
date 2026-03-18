import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";


export const createHotelService = async (data: any) => {
    const hotel = await Hotel.create(data);
    return hotel;
};

export const getHotelsService = async () => {
    const hotels = await Hotel.find();
    return hotels;
};

export const getHotelByIdService = async (hotelId: string) => {

    const hotel = await Hotel.findById(hotelId).lean();
    console.log("hotel", hotel);
    if (!hotel) return null;

    const rooms = await Room.find({ hotel: hotel._id }).lean();
    console.log("rooms", rooms);

    return {
        ...hotel,
        rooms
    };

};