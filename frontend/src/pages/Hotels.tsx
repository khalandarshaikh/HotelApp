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
        const data = await getHotels();
        setHotels(data);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                <h2>Available Hotels</h2>
                {isAdmin && (
                    <Link to="/admin">
                        <button style={{ borderRadius: 8, background: "#4f46e5", color: "white", border: "none", padding: "0.5rem 0.8rem" }}>
                            Add More Hotels
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