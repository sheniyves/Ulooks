// useToast.js
import { useRef, useState, useCallback } from "react";

export const useToast = () => {
  const toastRef = useRef(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = useCallback((message, duration = 3000) => {
    setToastMessage(message);
    toastRef.current?.openToast();

    setTimeout(() => {
      setToastMessage("");
      toastRef.current?.closeToast();
    }, duration);
  }, []);

  return { toastMessage, toastRef, showToast };
};
