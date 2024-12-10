import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import React from "react";

const Navbar = () => {
    const navItems = [
        { name: "Products", route: "/products", method: "get" },
        { name: "Stocks", route: "/stocks", method: "get" },
        { name: "Categories", route: "/categories", method: "get" },
        { name: "Suppliers", route: "/suppliers", method: "get" },
        { name: "Customers", route: "/customers", method: "get" },
        { name: "Graph", route: "/graph", method: "get" },
        { name: "Settings", route: "/settings", method: "get" },
      ];

      const handleNavigation = (route: string, method:any) => {
        Inertia.visit(route, { method });
      };

      const handleLogout = async () => {
        try {
            await axios.post("/logout");
            // Redirect to the login page
            Inertia.visit("/login");


        } catch (error) {
            console.error("Error during logout:", error);
        }
    };




  return (
    <header className="bg-blue-800 text-white p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">John Doe - ADMIN</h1>
        <nav>
        <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-gray-300"
                onClick={() => handleNavigation(item.route, item.method)}
              >
                {item.name}
              </li>
            ))}
            <button onClick={handleLogout}>Logout</button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
