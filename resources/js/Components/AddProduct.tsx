import React, { useState } from "react";
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

interface AddProductDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: {
    productName: string;
    category: string;
    pricing: number;
  }) => void;
  categories: string[]; // List of category options
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

  const handleSave = () => {
    if (productName && category && pricing) {
      onSave({ productName, category, pricing: Number(pricing) });
      onClose();
      setProductName("");
      setCategory("");
      setPricing("");
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
        <Box sx={{ marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
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
