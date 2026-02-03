import React from "react";
import gallery from "../../../assets/Images/gallery-import.svg";
import Error from "../../../Components/WebComponents/Error";

const Upload = ({
  label,
  uploadRef,
  register,
  error,
  optional = true,
  name,
  onUpload,
  placeholder,
  onChange,
  forSp = true,
  accept = "image/*",
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [preview, setPreview] = React.useState(null);

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Process dropped files
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) return;
  if (file.size > 25 * 1024 * 1024) return;

  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  if (uploadRef.current) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    uploadRef.current.files = dataTransfer.files;

    if (onChange) {
      onChange({ target: { files: dataTransfer.files } });
    }
  }
};


  const handleClearFile = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (uploadRef.current) {
      uploadRef.current.value = "";
      const inputEvent = new Event("change", { bubbles: true });
      uploadRef.current.dispatchEvent(inputEvent);
    }
  };

  const background = forSp ? "bg-[#fffaeb]" : "bg-light_Purple"
  const border = forSp ? "border-yellow_gold" : "bg-darkPurple"

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <label className="font-medium text-sm mb-2 block" htmlFor="upload">
          {label}
        </label>
        {optional && (
          <div className="text-[#98A2B3] text-[12px] font-medium mb-2">
            Optional
          </div>
        )}
      </div>

      <div
        onClick={onUpload}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full cursor-pointer flex flex-col items-center justify-center py-6 p-4 border border-dashed rounded-lg gap-2 ${
          error ? "border-red" : border
        } ${isDragging ? "bg-blue-100" : error ? "bg-error" : background}`}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-28 max-w-full object-contain"
            />
            <button
              type="button"
              onClick={handleClearFile}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <img src={gallery} alt="Upload icon" className="mb-2" />
            {isDragging ? (
              <>
                <span className="text-orange_gold text-[12px] font-medium">
                  Drop your file here
                </span>
                <span className="text-yellow_gold font-medium">
                  Max File Size: 25MB
                </span>
              </>
            ) : (
              <>
                    <span className={`${forSp ? "text-orange_gold" : "text-darkPurple"} text-[12px] font-medium underline`}>
                  {placeholder}
                </span>
                <span className={`${forSp ? "text-orange_gold" : "text-darkPurple"} font-medium`}>
                  Max File Size: 25MB
                </span>
              </>
            )}
          </>
        )}

       <input
  ref={uploadRef}
  className="hidden"
  type="file"
  name={name}
  id={name}
  accept={accept}
  onChange={(e) => {
    if (e.target.files?.[0]) {
      validateAndSetFile(e.target.files[0]);
    }
    if (onChange) {
      onChange(e);
    }
  }}
/>

      </div>

      <p className="text-[#98A2B3] text-[12px] font-medium my-2 mb-4">
        Please use a good quality image, bad/low quality images will be rejected
      </p>

      <Error error={error} />
    </div>
  );
};

export default Upload;
