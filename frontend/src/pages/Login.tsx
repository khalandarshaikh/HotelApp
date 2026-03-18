import { useState, useContext } from "react";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const data = await loginUser({ email, password });
            login(data.data.token, data.data.user);

            if (data.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/hotels");
            }
        } catch (err) {
            alert("Login failed");
        }
    };

    return (

        <div className="auth-container">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;