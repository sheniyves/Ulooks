 import React, { useState, useRef, useEffect } from "react";
import { IconButton, Avatar, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useMutationFn } from "../../../hooks/queryFn";
import { likePost } from "../../api/inspo";
import { useDynamicScreen } from "../../Utils/screenWidth";

const PostCard = ({ item, isActive, onNavigate }) => {
  const dynamicScreen = useDynamicScreen();

  const mediaList = item?.media || [];
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(
    item?.author?.is_following || false,
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayPause, setShowPlayPause] = useState(false);

  // Drag state
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const videoRefs = useRef({});
  const hasMultiple = mediaList.length > 1;
  const showPausePlayIconTimeout = useRef(null);

  const {
    mutate: like,
    isPending,
    isError,
  } = useMutationFn({
    key: ["likePost"],
    fun: likePost,
  });

  if (mediaList.length === 0) return null;

  const currentMedia = mediaList[index];
  const currentIsVideo = currentMedia?.type === "video";

  const hashtags = item?.tags || [];
  const caption = item?.caption || "";

  const minSwipeDistance = 50;

  useEffect(() => {
    // Pause and mute ALL videos in this card first
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.muted = true;
      }
    });

    // Then only play + unmute the current active video (without resetting time)
    const activeVid = videoRefs.current[index];
    if (activeVid && isActive) {
      activeVid.muted = false;
      if (isPlaying) {
        activeVid.play().catch((err) => {
          console.log("Video play failed:", err);
        });
      }
    }
  }, [isActive, index]);

  // Sync play/pause state when isActive changes
  useEffect(() => {
    const activeVid = videoRefs.current[index];
    if (!activeVid) return;
    if (!isActive) {
      activeVid.pause();
      activeVid.muted = true;
    }
  }, [isActive]);

  const handleTogglePlay = () => {
    const activeVid = videoRefs.current[index];
    if (!activeVid) return;

    if (isPlaying) {
      activeVid.pause();
      setIsPlaying(false);
    } else {
      activeVid.muted = false;
      activeVid.play().catch((err) => console.log("Play failed:", err));
      setIsPlaying(true);
    }

    // Show the icon briefly then hide
    setShowPlayPause(true);
    clearTimeout(showPausePlayIconTimeout.current);
    showPausePlayIconTimeout.current = setTimeout(() => {
      setShowPlayPause(false);
    }, 800);
  };

  // ── Drag handlers (mouse + touch) — only used when hasMultiple ──
  const handleDragStart = (clientX) => {
    setDragStartX(clientX);
    setDragOffsetX(0);
    setIsDragging(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || dragStartX === null) return;
    setDragOffsetX(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    if (dragOffsetX < -minSwipeDistance && index < mediaList.length - 1) {
      setIndex(index + 1);
    }
    if (dragOffsetX > minSwipeDistance && index > 0) {
      setIndex(index - 1);
    }
    setDragStartX(null);
    setDragOffsetX(0);
    setIsDragging(false);
  };

  const onMouseDown = (e) => handleDragStart(e.clientX);
  const onMouseMove = (e) => { if (isDragging) handleDragMove(e.clientX); };
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };

  const onTouchStart = (e) => handleDragStart(e.targetTouches[0].clientX);
  const onTouchMove = (e) => handleDragMove(e.targetTouches[0].clientX);
  const onTouchEnd = () => handleDragEnd();
  // ───────────────────────────────────────────────────────────────

  return (
    <>
      <div className="relative  w-full h-screen snap-start snap-always">
        {/* MEDIA */}
        <div
          {...(hasMultiple && {
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseLeave,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
          })}
          className="relative w-full h-full"
          style={{
            cursor: hasMultiple ? (isDragging ? "grabbing" : "grab") : "default",
            userSelect: hasMultiple ? "none" : "auto",
          }}
        >
          {/* Draggable media strip */}
          <div
            style={{
              display: "flex",
              width: `${mediaList.length * 100}%`,
              height: "100%",
              transform: `translateX(calc(-${index * (100 / mediaList.length)}% + ${hasMultiple ? dragOffsetX / mediaList.length : 0}px))`,
              transition: isDragging ? "none" : "transform 0.3s ease",
            }}
          >
            {mediaList.map((media, i) => (
              <div
                key={i}
                style={{
                  width: `${100 / mediaList.length}%`,
                  flexShrink: 0,
                  height: "100%",
                }}
              >
                {media.type === "video" ? (
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[i] = el;
                    }}
                    src={media.url}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    draggable={false}
                  />
                ) : (
                  <img
                    src={media.url}
                    className="w-full h-full object-cover"
                    alt=""
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Bottom gradient shadow for better text visibility */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
        </div>

        {/* PLAY / PAUSE BUTTON — center, only for videos */}
        {currentIsVideo && (
          <button
            onClick={handleTogglePlay}
            className="absolute inset-0 w-full h-full z-20 flex items-center justify-center bg-transparent"
            style={{ cursor: "pointer" }}
          >
            <div
              className={`transition-all duration-300 rounded-full bg-black/40 p-4 ${
                showPlayPause ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              {isPlaying ? (
                <PauseIcon sx={{ fontSize: 48, color: "white" }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 48, color: "white" }} />
              )}
            </div>
          </button>
        )}

        {/* Multiple media indicators with swipe buttons */}
        {mediaList.length > 1 && (
          <>
            {/* Progress bars at top - like Instagram Stories */}
            <div className="absolute top-2 left-0 right-0 flex gap-1 px-2 z-20">
              {mediaList.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      i === index ? "w-full" : i < index ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Dots indicator at bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {mediaList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === index ? "bg-white w-6" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* USER INFO - Bottom Left */}
        <div
          className={`absolute left-3  z-30 max-w-[70%] ${dynamicScreen < 1024 ? " bottom-20" : "bottom-6"}`}
        >
          {/* Profile and Follow Button */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <Avatar
                src={item?.author?.image_url}
                alt={item?.author?.name}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                }}
              />
              {!following && (
                <div className="absolute -bottom-1 -right-1">
                  <IconButton
                    onClick={() => setFollowing(true)}
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: "#6A0DAD",
                      color: "white",
                      padding: 0,
                      "&:hover": {
                        backgroundColor: "#5a0b8f",
                      },
                    }}
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white font-urbanist font-semibold text-sm drop-shadow-lg">
                {item?.author?.name}
              </span>
              {!following && (
                <Button
                  onClick={() => setFollowing(true)}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "2px 12px",
                    minWidth: "auto",
                    border: "1px solid white",
                    borderRadius: "4px",
                    fontFamily: "urbanist",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>

          {/* Caption */}
          {caption && (
            <p className="text-white max-w-[30ch] text-sm mb-2 drop-shadow-lg line-clamp-2 font-urbanist">
              {caption}
            </p>
          )}

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-white text-xs font-semibold drop-shadow-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Music Track */}
          {item?.music_track && (
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 max-w-fit">
              <MusicNoteIcon sx={{ fontSize: 16, color: "white" }} />
              <span className="text-white text-xs font-medium truncate max-w-[200px]">
                {item.music_track.name || "Original Sound"}
              </span>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS - Right Side */}
        <div className="absolute right-3 bottom-[8.5rem]  flex flex-col items-center gap-4 z-30">
          {/* Like Button */}
          <div className="flex flex-col items-center">
            <IconButton
              onClick={() => setLiked(!liked, item?.id)}
              sx={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              {liked ? (
                <FavoriteIcon sx={{ fontSize: 28, color: "#ff4458" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 28 }} />
              )}
            </IconButton>
            <span className="text-white text-xs mt-1 font-semibold drop-shadow-lg">
              {item.likes_count || 0}
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center">
            <IconButton
              sx={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <span className="text-white text-xs mt-1 font-semibold drop-shadow-lg">
              {item.comments_count || 0}
            </span>
          </div>

          {/* Bookmark Button */}
          <div className="flex flex-col items-center">
            <IconButton
              onClick={() => setSaved(!saved)}
              sx={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              {saved ? (
                <BookmarkIcon sx={{ fontSize: 28, color: "#ffd700" }} />
              ) : (
                <BookmarkBorderIcon sx={{ fontSize: 28 }} />
              )}
            </IconButton>
            <span className="text-white text-xs mt-1 font-semibold drop-shadow-lg">
              {item.saves_count || 0}
            </span>
          </div>

          {/* Menu Button */}
          <IconButton
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <MoreVertIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </div>
        {/* NAVIGATION BUTTONS - Desktop */}
      </div>
      {isActive && (
        <div className="hidden md:flex absolute flex-col bottom-8  right-3 z-[400] gap-2">
          <IconButton
            onClick={() => onNavigate("up")}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <IconButton
            onClick={() => onNavigate("down")}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default PostCard;