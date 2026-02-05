import { forwardRef, useImperativeHandle, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import successAnim from "../assets/Animations/success3.json";
import errorAnim from "../assets/Animations/error.json";
import pendingAnim from "../assets/Animations/pending2.json";
import { createPortal } from "react-dom";

const Toast = forwardRef(({ children, status }, ref) => {
  const [showToast, setShowToast] = useState(false);

  useImperativeHandle(ref, () => ({
    openToast: () => setShowToast(true),
    closeToast: () => setShowToast(false),
  }));

  const animation =
    status === "success"
      ? successAnim
      : status === "error"
      ? errorAnim
      : status === "pending"
      ? pendingAnim
      : null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full flex items-center justify-center z-[2000] pointer-events-none">
      <motion.div
        className="bg-white rounded-md shadow-lg border border-slate-200 p-3 text-black/85 w-fit flex font-bold font-manr items-center gap-2 pointer-events-auto"
        initial={{ y: "-100%" }}
        animate={{ y: showToast ? 20 : "-100%" }}
        // transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        {showToast && animation && (
          <Lottie
            animationData={animation}
            loop={status === "pending"}
            className="w-8 h-8"
          />
        )}
        {showToast && children}
      </motion.div>
    </div>,
    document.body
  );
});

export default Toast;
