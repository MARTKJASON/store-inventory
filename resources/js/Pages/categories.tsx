import React, { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TablePagination,
    Typography,
} from "@mui/material";
import axios from "axios";

interface Category {
    id: number;
    name: string;
    description: string;
    notes: string;
}



const categories: Category[] = [
    {
        id: 1,
        name: "Electronics",
        description: "Devices and gadgets.",
        notes: "Popular for gifts.",
    },
    {
        id: 2,
        name: "Clothing",
        description: "Apparel for all genders.",
        notes: "Includes seasonal discounts.",
    },
    {
        id: 3,
        name: "Groceries",
        description: "Everyday essentials.",
        notes: "Fresh produce available.",
    },
    {
        id: 4,
        name: "Toys",
        description: "Fun and educational toys for kids.",
        notes: "Great for birthdays.",
    },
    {
        id: 5,
        name: "Furniture",
        description: "Home and office furniture.",
        notes: "Durable and stylish.",
    },
    {
        id: 6,
        name: "Books",
        description: "A wide range of books for all ages.",
        notes: "Ideal for reading enthusiasts.",
    },
    {
        id: 7,
        name: "Beauty",
        description: "Beauty products and skincare.",
        notes: "Enhance your natural beauty.",
    },
    {
        id: 8,
        name: "Sports",
        description: "Sports equipment and apparel.",
        notes: "For all fitness levels.",
    },
    {
        id: 9,
        name: "Automotive",
        description: "Car parts and accessories.",
        notes: "Improve your vehicle's performance.",
    },
    {
        id: 10,
        name: "Jewelry",
        description: "Precious jewelry for all occasions.",
        notes: "Gift your loved ones something special.",
    },
    {
        id: 11,
        name: "Kitchen",
        description: "Kitchen appliances and tools.",
        notes: "Make cooking easier and fun.",
    },
    {
        id: 12,
        name: "Health",
        description: "Health products and supplements.",
        notes: "Boost your well-being.",
    },
    {
        id: 13,
        name: "Office Supplies",
        description: "Essentials for the modern office.",
        notes: "Work smarter.",
    },
    {
        id: 14,
        name: "Home Decor",
        description: "Decorations for your home.",
        notes: "Create a cozy atmosphere.",
    },
    {
        id: 15,
        name: "Gardening",
        description: "Gardening tools and supplies.",
        notes: "Perfect for plant lovers.",
    },
    {
        id: 16,
        name: "Pets",
        description: "Everything for your pets.",
        notes: "Spoil your furry friends.",
    },
    {
        id: 17,
        name: "Music",
        description: "Musical instruments and accessories.",
        notes: "For music lovers and artists.",
    },
    {
        id: 18,
        name: "Camping",
        description: "Camping gear and outdoor equipment.",
        notes: "Adventure awaits.",
    },
    {
        id: 19,
        name: "Food & Beverage",
        description: "Gourmet food and beverages.",
        notes: "Delicious and nutritious.",
    },
    {
        id: 20,
        name: "Baby",
        description: "Products for babies and toddlers.",
        notes: "Safe and gentle.",
    },
    {
        id: 21,
        name: "Travel",
        description: "Travel accessories and gear.",
        notes: "For your next adventure.",
    },
    {
        id: 22,
        name: "Art",
        description: "Art supplies and materials.",
        notes: "Express your creativity.",
    },
    {
        id: 23,
        name: "DIY",
        description: "Do it yourself kits and materials.",
        notes: "Create something amazing.",
    },
    {
        id: 24,
        name: "Musical Instruments",
        description: "Instruments for musicians.",
        notes: "From beginner to pro.",
    },
    {
        id: 25,
        name: "Shoes",
        description: "Footwear for all occasions.",
        notes: "Comfortable and stylish.",
    },
    {
        id: 26,
        name: "Outdoor",
        description: "Outdoor furniture and decor.",
        notes: "Perfect for your garden.",
    },
    {
        id: 27,
        name: "Photography",
        description: "Cameras and photography equipment.",
        notes: "Capture memories beautifully.",
    },
    {
        id: 28,
        name: "Party Supplies",
        description: "Everything you need for a party.",
        notes: "Make your event unforgettable.",
    },
    {
        id: 29,
        name: "Office Furniture",
        description: "Furniture for your office space.",
        notes: "Create a productive workspace.",
    },
    {
        id: 30,
        name: "Technology",
        description: "Innovative tech products.",
        notes: "Stay ahead of the curve.",
    },
];

const Dashboard = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [categories, setCategories] = useState<any>([])

    useEffect(() => {
        // Fetch products when the component is mounted
        axios
            .get("http://localhost:8000/api/categories") // Laravel API URL
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the categories!",
                    error,
                );
            });
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Categories with CRUD Functionalities
            </Typography>
            <div className="p-6">
                <TableContainer sx={{ maxHeight: 490 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        color: "#1e40af",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Category Name
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: "#1e40af",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: "#1e40af",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Notes
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: "#1e40af",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage,
                                )
                                .map((category:any) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={category.id}
                                    >
                                        <TableCell>{category.category_name}</TableCell>
                                        <TableCell>
                                            {category.description}
                                        </TableCell>
                                        <TableCell>{category.notes}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{ marginRight: 1 }}
                                            >
                                                Add
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                sx={{ marginRight: 1 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                size="small"
                                                sx={{ marginRight: 1 }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                size="small"
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Dashboard;
