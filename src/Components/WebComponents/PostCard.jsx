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
import { useMutationFn } from "../../../hooks/queryFn";
import { likePost } from "../../api/inspo";

const PostCard = ({ item, isActive, onNavigate }) => {
  console.log({ item });

  // Use the media array from the API response
  const mediaList = item?.media || [];
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(
    item?.author?.is_following || false,
  );
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const videoRef = useRef(null);

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

  // Extract hashtags from caption
  const hashtags = item?.tags || [];
  const caption = item?.caption || "";

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle video play/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch((err) => {
          console.log("Video play failed:", err);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video to start
      }
    }
  }, [isActive]);

  // Handle touch events for swiping between media
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && index < mediaList.length - 1) {
      setIndex(index + 1);
    }
    if (isRightSwipe && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <>
      <div className="relative w-full h-[calc(100vh-5rem)] snap-start snap-always">
        {/* MEDIA */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative w-full h-full"
        >
          {currentMedia.type === "video" ? (
            <video
              ref={videoRef}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              loop
              //   muted
              playsInline
            />
          ) : (
            <img
              src={currentMedia.url}
              className="w-full h-full object-cover"
              alt=""
            />
          )}

          {/* Bottom gradient shadow for better text visibility */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
        </div>

        {/* Multiple media indicators with swipe buttons */}
        {mediaList.length > 1 && (
          <>
            {/* Left arrow - Previous */}
            {index > 0 && (
              <button
                onClick={() => setIndex(index - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6 text-white"
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

            {/* Right arrow - Next */}
            {index < mediaList.length - 1 && (
              <button
                onClick={() => setIndex(index + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6 text-white"
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
        <div className="absolute left-3 bottom-6 z-30 max-w-[70%]">
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
              <span className="text-white font-semibold text-sm drop-shadow-lg">
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
            <p className="text-white text-sm mb-2 drop-shadow-lg line-clamp-2">
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
        <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 z-30">
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
      </div>

      {/* NAVIGATION BUTTONS - Desktop */}
      {isActive && (
        <div className="hidden md:flex absolute flex-col bottom-8 -right-16 z-40 gap-2">
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
