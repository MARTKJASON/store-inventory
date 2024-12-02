import { Inertia } from "@inertiajs/inertia";
import React from "react";

const Navbar = () => {
    const navItems = [
        { name: "Products", route: "/", method: "get" },
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
