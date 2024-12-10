import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";

const StyledForm = styled(Box)<{ component?: React.ElementType }>(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(3),
        padding: theme.spacing(4),
        backgroundColor: "#ffffff",
        borderRadius: theme.spacing(2),
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%",
    }),
);

const LogoContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
});

const RegisterContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
});

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    store_id: string;
    is_admin: boolean;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    store_id?: string;
}



const RegisterForm: React.FC= () => {
    const theme = useTheme();
    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        store_id: "",
        is_admin: false,
    });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        if (!formData.first_name) newErrors.firstName = "First name is required";
        if (!formData.last_name) newErrors.lastName = "Last name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }
        if (!formData.store_id) newErrors.store_id = "Store ID is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (errors[name as keyof Errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleLogin = () => {
        Inertia.visit('login')
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);


        if (validateForm()) {
            setIsLoading(true);
            try {
             await axios.post("/register", formData);

                    alert("Registration successful!");

            } catch (error:any) {
                console.error("Error during registration:", error);
                if (error.response && error.response.status === 422) {
                    alert("Validation failed. Please check your input.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };


    return (
        <RegisterContainer maxWidth="xl" >
            <StyledForm component="form" onSubmit={handleSubmit} className="mt-6">
                <LogoContainer>
                    <FaUserPlus size={35} color={theme.palette.primary.main} />
                    <Typography
                        variant="h4"
                        component="h1"
                        ml={1}
                        color="primary"
                    >
                        Register
                    </Typography>
                </LogoContainer>

                <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                />
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    label="Store ID"
                    name="store_id"
                    value={formData.store_id}
                    onChange={handleChange}
                    error={Boolean(errors.store_id)}
                    helperText={errors.store_id}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.is_admin}
                            onChange={handleChange}
                            name="is_admin"
                        />
                    }
                    label="Is Admin"
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : "Register"}
                </Button>

                <Button
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={handleLogin}
                >
                   Already have an account
                </Button>
            </StyledForm>
        </RegisterContainer>
    );
};

export default RegisterForm;
