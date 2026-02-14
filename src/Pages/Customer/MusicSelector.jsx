import React from "react";
import "react-h5-audio-player/lib/styles.css";
import Dialog from "../../Components/SharedComponents/AlertDialog";
import arrowLeft from "../../assets/Images/notArrowLeft.svg";
import Input from "../../Components/WebComponents/Input";
import music from "../../assets/Images/music.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryFn } from "../../../hooks/queryFn";
import { musicSearch } from "../../api/inspo";
import { useDebounce } from "../../Utils/debounce";
import customLoader from "../../assets/Animations/customLoader.json";
import Lottie from "lottie-react";
import MusicSearchResult from "./MusicSearchResult";

const MusicSelector = ({ musicSelectorRef, onSelect }) => {
  const searchSchema = z.object({
    search: z.string().min(1, "Please enter a search query"),
  });
  const {
    watch,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data) => {
    console.log("Search query:", data.search);
    // Here you would typically make an API call to search for music based on the query
    // For demonstration, we'll just reset the form
    reset();
  };
  const searchValue = watch("search") || "";
  const debouncedSearch = useDebounce(searchValue.trim(), 500);
  const {
    data: fetchedMusic,
    isLoading,
    isSuccess,
    isError,
  } = useQueryFn({
    key: ["musicSearch", debouncedSearch],
    fun: () => musicSearch(debouncedSearch),
    onSuccess: (data) => {
      console.log("Music search results:", data);
    },
    onError: (error) => {
      console.error("Error fetching music:", error);
    },
    enabled: debouncedSearch.length > 2,
  });
  console.log({fetchedMusic})
  return (
    <Dialog
      iconPresence={true}
      ref={musicSelectorRef}
      icon={arrowLeft}
      dialogTitle="Add Music"
      useFullWidth={window.innerWidth < 700}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-full min-w-full md:min-w-[500px]"
      >
        <Input
          icon={music}
          {...register("search", { required: true })}
          placeholder="Search for a song"
          error={errors.search?.message}
        />
        <div
          className={` relative text-center ${fetchedMusic?.data?.length > 0 ? "py-6" : "py-20"}  my-6 px-2 text-gray text-sm bg-gray  border border-slate rounded-lg`}
        >
          {isLoading ? (
            <div className="flex flex-col gap-2 items-center justify-center">
              <Lottie
                animationData={customLoader}
                loop={true}
                className="w-24 h-24 mx-auto"
              />
              <p className="-mt-4">Searching...</p>
            </div>
          ) : isError ? (
            "An error occurred while fetching music. Please try again."
          ) : fetchedMusic?.data?.length === 0 ? (
            "No songs found. Try a different search query."
          ) : isSuccess ? (
            <MusicSearchResult
              data={fetchedMusic}
              musicSelectorRef={musicSelectorRef}
              getSelectedMusic={onSelect}
            />
          ) : (
            "Search for a song to see results."
          )}
        </div>
        {/* <div className="absolute w-full bg-white bottom-0">
        <Button type="submit" sx={{ width: "100%" }} className="mt-4">
          Use Song
        </Button>
        </div> */}
      </form>
    </Dialog>
  );
};

export default MusicSelector;
