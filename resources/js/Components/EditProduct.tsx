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
        productName: string;
        category: string | undefined;
        pricing: number | "";
    }) => void;
    categories: number[]; // List of category options
    selected: number[];
    products: any

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
    const [pricing, setPricing] = useState<number |  "" >("");
    const {categoriesData } = useFetchCategories()

    useEffect(() => {
        if (selected.length === 1) {
          // Find the selected product
          const selectedProduct = products.find((p:any) => p.id === selected[0]);
          if (selectedProduct) {
            const selectedCategory = categoriesData.find((cat:any) => cat.id === selectedProduct.category_id)

            setProductName(selectedProduct.product_name || "");
            setCategory(selectedCategory?.category_name);
            setPricing(selectedProduct.pricing || "");
          }
        }
      }, [selected, products]);



      const handleSave = () => {
        onSave({
          productName,
          category,
          pricing,
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
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
                        setPricing(e.target.value === "" ? "" : Number(e.target.value))
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
