export const getStepByStatus = (status) => {
  switch (status) {
    case "wating":
      return 2;
    case "inProgress":
      return 3;
    case "finished":
      return 4;
    default:
      return 1;
  }
};

export const buttonStatus = (options = {}) => {
  return {
    idle: {
      content: options.idleContent || "Withdraw",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
        ...(options.idleStyle || {}),
      },
    },
    loading: {
      content: options.loadingContent || "Processing...",
      style: {
        backgroundColor: "#EAEAEC",
        // color: "#444",
        cursor: "not-allowed",
        ...(options.loadingStyle || {}),
      },
    },
    success: {
      content: options.successContent || "Withdraw Successful",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "default",
        ...(options.successStyle || {}),
      },
    },
    error: {
      content: options.idleContent || "Something should be here",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        // cursor: "default",
        ...(options.errorStyle || {}),
      },
    },
  };
};

export const showToast = ({ message, setToastMessage, toastRef }) => {
  setToastMessage(message);
  toastRef.current?.openToast();
  setTimeout(() => {
    setToastMessage("");
    toastRef.current?.closeToast();
  }, 3000);
};

/* const showToast = (message) => {
    let toast = "";
    toast = message;
    toastRef.current?.openToast();
    setTimeout(() => {
      toast = "";
      toastRef.current?.closeToast();
    }, 3000);
    return toast
  }; */
