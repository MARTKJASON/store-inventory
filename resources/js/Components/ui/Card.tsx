import React from "react";
import { Card as MUICard, CardContent as MUICardContent } from "@mui/material";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={`rounded-2xl shadow-md bg-white p-4 ${className}`}>
      <MUICard>{children}</MUICard>
    </motion.div>
  );
};

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MUICardContent>{children}</MUICardContent>;
};

export { Card, CardContent };
