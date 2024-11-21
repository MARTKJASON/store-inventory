import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

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


    useEffect(() => {
        // Fetch products when the component is mounted
        axios
            .get("http://localhost:8000/api/categories") // Laravel API URL
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the categories!",
                    error,
                );
            });
    }, []);


    const getCategoryName = (categoryId: number) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.category_name : "N/A";
      };

      console.log(categories)

      return (
        <div className="overflow-auto max-h-[400px]">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="sticky top-0 bg-gray-100 z-10">
                    <tr className="text-sm font-medium text-gray-600 border-b">
                        <th className="py-3 px-4 text-left">Product ID</th>
                        <th className="py-3 px-4 text-left">Product Name</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-left">Stocks</th>
                        <th className="py-3 px-4 text-left">Price</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id} className="text-sm font-medium text-gray-600">
                            <td className="py-3 px-4">{product.id}</td>
                            <td className="py-3 px-4">{product.product_name}</td>
                            <td className="py-3 px-4 text-blue-500">{getCategoryName(product.category_id)}</td>
                            <td className="py-3 px-4">testing</td>
                            <td className="py-3 px-4">₱ {product.pricing || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
