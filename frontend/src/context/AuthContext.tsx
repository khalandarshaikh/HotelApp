import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth.api";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });
    const [user, setUser] = useState<any>(() => {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const savedToken = localStorage.getItem("token");
            if (!savedToken) {
                setLoading(false);
                return;
            }

            try {
                const data = await getCurrentUser(savedToken);
                setUser(data.user);
                setToken(savedToken);
                localStorage.setItem("user", JSON.stringify(data.user));
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = (jwt: string, userData: any) => {
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    if (loading) {
        return <div className="page-shell">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};