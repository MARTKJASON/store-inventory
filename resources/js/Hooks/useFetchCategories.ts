import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Categories {
    id: number;
    category_name: string;
    note: string;
    description: string;
}

interface CategoryDetails {
    category: {
        id: number;
        category_name: string;
        description: string;
        note: string;
        products: Product[];
    };
}

const useFetchCategories = () => {
    const [categoriesData, setCategoriesData] = useState<Categories[]>([]);
    const [categoryNames, setCategoryNames] = useState<
        { id: number; name: string }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // For storing selected category details
    const [categoryDetails, setCategoryDetails] =
        useState<CategoryDetails | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Categories[]>(
                    "http://localhost:8000/api/categories/",
                );
                setCategoriesData(response.data);

                const namesWithIds = response.data.map((category) => ({
                    id: category.id,
                    name: category.category_name,
                }));
                setCategoryNames(namesWithIds);
            } catch (err) {
                setError("There was an error fetching the categories!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Fetch category details when a category is selected
    const fetchCategoryDetails = async (categoryId: number) => {
        setLoading(true);
        try {
            const response = await axios.get<CategoryDetails>(
                `http://localhost:8000/api/category/${categoryId}/details`,
            );
            setCategoryDetails(response.data);
        } catch (err) {
            setError("There was an error fetching the category details!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        categoriesData,
        categoryNames,
        categoryDetails,
        loading,
        error,
        fetchCategoryDetails, // Provide the function to fetch category details
    };
};

export default useFetchCategories;
