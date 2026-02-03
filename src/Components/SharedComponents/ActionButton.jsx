import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";

const MotionButton = motion.create(Button);
const ActionButton = memo(
  ({
    children,
    padding = ".75rem 1rem",
    sx = {},
    disabled = false,
    disabledColor = "#EAEAEC",
    ...rest
  }) => {
    const isDisabled = disabled;

    return (
      <MotionButton
        variant="contained"
        disableElevation
        {...rest}
        disabled={isDisabled}
        sx={{
          padding,
          backgroundColor: isDisabled ? disabledColor : "#6A0DAD",
          color: isDisabled ? "#444" : "#fff",
          cursor: isDisabled ? "not-allowed" : "pointer",
          textTransform: "none",
          fontWeight: 500,
          fontSize: ".95rem",
          gap: ".5rem",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: isDisabled ? "#EAEAEC" : "#5a0a99",
          },
          ...sx,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={children?.key || children?.toString()}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="flex gap-2"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </MotionButton>
    );
  }
);

export default ActionButton;
