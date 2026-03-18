import axios from "axios";

const API = "http://localhost:5000/api/bookings/";

export const bookRoom = async (data: any) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(API, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const getMyBookings = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}my`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};