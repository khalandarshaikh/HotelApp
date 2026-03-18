import { useState } from "react";
import { createRoom } from "../api/room.api";

const AdminRoom = () => {

    const [hotelId, setHotelId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        try {

            await createRoom({
                hotelId,
                name,
                price
            });

            alert("Room created successfully");

            setHotelId("");
            setName("");
            setPrice("");

        } catch (err) {

            alert("Room creation failed");

        }

    };

    return (

        <div className="admin-container">

            <h2>Create Room</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Hotel ID"
                    value={hotelId}
                    onChange={(e) => setHotelId(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Room Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button>Create Room</button>

            </form>

        </div>

    );

};

export default AdminRoom;