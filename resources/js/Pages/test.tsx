import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.js";
import TableComponent from "../Components/Table.js";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import useFetchProducts from "../Hooks/useFetchProducts.js";
import AddProductDrawer from "../Components/AddProduct.js";
import EditProductDrawer from "../Components/EditProduct.js";
import useFetchCategories from "../Hooks/useFetchCategories.js";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import productsTableColumn from "../Components/Utils/productsTableColumn.js";

const Test = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setEditIsPopupOpen] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const { products, filteredProducts, setFilteredProducts, loading } =
        useFetchProducts();
    const { categoriesData, categoryNames } = useFetchCategories();

    const handleAddProduct = (product: {
        productName: string;
        categoryId: number | undefined;
        pricing: number | null;
    }) => {
        // Prepare payload for the backend
        const payload = {
            product_name: product.productName,
            category_id: product.categoryId, // Assuming `category` has an `id` field
            pricing: product.pricing,
        };


        // Send the payload to the backend using router.post
        axios
            .post("/products/create", payload)
            .then(() => {
                window.location.reload();
                setSelected([]);
            })
            .catch((error) => {
                console.error(
                    "Error saving product:",
                    error.response?.data || error.message,
                );
            });
    };

    const productColumns = (product: any) => [
        product.id,
        product.product_name,
        getCategoryName(product.category_id),
        product.stocks || "N/A",
        `₱ ${product.pricing || "N/A"}`,
      ];


    const handleEdit = (product: {
        id: number | null;
        productName: string;
        categoryId: number | undefined;
        pricing: number | "";
    }) => {
        const payload = {
            id: product.id,
            product_name: product.productName,
            category_id: product.categoryId,
            pricing: product.pricing,
        };

        axios
            .put(`/products/${product.id}`, payload)
            .then(() => {
                window.location.reload();
                setSelected([]);
            })
            .catch((error) => {
                console.error(
                    "Error saving edit product:",
                    error.response?.data || error.message,
                );
            });
    };

    useEffect(() => {
        const testing = products.find((p) => p.id === selected[0]);

        if (selected.length === 1) {
            const findCat = categoriesData.find(
                (cat: any) => cat.id === testing?.category_id,
            );
        }
    }, [selected]);

    const handleSelectAll = (
        event: React.ChangeEvent<HTMLInputElement>,
        products: any[],
        rowsPerPage: number,
    ) => {
        if (event.target.checked) {
            const newSelected = products
                .slice(0, rowsPerPage)
                .map((product) => product.id);
            setSelected(newSelected);
            setIsAllSelected(true);
        } else {
            setSelected([]);
            setIsAllSelected(false);
        }
    };

    const handleSelect = (id: number, products: any[], rowsPerPage: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter((productId) => productId !== id);
        }

        setSelected(newSelected);
        setIsAllSelected(
            newSelected.length === products.slice(0, rowsPerPage).length,
        );
    };

    const getCategoryName = (categoryId: any) => {
        const category = categoriesData.find(
            (cat: any) => cat.id === categoryId,
        );
        return category ? category.category_name : "N/A";
    };

    useEffect(() => {
        // Filter products based on the search query
        const filtered = products.filter(
            (product) =>
                product.product_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                getCategoryName(product.category_id)
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const deleteSelectedProducts = async (ids: number[]) => {
        try {
            await Inertia.post("/products/bulk-destroy", { ids: selected });

            setSelected([]);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                        marginBottom: "16px",
                    }}
                >
                    {/* Add Product Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ margin: 2 }}
                        onClick={() => {
                            setIsPopupOpen(true);
                            setSelected([]);
                            setIsAllSelected(false); // Reset selected items
                        }}
                    >
                        Add New Product
                    </Button>

                    {/* Popup Trigger */}
                    <AddProductDrawer
                        open={isPopupOpen}
                        onClose={() => setIsPopupOpen(false)}
                        onSave={handleAddProduct}
                        categories={categoryNames}
                    />

                    <EditProductDrawer
                        open={isEditPopupOpen}
                        onClose={() => setEditIsPopupOpen(false)}
                        categories={categoryNames}
                        selected={selected} // Array of selected product IDs
                        products={products} // List of all products
                        onSave={handleEdit}
                    />

                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => setEditIsPopupOpen(true)}
                        disabled={selected.length === 0 || selected.length > 1}
                    >
                        Edit Product
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            deleteSelectedProducts(selected);
                        }}
                        disabled={selected.length === 0}
                    >
                        Delete ({selected.length})
                    </Button>

                    {/* Search Input */}
                    <TextField
                        label="Search Products"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "300px", // Set a fixed width
                            marginLeft: "auto", // Push to the right
                        }}
                    />
                </div>

                <TableComponent
                    selected={selected}
                    setSelected={setSelected}
                    isAllSelected={isAllSelected}
                    handleSelectAll={handleSelectAll}
                    handleSelect={handleSelect}
                    filteredProducts={filteredProducts}
                    isLoading={loading}
                    tableColumns={productsTableColumn}
                    columns={productColumns}
                    rowKey={(product) => product.id}
                    sortFn={(a, b) => b.id - a.id}
                />
            </div>
        </div>
    );
};

export default Test;
