import React from "react";
import Navbar from "../Components/Navbar.js";
import StickyHeadTable from "../Components/ProductTable.js";

const Test = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6">
                    <button className="p-4">Add new Product</button>
                <StickyHeadTable />
            </div>
        </div>
    );
};

export default Test;
