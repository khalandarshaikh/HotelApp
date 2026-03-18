import axios from "axios";

const API = "http://localhost:5000/api/rooms/";

export const createRoom = async (data: any) => {

    const token = localStorage.getItem("token");

    const res = await axios.post(API, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;

};

export const getRoomById = async (id: string) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
};