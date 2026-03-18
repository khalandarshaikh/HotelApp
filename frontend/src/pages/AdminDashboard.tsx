import { useState, useEffect } from "react";
import { createHotel, getHotels } from "../api/hotel.api";
import { createRoom } from "../api/room.api";

interface Hotel {
    _id: string;
    name: string;
}

const AdminDashboard = () => {

    const [hotels, setHotels] = useState<Hotel[]>([]);

    const [hotelName, setHotelName] = useState("");
    const [city, setCity] = useState("");

    const [selectedHotel, setSelectedHotel] = useState("");

    const [roomNumber, setRoomNumber] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {

        const data = await getHotels();

        setHotels(data.data);

    };

    const handleHotelSubmit = async (e: any) => {

        e.preventDefault();

        await createHotel({
            name: hotelName,
            location: city
        });

        alert("Hotel created");

        setHotelName("");
        setCity("");

        fetchHotels();

    };

    const handleRoomSubmit = async (e: any) => {

        e.preventDefault();

        await createRoom({
            hotel: selectedHotel,
            roomNumber: roomNumber,
            price,
            capacity
        });

        alert("Room added");

        setRoomNumber("");
        setPrice("");
        setCapacity("");

    };

    return (
        <div className="admin-container">
            <div className="admin-header-row">
                <div>
                    <h2>Admin Dashboard</h2>
                    <p>All hotels are listed below. Add new hotels and rooms anytime.</p>
                </div>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Add More Hotels</button>
            </div>

            <div className="admin-hotels-list">
                <h3>All Hotels</h3>
                {!hotels || hotels.length === 0 ? (
                    <p>No hotels yet.</p>
                ) : (
                    <ul>
                        {hotels.map((hotel) => (
                            <li key={hotel._id}>{hotel.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            <h2>Create Hotel</h2>
            <form onSubmit={handleHotelSubmit}>
                <input
                    type="text"
                    placeholder="Hotel Name"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button>Create Hotel</button>
            </form>

            <hr />

            <h2>Add Room</h2>
            <form onSubmit={handleRoomSubmit}>
                <select
                    value={selectedHotel}
                    onChange={(e) => setSelectedHotel(e.target.value)}
                >
                    <option value="">Select Hotel</option>
                    {hotels?.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Room Number"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
                <button>Add Room</button>
            </form>
        </div>
    );

};

export default AdminDashboard;