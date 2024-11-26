import React, { useEffect, useState } from "react";
import {
    Drawer,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Typography,
} from "@mui/material";
import useFetchCategories from "../Hooks/useFetchCategories";

interface EditProductDrawerProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: {
        id: number | null;
        productName: string;
        categoryId: number | undefined;
        pricing: number | "";
    }) => void;
    categories: number[]; // List of category options
    selected: number[];
    products: any;
}

const EditProductDrawer: React.FC<EditProductDrawerProps> = ({
    open,
    onClose,
    onSave,
    categories,
    selected,
    products,
}) => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState<string | undefined>("");
    const [pricing, setPricing] = useState<number | "">("");
    const [categoryId, setCategoryId] = useState<number | undefined>();
    const { categoriesData } = useFetchCategories();
    const [productId, setProductId] = useState<number | null>(null);

    useEffect(() => {
        if (selected.length === 1) {
            // Find the selected product
            const selectedProduct = products.find(
                (p: any) => p.id === selected[0],
            );

            if (selectedProduct) {
                // Find the corresponding category
                const selectedCategory = categoriesData.find(
                    (cat: any) =>
                        cat.id === selectedProduct.category_id,
                );

                setProductId(selectedProduct.id);
                setProductName(selectedProduct.product_name || "");
                setPricing(selectedProduct.pricing || "");
                setCategory(selectedCategory?.category_name)
                setCategoryId(selectedCategory?.id);
            }
        }
    }, [selected, ]);

    const handleGetNewCategory = (e: any) => {
        const selectedCategoryName = e.target.value;
        const selectedCategory = categoriesData.find(
            (cat: any) => cat.category_name === selectedCategoryName,
        );
        setCategory(selectedCategoryName); // Update the selected category name
        setCategoryId(selectedCategory?.id)
    };

    const handleSave = () => {
        onSave({
            id: productId,
            productName,
            categoryId,
            pricing: Number(pricing),
        });
        onClose(); // Close the drawer after saving
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: 400, // Set the width of the drawer
                    height: "100%", // Full height
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: 3,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Edit Product
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    disabled={selected.length > 1}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={handleGetNewCategory}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Pricing"
                    type="number"
                    value={pricing}
                    onChange={(e) =>
                        setPricing(
                            e.target.value === "" ? "" : Number(e.target.value),
                        )
                    }
                />
                <Box
                    sx={{
                        marginTop: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default EditProductDrawer;
