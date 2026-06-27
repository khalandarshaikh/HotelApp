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

const ROOM_IMAGES = [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=60"
];

const getRoomImageUrl = (roomId: string) => {
    const index = Array.from(roomId).reduce((sum, char) => sum + char.charCodeAt(0), 0) % ROOM_IMAGES.length;
    return ROOM_IMAGES[index];
};

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

    const bannerImage = `https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80`;

    return (
        <div className="hotel-details-container">

            <div className="hotel-header">
                <div className="hotel-banner">
                    <img src={bannerImage} alt={hotel.name} />
                </div>
                <div className="hotel-header-copy">
                    <h1>{hotel.name}</h1>
                    <p>{hotel.city}</p>
                </div>
            </div>

            <h2 className="room-title">Available Rooms</h2>

            <div className="room-grid">

                {hotel.rooms.map((room) => (
                    <div key={room._id} className="room-card">
                        <img src={getRoomImageUrl(room._id)} alt={`Room ${room.roomNumber}`} />
                        <div className="room-card-body">
                            <h3>Room {room.roomNumber}</h3>
                            <p className="price">₹{room.price} / night</p>
                            <p className="capacity">Capacity: {room.capacity}</p>
                            <button className="book-btn" onClick={() => navigate(`/booking/${room._id}`)}>Book Room</button>
                        </div>
                    </div>

                ))}

            </div>

        </div>

    );
};

export default HotelDetails;