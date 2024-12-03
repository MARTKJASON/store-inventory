import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Grid,
    Box,
    Paper,
} from "@mui/material";
import axios from "axios";

// Define types
type Product = {
    id: number;
    product_name: string;
    pricing: number;
};

type CategoryDetailProps = {
    open: boolean;
    onClose: () => void;
    selected: number[];
};

const CategoryDetails: React.FC<CategoryDetailProps> = ({
    open,
    onClose,
    selected,
}) => {
    const [categoryDetail, setCategoryDetail] = useState<{
        category_name: string;
        description: string;
        products: Product[];
    } | null>(null);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            if (selected.length === 1) {
                try {
                    const response = await axios.get(
                        `/category/${selected[0]}/details`,
                    );
                    setCategoryDetail(response.data.category);
                } catch (error) {
                    console.error("Error fetching category details:", error);
                }
            }
        };

        fetchCategoryDetails();
    }, [selected]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle
                sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    textAlign: "center",
                }}
            >
                Category Details
            </DialogTitle>
            <DialogContent sx={{ px: 4, py: 3 }}>
                {categoryDetail ? (
                    <>
                        <Box
                            sx={{ mb: 3, boxShadow: 2, borderRadius: 2, p: 3 ,     marginTop: "20px"}}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: "bold",
                                    color: "primary.main",

                                }}
                            >
                                {categoryDetail.category_name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ mt: 1, color: "text.secondary" }}
                            >
                                {categoryDetail.description}
                            </Typography>
                        </Box>

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Products
                        </Typography>
                        <Box
                            sx={{
                                boxShadow: 1,
                                borderRadius: 2,
                                p: 2,
                                backgroundColor: "grey.100",
                            }}
                        >
                            {categoryDetail.products.length === 0 ? (
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        color: "text.secondary",
                                        py: 4,
                                    }}
                                >
                                    No Products
                                </Typography>
                            ) : (
                                <>
                                    {categoryDetail.products.map((product) => (
                                        <Box key={product.id} sx={{ mb: 2 }}>
                                            <Typography
                                                variant="body1"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {product.product_name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                Price: ${product.pricing}
                                            </Typography>
                                            <hr/>
                                        </Box>
                                    ))}
                                </>
                            )}
                        </Box>
                    </>
                ) : (
                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            py: 4,
                        }}
                    >
                        Loading category details...
                    </Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", py: 2 }}>
                <Button onClick={onClose} variant="contained" color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryDetails;
