import { Link } from "react-router-dom";

interface Hotel {
    _id: string;
    name: string;
    city: string;
    price: number;
}

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
    return (
        <div className="hotel-card">
            <h3>{hotel.name}</h3>
            <p>{hotel.city}</p>
            <p>₹{hotel.price}</p>

            <Link to={`/hotels/${hotel._id}`}>
                <button>View Details</button>
            </Link>
        </div>
    );
};

export default HotelCard;