import Room from "../models/room.model.js";

export const createRoomService = async (data: any) => {

    const room = await Room.create(data);

    return room;

};

export const getRoomsByHotelService = async (hotelId: string) => {

    return await Room.find({ hotelId });

};