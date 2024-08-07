import Navbar from "@/components/nav/Navbar";
import PageTitle from "@/components/properties/PageTitle";
import DirectoryTable, { columns } from "./DirectoryTable";
import { useState, useEffect } from "react";

export default function Directory() {
    const [userList, setUserList] = useState([]);
    const [lastNameFirst, setLastNameFirst] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();
            if (response.ok) {
                setUserList(data.users);
            } else {
                // TODO: Handle error
                console.error(data.message);
            }
        }

        fetchUsers();
    }, []);

    return (
        <>
            <PageTitle title="Directory" />
            <Navbar />
            <DirectoryTable data={userList} columns={columns({ lastNameFirst: lastNameFirst })} />
        </>
    );
}
