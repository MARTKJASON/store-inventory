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

interface AddCategoryProps {
    open: boolean;
    onClose: () => void;
    onSave: (category: {
        categoryName: string;
        description: string
        note: string | '';
    }) => void;
}

const AddCategoryDrawer: React.FC<AddCategoryProps> = ({
    open,
    onClose,
    onSave,
}) => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState<string | "">("");
    const [note, setNote] = useState<string| "">("")


    const handleSave = () => {
        if (categoryName && description) {
            onSave({ categoryName, description, note});
            onClose();
            setCategoryName("");
            setDescription("");
            setNote("")
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
                <Typography variant="h5" gutterBottom >
                    Add New Category
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)
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

export default AddCategoryDrawer;
