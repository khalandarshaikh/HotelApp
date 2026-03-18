import { useState } from "react";
import { createHotel } from "../api/hotel.api";

const AdminHotel = () => {

    const [name, setName] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        try {

            await createHotel({
                name,
                city
            });

            alert("Hotel created successfully");

            setName("");
            setCity("");

        } catch (err) {

            alert("Failed to create hotel");

        }

    };

    return (

        <div className="admin-container">

            <h2>Create Hotel</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Hotel Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button>Create Hotel</button>

            </form>

        </div>

    );

};

export default AdminHotel;