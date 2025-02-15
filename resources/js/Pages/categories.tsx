import React, { useEffect, useState } from "react";

import axios from "axios";
import Navbar from "../Components/Navbar";

import useFetchCategories from "../Hooks/useFetchCategories";
import categoriesTableColumn from "../Components/Utils/categoriesTableColumn";
import TableComponent from "../Components/Table";
import { Button, TextField } from "@mui/material";
import AddCategoryDrawer from "../Components/AddCategory";
import EditCategoryDrawer from "../Components/EditCategory";
import { Inertia } from "@inertiajs/inertia";
import CategoryDetails from "../Components/categoryDetails";


interface Category {
    id: number;
    name: string;
    description: string;
    notes: string;
}

const Dashboard = () => {
    const [selected, setSelected] = useState<number[]>([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const { categoriesData, loading, fetchCategoryDetails } =
        useFetchCategories();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [categoryDetail, setCategoryDetail] = useState<any>(null);
    const [isDetail, setIsDetail] = useState<boolean>(false);

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

    const categoryColumns = (category: any) => [
        category.category_name,
        category.description || "N/A",
        category.notes || "N/A",
    ];

    console.log(selected[0]);
    const handleAddCategory = (category: {
        categoryName: string;
        description: string;
        note: string | null | undefined;
    }) => {
        const payload = {
            category_name: category.categoryName,
            description: category.description,
            notes:
                category.note && category.note.trim() !== ""
                    ? category.note
                    : "None",
        };

        axios
            .post("/category/create", payload)
            .then(() => {
                window.location.reload();
                setSelected([]);
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    alert("Category Name already Taken");
                } else {
                    console.error(
                        "Error saving category:",
                        error.response?.data || error.message,
                    );
                }
            });
    };

    const handleEditCategory = (category: {
        id: number | null;
        categoryName: string;
        description: string;
        note: string;
    }) => {
        const payload = {
            id: category.id,
            category_name: category.categoryName,
            description: category.description,
            notes:
                category.note && category.note.trim() !== ""
                    ? category.note
                    : "None",
        };

        axios
            .put(`/category/${category.id}`, payload)
            .then(() => {
                window.location.reload();
                setSelected([]);
            })
            .catch((error) => {
                console.error(
                    "Error Saving Edited Category:",
                    error.response?.data || error.message,
                );
            });
    };

    const deleteSelectedCategory = async (ids: number[]) => {
        try {
            await Inertia.post("/categories/bulk-delete", { ids: selected });

            setSelected([]);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const selectedCategoryDetail = async (id: number[]) => {
        try {
            const response = await axios.get(`/category/${id}/details`);
            console.log(response.data); // Handle the JSON data here
            setCategoryDetail(response.data);
            return categoryDetail // You can use this data in your component
        } catch (error) {
            console.error(error);
        }
    };

    console.log(categoryDetail)

    return (
        <>
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
                        Add New Category
                    </Button>

                    <AddCategoryDrawer
                        open={isPopupOpen}
                        onClose={() => setIsPopupOpen(false)}
                        onSave={handleAddCategory}
                    />

                    <EditCategoryDrawer
                        open={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        onSave={handleEditCategory}
                        selected={selected}
                        categories={categoriesData}
                    />

                    <Button
                        variant="contained"
                        color="info"
                        disabled={selected.length === 0 || selected.length > 1}
                        onClick={() => {
                            setIsEditOpen(true);
                            setIsAllSelected(false);
                        }}
                    >
                        Edit Category
                    </Button>
                    <CategoryDetails
                        open={isDetail}
                        onClose={() => setIsDetail(false)}
                        selected={selected}
                    />
                    <Button
                        variant="contained"
                        color="info"
                        disabled={selected.length === 0 || selected.length > 1}
                        onClick={() => {
                            setIsDetail(true);
                        }}
                    >
                        Details
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        disabled={selected.length === 0}
                        onClick={() => {
                            deleteSelectedCategory(selected);
                        }}
                    >
                        Delete Category({selected.length})
                    </Button>

                    <TextField
                        label="Search Categories"
                        variant="outlined"
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
                    filteredProducts={categoriesData}
                    isLoading={loading}
                    tableColumns={categoriesTableColumn}
                    columns={categoryColumns}
                    rowKey={(category:any) => category.id}
                    sortFn={(a: any, b: any) => b.id - a.id}
                />
            </div>
        </>
    );
};

export default Dashboard;
