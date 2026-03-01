import React, { useRef, useCallback } from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import { TransactionHistoryRows } from "../../Components/WebComponents/TransactionHistory";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { ButtonBase, Skeleton } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRisingStars } from "../../api/services";
import RisingStarsRows from "../../Components/WebComponents/RisingStarsRows";

const LIMIT = 10;

const RisingStars = () => {
  const navigate = useNavigate();

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["rising_stars"],
    queryFn: ({ pageParam = 0 }) =>
      getRisingStars({ offset: pageParam, limit: LIMIT }),
    getNextPageParam: (lastPage, allPages) => {
      const items = lastPage?.data || [];
      if (items.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
    initialPageParam: 0,
  });

  const posts = data?.pages.flatMap((page) => page?.data || []) || [];

  return (
    <div className="pb-[8rem] mt-6 min-h-screen">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between max-w-full xl:max-w-[75%]">
            <Header onClick={() => navigate(-1)} iconPresence >
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={arrowLeft} alt="arrow left icon" />
                Rising Stars
              </div>
            </Header>
          </div>

          <div className="mt-8">
            <Content useMargin={false}>
              <div className="w-full max-w-full lg:max-w-[31.25rem]">
                <ul className="mt-6 space-y-4">
                  {/* Loading skeletons */}
                  {isPending &&
                    Array.from({ length: LIMIT }).map((_, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between max-w-[500px] mb-4"
                      >
                        {/* Left side - image + text */}
                        <div className="flex items-center gap-4">
                          <Skeleton
                            variant="rounded"
                            width={96}
                            height={96}
                            sx={{ flexShrink: 0, borderRadius: "6px" }}
                          />
                          <div className="text-left">
                            <Skeleton variant="text" width={160} height={20} />
                            <Skeleton
                              variant="text"
                              width={80}
                              height={14}
                              sx={{ mt: "4px" }}
                            />
                            <Skeleton
                              variant="text"
                              width={60}
                              height={16}
                              sx={{ mt: "4px" }}
                            />
                          </div>
                        </div>
                        {/* Right side - star + rating */}
                        <div className="flex items-center gap-2">
                          <Skeleton variant="circular" width={20} height={20} />
                          <Skeleton variant="text" width={24} height={16} />
                        </div>
                      </li>
                    ))}

                  {/* Error state */}
                  {isError && (
                    <li className="text-center py-8 text-red-400 font-urbanist text-sm">
                      Something went wrong. Please try again.
                    </li>
                  )}

                  {/* Data rows */}
                  {!isPending &&
                    !isError &&
                    posts.map((item, idx) => (
                      <RisingStarsRows data={item} key={idx} />
                    ))}

                  {/* Fetching next page skeletons */}
                  {isFetchingNextPage &&
                    Array.from({ length: 3 }).map((_, i) => (
                      <li
                        key={`next-${i}`}
                        className="flex items-center gap-3 mb-4"
                      >
                        <Skeleton variant="circular" width={48} height={48} />
                        <div className="flex-1">
                          <Skeleton variant="text" width="60%" height={16} />
                          <Skeleton variant="text" width="40%" height={14} />
                        </div>
                        <Skeleton variant="text" width={50} height={16} />
                      </li>
                    ))}
                </ul>

                {/* Load More button */}
                {hasNextPage && !isFetchingNextPage && (
                  <div className="mt-12 rounded-lg shadow-sm bg-[#F9F4FC] text-darkPurple font-bold max-w-[40%] mx-auto">
                    <ButtonBase
                      onClick={() => fetchNextPage()}
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: ".2rem",
                        padding: "5px 10px",
                        borderRadius: ".5rem",
                      }}
                    >
                      Load More
                    </ButtonBase>
                  </div>
                )}

                {/* All loaded message */}
                {!hasNextPage && !isPending && posts.length > 0 && (
                  <p className="text-center text-xs text-gray/60 font-urbanist mt-8">
                    You've seen all rising stars
                  </p>
                )}
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default RisingStars;
