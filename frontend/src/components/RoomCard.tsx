import { Link } from "react-router-dom";

interface Room {
    _id: string;
    name: string;
    price: number;
}

const RoomCard = ({ room }: { room: Room }) => {

    return (
        <div className="room-card">

            <h3>{room.name}</h3>
            <p>Price: ₹{room.price}</p>

            <Link to={`/booking/${room._id}`}>
                <button>Book Now</button>
            </Link>

        </div>
    );
};

export default RoomCard;