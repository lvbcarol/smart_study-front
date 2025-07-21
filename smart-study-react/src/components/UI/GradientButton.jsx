import React from "react";
import { motion } from "framer-motion";

const GradientButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    {...props}
    className="w-full py-3 font-bold text-white text-md rounded-sm bg-gradient-to-r from-blue-600 to-purple-500"
  >
    {children}
  </motion.button>
);

export default GradientButton;
