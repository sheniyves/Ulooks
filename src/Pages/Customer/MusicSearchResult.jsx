import { Avatar, Divider, IconButton, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import React, { useState, useRef, useEffect } from "react";

const MusicSearchResult = ({ data, musicSelectorRef, getSelectedMusic }) => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const audioRef = useRef(null);

  // Stop audio when component unmounts or data changes
  useEffect(() => {
    return () => stopAudio();
  }, [data]);

  // Stop current audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlayingIndex(null);
    setLoadingIndex(null);
  };

  const handleSelect = (item) => {
    getSelectedMusic(item);
  };

  const handlePreview = (item, index) => {
    if (playingIndex === index || loadingIndex === index) {
      stopAudio();
      return;
    }

    stopAudio();

    setLoadingIndex(index); 

    const audio = new Audio(item.file_url);
    audioRef.current = audio;

    // Play audio once ready
    const onCanPlay = () => {
      audio.play();
      setPlayingIndex(index);
      setLoadingIndex(null);
      audio.removeEventListener("canplaythrough", onCanPlay);
    };
    audio.addEventListener("canplaythrough", onCanPlay);

    // Handle errors
    const onError = () => {
      alert("Failed to load audio.");
      stopAudio();
      audio.removeEventListener("error", onError);
    };
    audio.addEventListener("error", onError);

    // Cleanup when audio ends
    const onEnded = () => {
      setPlayingIndex(null);
    };
    audio.addEventListener("ended", onEnded);
  };

  return (
    <ul className="flex flex-col gap-2">
      {data?.data?.map((item, index) => (
        <React.Fragment key={item.id || index}>
          <li
            onClick={() => handleSelect(item)}
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-purple/10 transition-colors duration-200 rounded-md"
          >
            <div
              className="flex items-center gap-2 w-full"
              onClick={() => musicSelectorRef.current?.closeDialog(item)}
            >
              <Avatar src={item.cover_image_url} />
              <div className="flex items-start flex-col">
                <p className="text-slate-700 -mb-1 text-left">{item.title}</p>
                <small className="font-semibold text-slate-500 text-left">
                  {item.artist}
                </small>
              </div>
            </div>
            <IconButton
              disabled={loadingIndex === index}
              onClick={(e) => {
                e.stopPropagation();
                handlePreview(item, index);
              }}
              sx={{
                color: "#6A0DAD",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(106, 13, 173, 0.12)",
                  transform: "scale(1.08)",
                },
              }}
            >
              {loadingIndex === index ? (
                <CircularProgress size={14} sx={{ color: "#6A0DAD" }} />
              ) : playingIndex === index ? (
                <StopIcon />
              ) : (
                <PlayArrowIcon />
              )}
            </IconButton>
          </li>
          {data?.data?.length - 1 !== index && <Divider variant="fullWidth" />}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default MusicSearchResult;
