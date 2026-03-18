import { useEffect, useState } from "react";
import { getHotelById } from "../api/hotel.api";
import { useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";

interface Room {
    _id: string;
    name: string;
    price: number;
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

        <div>

            <h2>Available Rooms</h2>

            {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
            ))}

        </div>

    );
};

export default Rooms;