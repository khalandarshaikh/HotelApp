import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHotelById } from "../api/hotel.api";

interface Room {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
}

interface Hotel {
    name: string;
    city: string;
    rooms: Room[];
}

const HotelDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [hotel, setHotel] = useState<Hotel | null>(null);

    useEffect(() => {
        const fetchHotel = async () => {
            const data = await getHotelById(id!);
            setHotel(data);
        };

        fetchHotel();
    }, [id]);

    if (!hotel) return <p>Loading...</p>;

    return (
        <div className="hotel-details-container">

            <div className="hotel-header">
                <h1>{hotel.name}</h1>
                <p>{hotel.city}</p>
            </div>

            <h2 className="room-title">Available Rooms</h2>

            <div className="room-grid">

                {hotel.rooms.map((room) => (
                    <div key={room._id} className="room-card">
                        <h3>{room.roomNumber}</h3>
                        <p className="price">₹{room.price} / night</p>
                        <p className="capacity">Capacity: {room.capacity}</p>
                        <button className="book-btn" onClick={() => navigate(`/booking/${room._id}`)}>Book Room</button>
                    </div>

                ))}

            </div>

        </div>

    );
};

export default HotelDetails;