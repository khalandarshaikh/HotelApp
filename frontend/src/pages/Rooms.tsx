import { useEffect, useState } from "react";
import { getHotelById } from "../api/hotel.api";
import { useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";

interface Room {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
}

const Rooms = () => {

    const { id } = useParams();

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {

            const data = await getHotelById(id!);

            setRooms(data.rooms);

        };
        fetchRooms();
    }, [id]);

    return (

        <div className="rooms-page">

            <h2>Available Rooms</h2>

            <div className="room-grid">
                {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>

        </div>

    );
};

export default Rooms;