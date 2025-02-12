import { useState, useEffect } from "react";
import axios from "axios";

interface User {
    id: number;
    first_name: string;
    last_name: number;
    email: number;
    is_admin: number;
    store_id: string;
    balance: number;
    // Add other fields as per your API response
}

const useFetchCurrentUsers = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get<User>(
                    "http://127.0.0.1:8000/auth",
                    {
                        withCredentials: true, // Ensures cookies are sent with the request
                    },
                );
                setUser(response.data);
            } catch (err) {
                setError("There was an error fetching the products!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    console.log(user);

    return { user, loading, error };
};

export default useFetchCurrentUsers;
