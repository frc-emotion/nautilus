import { useAuth } from "@/context/auth";

export default function LogoutButton() {
    const { refreshUser } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            } else {
                refreshUser();
            }
        } catch (error) {
            console.error(`Error logging out: ${error}`);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}
