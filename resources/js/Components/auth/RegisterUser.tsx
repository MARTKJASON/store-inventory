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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    storeId: string;
    isAdmin: boolean;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    storeId?: string;
}

interface RegisterFormProps {
    handleLogin: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({handleLogin}) => {
    const theme = useTheme();
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        storeId: "",
        isAdmin: false,
    });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
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
        if (!formData.storeId) newErrors.storeId = "Store ID is required";

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                await axios.post("/auth/register", formData);
                alert("Registration successful!");
                Inertia.visit("/login");
            } catch (error) {
                console.error("Error during registration:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
       <div className="mt-[6rem]">
         <RegisterContainer maxWidth="xl">
            <StyledForm component="form" onSubmit={handleSubmit}>
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
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
                    name="storeId"
                    value={formData.storeId}
                    onChange={handleChange}
                    error={Boolean(errors.storeId)}
                    helperText={errors.storeId}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.isAdmin}
                            onChange={handleChange}
                            name="isAdmin"
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
       </div>
    );
};

export default RegisterForm;
