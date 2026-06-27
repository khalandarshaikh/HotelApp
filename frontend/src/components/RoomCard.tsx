import { Link } from "react-router-dom";

interface Room {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
}

const ROOM_IMAGES = [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=60"
];

const getRoomImage = (roomId: string) => {
    const index = Array.from(roomId).reduce((sum, char) => sum + char.charCodeAt(0), 0) % ROOM_IMAGES.length;
    return ROOM_IMAGES[index];
};

const RoomCard = ({ room }: { room: Room }) => {
    const imageUrl = getRoomImage(room._id);

    return (
        <div className="room-card">
            <img src={imageUrl} alt={`Room ${room.roomNumber}`} />

            <div className="room-card-body">
                <h3>Room {room.roomNumber}</h3>
                <p>Price: ₹{room.price}</p>
                <p>Capacity: {room.capacity}</p>
                <Link to={`/booking/${room._id}`}>
                    <button>Book Now</button>
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;