import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookRoom } from "../api/booking.api";

const Booking = () => {
    const { roomId } = useParams();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!roomId) {
            alert("Room is missing.");
            return;
        }

        if (!checkIn || !checkOut) {
            alert("Please select check-in and check-out dates.");
            return;
        }

        try {
            setLoading(true);
            await bookRoom({
                roomId,
                checkIn,
                checkOut
            });
            alert("Booking Successful");
            navigate("/my-bookings");
        } catch (err: any) {
            alert(err.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-page">
            <h2>Book Room</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                />
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                />
                <button disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
            </form>
        </div>
    );
};

export default Booking;
