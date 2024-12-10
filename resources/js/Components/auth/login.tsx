import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
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

const LoginContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
});

interface FormData {
    email: string;
    password: string;
}

interface Errors {
    email?: string;
    password?: string;
}

interface LoginFormProps {
    handleRegister : () => void
}
const LoginForm: React.FC<LoginFormProps> = ({handleRegister}) => {
    const theme = useTheme();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name as keyof Errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit =  (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
        if (validateForm()) {
            setIsLoading(true);
            try {
                 axios.post("/loginUser", formData);
                 Inertia.visit('/')
            } catch (error) {
                console.error("Error during registration:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <LoginContainer maxWidth="xl">
            <StyledForm component="form" onSubmit={handleSubmit}>
                <LogoContainer>
                    <FaLock size={35} color={theme.palette.primary.main} />
                    <Typography
                        variant="h4"
                        component="h1"
                        ml={1}
                        color="primary"
                    >
                        MyStore Inventory
                    </Typography>
                </LogoContainer>

                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    aria-label="email input"
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
                    aria-label="password input"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                >
                    {isLoading ? <CircularProgress size={24} /> : "Login"}
                </Button>

                <Button
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={handleRegister}
                >
                   Register
                </Button>
            </StyledForm>
        </LoginContainer>
    );
};

export default LoginForm;
