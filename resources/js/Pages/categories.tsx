import React from "react";

const CategoryPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-blue-500 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-lg font-semibold">John Doe - ADMIN</h1>
          <nav className="flex space-x-6">
            <button className="hover:bg-blue-600 px-4 py-2 rounded transition">
              Products
            </button>
            <button className="hover:bg-blue-600 px-4 py-2 rounded transition">
              Stocks
            </button>
            <button className="bg-white text-blue-500 px-4 py-2 rounded shadow transition">
              Category
            </button>
            <button className="hover:bg-blue-600 px-4 py-2 rounded transition">
              Supplier
            </button>
            <button className="hover:bg-blue-600 px-4 py-2 rounded transition">
              Customer Management
            </button>
            <button className="hover:bg-blue-600 px-4 py-2 rounded transition">
              Graph
            </button>
            <button className="hover:bg-blue-600 px-4 py-2 rounded transition">
              Settings
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col lg:flex-row mt-10 px-6">
        {/* Left Section: Category List */}
        <section className="flex-1 bg-white rounded-lg shadow p-6 mb-6 lg:mb-0 lg:mr-6">
          <h2 className="text-2xl font-semibold mb-4">Category List</h2>
          <ul className="space-y-4">
            <li className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
              <span className="font-medium">Category 1</span>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Delete
              </button>
            </li>
            <li className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
              <span className="font-medium">Category 2</span>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Delete
              </button>
            </li>
            <li className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
              <span className="font-medium">Category 3</span>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Delete
              </button>
            </li>
          </ul>
        </section>

        {/* Right Section: Add Category Form */}
        <section className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                id="categoryName"
                type="text"
                placeholder="Enter category name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="categoryDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="categoryDescription"
                rows={4}
                placeholder="Enter category description"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add Category
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CategoryPage;
