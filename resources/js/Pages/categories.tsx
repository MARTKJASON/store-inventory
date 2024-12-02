import React, { useEffect, useState } from "react";

import axios from "axios";
import Navbar from "../Components/Navbar";

import useFetchCategories from "../Hooks/useFetchCategories";
import categoriesTableColumn from "../Components/Utils/categoriesTableColumn";
import TableComponent from "../Components/Table";
import { Button, TextField } from "@mui/material";

interface Category {
    id: number;
    name: string;
    description: string;
    notes: string;
}

const Dashboard = () => {
    const [selected, setSelected] = useState<number[]>([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const { categoriesData, loading } = useFetchCategories();

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
                    >
                        Add New Category
                    </Button>

                    <Button
                        variant="contained"
                        color="info"
                        disabled={selected.length === 0 || selected.length > 1}
                    >
                        Edit Category
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        disabled={selected.length === 0}
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
                    rowKey={(category) => category.id}
                    sortFn={(a: any, b: any) => b.id - a.id}
                />
            </div>
        </>
    );
};

export default Dashboard;
