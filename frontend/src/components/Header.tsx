import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const { token, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isAdmin = user?.role === "admin";

    return (
        <header className="app-header">
            <div className="app-header-left">
                <Link to="/hotels" className="logo">Hotelzon</Link>
                {token && (
                    <>
                        <Link to="/hotels">Hotels</Link>
                        {isAdmin ? (
                            <Link to="/admin">Admin Dashboard</Link>
                        ) : (
                            <Link to="/my-bookings">My Bookings</Link>
                        )}
                    </>
                )}
            </div>

            <div className="app-header-right">
                {!token ? (
                    <>
                        <Link to="/">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <span className="header-username">Hi, {user?.name || "Guest"}</span>
                        {isAdmin && (
                            <button className="header-cta" onClick={() => navigate("/admin")}>Add New Hotel</button>
                        )}
                        <button className="header-logout" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
