import React, { useState } from "react";
import { styled, TextField } from "@mui/material";
import ActionButton from "../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../assets/Animations/spinner.json";
import { buttonStatus as getButtonStatus } from "../../Utils/updateStatus";

const CustomizedTextField = styled(TextField)({
  "& .label.Mui-focused": {
    color: "#6A0DAD",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#6A0DAD",
    borderBottomWidth: "2px",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#6A0DAD",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#6A0DAD",
    borderBottomWidth: "1px",
  },
});

const PostForm = ({ onSubmit, isLoading }) => {
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ caption });
  };

  // Determine status based on isLoading prop
  const status = isLoading ? "loading" : "idle";

  const config = getButtonStatus({
    idleContent: "Post",
    loadingContent: "Posting...",
    successContent: "Posted!",
    errorContent: "Failed to post",
  });

  const { content, style } = config[status];

  return (
    <form onSubmit={handleSubmit} className="my-6 pb-20">
      <CustomizedTextField
        name="caption"
        label="Add some writeup..."
        variant="standard"
        fullWidth
        multiline
        rows={3}
        placeholder="Share your thoughts..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        sx={{ fontStyle: "urbanist" }}
      />

      <ActionButton
        type="submit"
        disabled={isLoading}
        sx={{
          marginTop: "1rem",
          ...style,
          width: "100%",
          "&:hover": {
            backgroundColor:
              status === "idle" ? "#5a0a99" : style.backgroundColor,
          },
        }}
      >
        {status === "loading" && (
          <Lottie
            size={20}
            className="w-6"
            animationData={spinner}
            loop={true}
          />
        )}{" "}
        {content}
      </ActionButton>
    </form>
  );
};

export default PostForm;