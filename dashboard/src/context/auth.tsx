import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
    user: string | null;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<string | null>(null);

    async function fetchUser() {
        console.log("fetching");
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/me`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setUser(data.user.firstname);
            console.log(data.user.firstname);
        } else {
            // no user
        }
    }

    const refreshUser = async () => {
        await fetchUser();
    };

    // get user
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, refreshUser }}>
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
