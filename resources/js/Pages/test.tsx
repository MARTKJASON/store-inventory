import React from "react";
import Navbar from "../Components/Navbar.js";
import ProductList from "../Components/ProductList.js";

const Test = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header and Navigation */}

            <Navbar />
            {/* Main Content */}
            <div className="p-6">
                <h2 className="text-3xl font-semibold text-gray-800">
                    Products
                </h2>

                {/* Product Table */}
                <div className="mt-6 bg-white p-5 rounded-lg shadow-lg overflow-hidden">
                    <ProductList />
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-between items-center">
                    <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Prev
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Next
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Last
                        </button>
                    </div>

                    {/* Pagination Info */}
                    <span className="text-sm text-gray-500">Page 1 of 10</span>
                </div>
            </div>
        </div>
    );
};

export default Test;
