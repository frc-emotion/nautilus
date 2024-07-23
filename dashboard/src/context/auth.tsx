import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [token, setTokenState] = useState<string | null>(null);

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            Cookies.set("token", newToken, {
                secure: true,
                sameSite: "strict",
            });
        } else {
            Cookies.remove("token");
        }
    };

    useEffect(() => {
        const cookieToken = Cookies.get("token");
        if (cookieToken) {
            setTokenState(cookieToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
