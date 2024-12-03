import React, { useEffect, useState } from "react";
import {
    Drawer,
    Box,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import useFetchCategories from "../Hooks/useFetchCategories";

interface EditCategoryProps {
    open: boolean;
    onClose: () => void;
    onSave: (category: {
        id:number | null
        categoryName: string;
        description: string
        note: string | '';
    }) => void;
    selected: number[];
    categories: any[];
}

const EditCategoryDrawer: React.FC<EditCategoryProps> = ({
    open,
    onClose,
    onSave,
    selected,
    categories
}) => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState<string | "">("");
    const [note, setNote] = useState<string| "">("")
    const [categoryId , setCategoryId] = useState<number | null>(null)


    useEffect(() => {
        if(selected.length === 1){
            const selectedCategory = categories.find((c: any) => c.id === selected[0])

            setCategoryId(selectedCategory.id)
            setCategoryName(selectedCategory.category_name)
            setDescription(selectedCategory.description)
            setNote(selectedCategory.notes)

        }

    },[selected])

    const handleSave = () => {
            onSave({ id:categoryId ,categoryName, description, note});
            onClose();
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
                    Edit Category
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={open}
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

export default EditCategoryDrawer;
