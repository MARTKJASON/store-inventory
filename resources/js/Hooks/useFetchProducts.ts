import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    id: number;
    product_name: string;
    category_id: number;
    stocks: number;
    pricing: number;
    // Add other fields as per your API response
}

const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Product[]>(
                    "http://localhost:8000/api/products",
                );
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products
            } catch (err) {
                setError("There was an error fetching the products!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, filteredProducts, setFilteredProducts, loading, error };
};

export default useFetchProducts;
