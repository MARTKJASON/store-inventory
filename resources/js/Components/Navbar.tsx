import React from "react";

const Navbar = () => {
  const navItems = [
    { name: "Products", action: () => alert("Navigating to Products") },
    { name: "Stocks", action: () => alert("Navigating to Stocks") },
    { name: "Category", action: () => alert("Navigating to Category") },
    { name: "Supplier", action: () => alert("Navigating to Supplier") },
    { name: "Customers", action: () => alert("Navigating to Customers") },
    { name: "Graph", action: () => alert("Navigating to Graph") },
    { name: "Settings", action: () => alert("Navigating to Settings") }
  ];

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
                onClick={item.action} // Attach the action function to onClick
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
