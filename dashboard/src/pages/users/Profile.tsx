import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserNoPassword } from "@/context/auth";

export default function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState<UserNoPassword | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        async function fetchUser(id: string) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (response.ok) {
                setUser(data.user as UserNoPassword);
            } else {
                setErrorMsg(data.message);
            }
        }

        fetchUser(id!);
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h1>Username {user.username}</h1>
                    <p>Email {user.email}</p>
                    <p>Firstname {user.firstname}</p>
                    <p>Lastname {user.lastname}</p>
                    <p>Phone {user.phone}</p>
                    <p>Bio {user.bio}</p>
                    <p>Tagline {user.tagline}</p>
                    <p>Grad Year {user.gradYear}</p>
                </div>
            ) : (
                <p>{errorMsg}</p>
            )}
        </div>
    );
}
