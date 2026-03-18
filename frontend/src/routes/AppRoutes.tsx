import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Hotels from "../pages/Hotels";
import HotelDetails from "../pages/HotelDetails";
import Rooms from "../pages/Rooms";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import AdminHotel from "../pages/AdminHotel";
import AdminRoom from "../pages/AdminRoom";
import AdminDashboard from "../pages/AdminDashboard";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotels/:id" element={<HotelDetails />} />
                <Route path="/rooms/:id" element={<Rooms />} />
                <Route path="/booking/:roomId" element={<Booking />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/admin/hotel" element={<AdminHotel />} />
                <Route path="/admin/room" element={<AdminRoom />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;