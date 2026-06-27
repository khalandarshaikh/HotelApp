import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking.api";

interface Booking {
    _id: string;
    room: {
        roomNumber?: string;
        price?: number;
        hotel?: {
            name?: string;
        };
    };
    checkIn: string;
    checkOut: string;
}

const MyBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const data = await getMyBookings();
        setBookings(data.data || data);
    };

    return (
        <div className="bookings-page">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id} className="booking-card">
                        <p>Hotel: {booking.room?.hotel?.name || "N/A"}</p>
                        <p>Room: {booking.room?.roomNumber || "N/A"}</p>
                        <p>Price: ₹{booking.room?.price || "N/A"}</p>
                        <p>Check In: {new Date(booking.checkIn).toLocaleDateString()}</p>
                        <p>Check Out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyBookings;