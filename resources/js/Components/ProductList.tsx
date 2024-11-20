import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch products when the component is mounted
        axios
            .get("http://localhost:8000/api/products") // Laravel API URL
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the products!",
                    error,
                );
            });
    }, []);

    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="text-sm font-medium text-gray-600 border-b">
                    <th className="py-3 px-4 text-left">Product ID</th>
                    <th className="py-3 px-4 text-left">Product Name</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Supplier</th>
                    <th className="py-3 px-4 text-left">Price</th>
                </tr>
            </thead>
            <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="text-sm font-medium text-gray-600 border-b">
                            <td className="py-3 px-4">
                                {product.id}
                            </td>
                            <td className="py-3 px-4">
                             {product.product_name}
                            </td>
                            <td className="py-3 px-4">
                               {product.category_id || "N/A"}
                            </td>
                            <td className="py-3 px-4">
                               {product.supplier_id || "N/A"}
                            </td>
                            <td className="py-3 px-4">
                            ₱   {product.pricing || "N/A"}
                            </td>
                        </tr>
                    ))}

                {/* Repeat for more rows */}
            </tbody>
        </table>
    );
};

export default ProductList;
