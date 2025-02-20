import { useState } from "react";
import axios from "axios";
import { route } from "../../../vendor/tightenco/ziggy/src/js";

const useBulkUpdateProducts = (initialProducts: any[]) => {
    const [updatedProducts, setUpdatedProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);

    const updateStock = async (cart: { id: number; quantity: number }[]) => {
        setLoading(true);
        try {
            const response = await axios.post("/products/bulk-update", {
                products: cart, // Send products sold
            });

            alert(response.data.message);
        } catch (error) {
            console.error("Stock update failed:", error);
            alert("Failed to update stock.");
        } finally {
            setLoading(false);
        }
    };

    return { updatedProducts, setUpdatedProducts, loading, updateStock };
};

export default useBulkUpdateProducts;
