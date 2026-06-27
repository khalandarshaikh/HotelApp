import { Link } from "react-router-dom";

interface Hotel {
    _id: string;
    name: string;
    city: string
}

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
    const imageUrl = `https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=400&q=60`;

    return (
        <div className="hotel-card">
            <div className="card-image-wrapper">
                <img src={imageUrl} alt={hotel.name} className="card-image" />
            </div>

            <div className="hotel-card-body">
                <h3>{hotel.name}</h3>
                <p>{hotel.city}</p>

                <Link to={`/hotels/${hotel._id}`}>
                    <button>View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default HotelCard;