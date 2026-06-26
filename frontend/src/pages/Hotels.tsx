import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotels } from "../api/hotel.api";
import HotelCard from "../components/HotelCard";
import { AuthContext } from "../context/AuthContext";

interface Hotel {
    _id: string;
    name: string;
    city: string;
    price: number;
}

const Hotels = () => {
    const { user } = useContext(AuthContext);
    const isAdmin = user?.role === "admin";
    const [hotels, setHotels] = useState<Hotel[]>([]);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        const hotelsData = await getHotels();
        setHotels(hotelsData);
    };

    return (
        <div className="hotels-page">
            <div className="hotels-header">
                <h2 className="title">Available Hotels</h2>

                {isAdmin && (
                    <Link to="/admin">
                        <button className="add-btn">
                            + Add Hotel
                        </button>
                    </Link>
                )}
            </div>

            <div className="hotel-grid">
                {hotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                ))}
            </div>
        </div>
    );
};

export default Hotels;