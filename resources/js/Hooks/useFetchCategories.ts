import { useState, useEffect } from "react";
import axios from "axios";

interface Categories {
    id: number;
    category_name: string;
    note: string;
    description: string;

    // Add other fields as per your API response
}

const useFetchCategories = () => {
    const [categoriesData, setCategoriesData] = useState<Categories[]>([]);
    const [categoryNames, setCategoryNames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Categories[]>(
                    "http://localhost:8000/api/categories",
                );
                setCategoriesData(response.data);
                const names = response.data.map(
                    (category: Categories) => category.category_name,
                );
                setCategoryNames(names);
            } catch (err) {
                setError("There was an error fetching the products!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categoriesData, categoryNames, loading, error };
};

export default useFetchCategories;
