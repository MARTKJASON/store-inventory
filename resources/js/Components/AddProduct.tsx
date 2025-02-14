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

interface AddProductDrawerProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: {
        productName: string;
        categoryId: number | undefined;
        stocks: number ;
        pricing: number;
    }) => void;
    categories: { id: number; name: string }[]; // List of category options
}

const AddProductDrawer: React.FC<AddProductDrawerProps> = ({
    open,
    onClose,
    onSave,
    categories,
}) => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [pricing, setPricing] = useState<number | "">("");
    const [stocks, setStocks] = useState<number | "">("");
    const { categoriesData } = useFetchCategories();
    const [categoryId, setCategoryId] = useState<number | undefined>();

    useEffect(() => {
        const selectedCategory = categoriesData.find(
            (cat: any) => cat.category_name === category,
        );
        setCategoryId(selectedCategory?.id);
        console.log(categories)
    }, [categoryId, category]);

    const handleSave = () => {

        if (productName && categoryId && pricing && stocks) {
            onSave({ productName, categoryId, pricing: Number(pricing) , stocks: Number(stocks)});
            onClose();
            setProductName("");
            setCategory("");
            setPricing("");
            setStocks("");
        } else {
            alert("Please fill in all fields.");
        }
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
                    Add New Product
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                             <MenuItem key={category.id} value={category.name}>
                                {category.name}
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
                <TextField
                    fullWidth
                    margin="normal"
                    label="Stocks"
                    type="number"
                    value={stocks}
                    onChange={(e) =>
                        setStocks(
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

export default AddProductDrawer;
