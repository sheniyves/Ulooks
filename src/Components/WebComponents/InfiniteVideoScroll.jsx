import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInspo } from "../../api/inspo";
import PostCard from "./PostCard";
import { CircularProgress } from "@mui/material";
import noContent from "../../assets/Images/video.png";
import backgroundIcon from "../../assets/Images/formIcons.svg";
import customLoader from "../../assets/Animations/customLoader.json";
import Lottie from "lottie-react";

const LIMIT = 6;

const InfiniteVideoScroll = ({ uploadRefDialog }) => {
  const loadMoreRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["inspo"],
      queryFn: ({ pageParam = 0 }) =>
        getInspo({ offset: pageParam, limit: LIMIT }),
      getNextPageParam: (lastPage) => {
        const items = lastPage?.data?.items || [];
        const currentOffset = lastPage?.data?.offset || 0;
        return items.length < LIMIT ? undefined : currentOffset + LIMIT;
      },
      initialPageParam: 0,
    });

  const posts = data?.pages.flatMap((page) => page?.data?.items || []) || [];

  // Handle navigation
  const handleNavigate = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const viewportHeight = container.clientHeight;
    const newIndex = direction === "up" ? activeIndex - 1 : activeIndex + 1;

    if (newIndex >= 0 && newIndex < posts.length) {
      container.scrollTo({
        top: newIndex * viewportHeight,
        behavior: "smooth",
      });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNavigate("down");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handleNavigate("up");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, posts.length]);

  // Detect which post is currently in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const newIndex = Math.round(scrollPosition / viewportHeight);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div className="text-center   bg-black/90 fixed w-full z-[3000] inset-0 -bottom-10 flex items-center flex-col justify-center h-full min-h-screen">
        <Lottie
          animationData={customLoader}
          loop={true}
          className="w-24 h-24 mx-auto"
        />
      </div>
    );

  if (posts.length === 0)
    return (
      <div
        className="text-center w-full max-w-[500px]      min-h-screen flex items-center justify-center flex-col gap-4  "
        style={{
          backgroundImage: `url(${backgroundIcon})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[7rem] h-[7rem] shadow-sm p-6 flex-shrink-0 rounded-full bg-purple/20 ">
          <img src={noContent} alt="No inspo available" />
        </div>
        <p className="font-urbanist text-lg">No posts found.</p>
      </div>
    );
  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {posts.map((item, idx) => (
        <PostCard
          key={item.id}
          item={item}
          isActive={idx === activeIndex}
          onNavigate={handleNavigate}
        />
      ))}

      <div
        ref={loadMoreRef}
        className="h-[calc(100vh-4rem)] snap-start flex items-center justify-center"
      />

      {isFetchingNextPage && (
        <div className="h-[calc(100vh-4rem)] snap-start flex items-center justify-center ">
          <div
            className="text-center  bg-purple/20 flex items-center flex-col justify-center h-full min-h-screen"
            style={{
              backgroundImage: `url(${backgroundIcon})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <Lottie
              animationData={customLoader}
              loop={true}
              className="w-24 h-24 mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteVideoScroll;
