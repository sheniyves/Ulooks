import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";

const MediaSlider = ({
  previewFiles,
  onTagPeople,
  onOpenMusic,
  musicSelectorRef,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [prvFiles, setPrvFiles] = useState( []);
  const [tags, setTags] = useState([]);

  // Reset currentIndex if it's out of bounds
  console.log({ previewFiles });

  const handleRemoveFile = (index) => {
    if (previewFiles.length === 0) return
    // const idx = previewFiles.findIndex(q => )
    // const tt = previewFiles.filter((f) => findIndexOf(f) !== index)
    // setPrvFiles((pv) =>  ...pv.filter(index) => )
  };
  useEffect(() => {
    if (currentIndex >= previewFiles.length && previewFiles.length > 0) {
      setCurrentIndex(previewFiles.length - 1);
    }
  }, [previewFiles.length, currentIndex]);

  const paginate = (newDirection) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < previewFiles.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  if (!previewFiles.length) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">No media selected</p>
      </div>
    );
  }

  // Safety check - if currentIndex is out of bounds, show loading
  if (!previewFiles[currentIndex]) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">Loading media...</p>
      </div>
    );
  }

  const openMusicDialog = () => {
    onOpenMusic?.();
    musicSelectorRef.current?.openDialog();
  };

  return (
    <div className="relative w-full">
      {/* Main Slider Container */}
      <div className="relative h-96 overflow-hidden rounded-xl bg-gray-900">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 1,
              },
              exit: (direction) => ({
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
          >
            {previewFiles[currentIndex].file.type.startsWith("video") ? (
              <video
                src={previewFiles[currentIndex].preview}
                controls
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <img
                src={previewFiles[currentIndex].preview}
                alt={`Preview ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-xl"
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Top Right Action Buttons */}
        <div className="absolute top-4 right-4 z-[10] flex flex-col items-end gap-2">
          {/* Counter */}
          <div className="bg-black/60 shadow-lg text-white px-3 py-1 rounded-full text-sm text-center">
            {currentIndex + 1} / {previewFiles.length}
          </div>

          {/* Add Music Button */}
          <IconButton
            onClick={openMusicDialog}
            className="bg-black/60 hover:bg-black/80 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              borderRadius: "50%",
            }}
            aria-label="Add music"
          >
            <MusicNoteIcon sx={{ color: "white", fontSize: 20 }} />
          </IconButton>

          {/* Tag People Button */}
          <IconButton
            onClick={() => onTagPeople?.()}
            className="bg-black/60 hover:bg-black/80 w-9 h-9 rounded-full flex items-center justify-center"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              padding: "8px",
            }}
            aria-label="Tag people"
          >
            <LocalOfferIcon sx={{ color: "white", fontSize: 20 }} />
          </IconButton>

          <IconButton
            onClick={() => handleRemoveFile(currentIndex)}
            className="bg-black/60 hover:bg-black/80 w-9 h-9 rounded-full flex items-center justify-center"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              padding: "8px",
            }}
            aria-label="Tag people"
          >
            <CloseIcon sx={{ color: "white", fontSize: 20 }} />
          </IconButton>
        </div>

        {/* Selected Music Display */}
        {selectedMusic && (
          <div className="absolute bottom-4 left-4 right-4 z-[10] bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-white font-semibold text-sm">
                  {selectedMusic.title}
                </p>
                <p className="text-gray-300 text-xs">{selectedMusic.artist}</p>
              </div>
            </div>
            <IconButton
              size="small"
              onClick={() => setSelectedMusic(null)}
              sx={{ color: "white" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        )}

        {/* Tags Display */}
        {tags.length > 0 && (
          <div className="absolute bottom-4 left-4 z-[10] flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2"
              >
                <LocalOfferIcon sx={{ color: "white", fontSize: 14 }} />
                <span className="text-white text-sm">{tag}</span>
                <IconButton
                  size="small"
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  sx={{ color: "white", padding: 0 }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {currentIndex < previewFiles.length - 1 && (
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dot Indicators */}
      {previewFiles.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {previewFiles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-gold-purple w-8"
                  : "bg-slate-400 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaSlider;
