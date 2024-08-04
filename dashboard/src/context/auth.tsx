import React, { createContext, useState, useContext, useEffect } from "react";

export type UserNoPassword = {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    bio: string | null;
    tagline: string | null;
    gradYear: number | null;
};

interface AuthContextType {
    user: UserNoPassword | null;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserNoPassword | null>(null);

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
            setUser(data.user as UserNoPassword);
            console.log(data.user);
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
