import axios from "axios";

const API = "http://localhost:5000/api/hotels/";

export const createHotel = async (data: any) => {

    const token = localStorage.getItem("token");

    const res = await axios.post(API, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;

};

export const getHotels = async () => {
    const res = await axios.get(API);
    return Array.isArray(res.data)
        ? res.data
        : res.data?.data ?? [];
};

export const getHotelById = async (id: string) => {
    const res = await axios.get(`${API}${id}`);
    return res.data;
};