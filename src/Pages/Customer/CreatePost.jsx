import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import Content from "../../Components/SharedComponents/Content";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Button from "../../Components/WebComponents/Button";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import DownloadApp from "../../Components/WebComponents/DownloadApp";
import PostHeader from "./PostHeader";
import MediaSlider from "./MediaSlider";
import PostForm from "./PostForm";
import MusicSelector from "./MusicSelector";
import TagPeopleDialog from "./TagPeople";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { useMutationFn } from "../../../hooks/queryFn";
import ClearIcon from "@mui/icons-material/Clear";
import { createInspo } from "../../api/inspo";
import UploadInspo from "../../Components/WebComponents/UploadInspo";

const CreatePost = () => {
  const location = useLocation();
  const audioRef = useRef(null);
  const uploadRef = useRef(null);
  const musicSelectorRef = useRef(null);
  const files = location.state?.files || [];
  const [musicLoading, setMusicLoading] = useState(false);

  const [previewFiles, setPreviewFiles] = useState([]);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [taggedPeople, setTaggedPeople] = useState([]);

  const downloadOnAppRef = useRef(null);
  const uploadRefDialog = useRef(null);

  useEffect(() => {
    if (!files.length) return;

    const mapped = files.map((file) => ({
      id: files.length,
      file,
      preview: URL.createObjectURL(file),
    }));

    // Replace only once when coming from navigation
    setPreviewFiles(mapped);

    return () => {
      mapped.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [files]); // Keep files as dependency

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      previewFiles.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, []);

  const {
    mutate: createPost,
    isLoading,
    isError,
  } = useMutationFn({
    key: ["createPost"],
    fun: (data) => createInspo(data),
    onSuccess: (data) => {
      console.log("Post created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
    },
  });

  const handlePostSubmit = (data) => {
    console.log("Form data received:", data);
    console.log("Selected music:", selectedMusic?.external_id);
    console.log("Tagged people:", taggedPeople);

    const formData = new FormData();

    const hasImages = previewFiles.some((pf) =>
      pf.file.type.startsWith("image/"),
    );
    const hasVideo = previewFiles.some((pf) =>
      pf.file.type.startsWith("video/"),
    );

    if (hasImages) {
      previewFiles
        .filter((pf) => pf.file.type.startsWith("image/"))
        .forEach((pf) => {
          formData.append("images", pf.file);
        });
    }

    if (hasVideo) {
      const videoFile = previewFiles.find((pf) =>
        pf.file.type.startsWith("video/"),
      );
      if (videoFile) {
        formData.append("video", videoFile.file);
      }
    }

    if (data?.caption && data.caption.trim()) {
      formData.append("caption", data.caption.trim());
      console.log("Caption added:", data.caption);
    }

    if (data?.tags?.length > 0) {
      formData.append("tags", data.tags.join(", "));
    }

    if (selectedMusic?.external_id) {
      formData.append("music_track_id", selectedMusic.external_id);
    }

    if (taggedPeople?.length > 0) {
      const mentionIds = taggedPeople.map((person) => person.id).join(", ");
      formData.append("mentions", mentionIds);
    }

    const mediaType = hasVideo ? "video" : "image";
    formData.append("media_type", mediaType);

    console.log("=== Final FormData contents ===");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, {
          name: value.name,
          size: value.size,
          type: value.type,
        });
      } else {
        console.log(`${key}:`, value);
      }
    }
    createPost(formData);
  };

  const handleFilesSelected = (newFiles) => {
    if (!newFiles || !newFiles.length) return;

    const mapped = Array.from(newFiles).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Append to existing files
    setPreviewFiles((prev) => [...prev, ...mapped]);
  };

  const handleAddMore = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*,video/*";

    input.onchange = (e) => {
      handleFilesSelected(e.target.files);
    };

    input.click();
  };

  const handleMusicSelect = (song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setSelectedMusic(song);

    if (!song) return;

    const audio = new Audio(song.file_url);
    audioRef.current = audio;

    setMusicLoading(true);

    const handleCanPlay = () => {
      audio.play().catch((err) => {
        console.error("Failed to play audio:", err);
      });
      setMusicLoading(false);
    };

    const handleError = () => {
      console.error("Audio failed to load");
      setMusicLoading(false);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    audio.addEventListener("ended", () => {
      audioRef.current = null;
    });
  };

  const handleTagsConfirm = (users) => {
    setTaggedPeople(users);
    console.log("Tagged people:", users);
  };

  return (
    <div className="mt-0 lg:mt-6 min-h-screen relative">
      <ConatinerWidth>
        <DownloadApp downloadOnAppRef={downloadOnAppRef} />

        <div className="ml-0 lg:ml-[310px] mt-0 lg:mt-[5.7rem] bg-[#E7CBFB] sticky top-0 z-10"></div>

        <Sidebar />
        <Navbar />

        <PageTransition>
          <Content useMargin={false}>
            <div className="w-full mx-auto max-w-full md:max-w-[31.25rem] mt-4 px-4 md:px-0">
              <UploadInspo
                uploadRef={uploadRef}
                uploadRefDialog={uploadRefDialog}
              />
              <PostHeader
                onAddMore={handleAddMore}
                uploadRefDialog={uploadRefDialog}
              />
              <MediaSlider
                previewFiles={previewFiles}
                musicSelectorRef={musicSelectorRef}
                onTagPeople={() => setTagDialogOpen(true)}
                onOpenMusic={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current = null;
                  }

                  setSelectedMusic(null);
                  setMusicLoading(false);

                  musicSelectorRef.current?.openDialog();
                }}
              />
              {selectedMusic && (
                <div className="bg-purple/20 p-2 mt-4 rounded-xl border boreder-purple flex items-center justify-between">
                  <div className="flex items-center gap-2 ">
                    <Avatar src={selectedMusic.cover_image_url} />
                    <div className="flex items-start flex-col">
                      <p className="text-slate-700  text-left">
                        {selectedMusic.title}
                      </p>
                      <small className="font-semibold text-slate-500 text-left">
                        {selectedMusic.artist}
                      </small>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {musicLoading ? (
                      <CircularProgress size={18} sx={{ color: "#6A0DAD" }} />
                    ) : (
                      <IconButton
                        sx={{ color: "#6A0DAD" }}
                        onClick={() => {
                          setSelectedMusic(null);
                          setMusicLoading(false);

                          if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current = null;
                          }
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              )}
              <PostForm onSubmit={handlePostSubmit} isLoading={isLoading} />
            </div>
          </Content>
        </PageTransition>
      </ConatinerWidth>

      <MusicSelector
        musicSelectorRef={musicSelectorRef}
        onSelect={handleMusicSelect}
      />

      <TagPeopleDialog
        open={tagDialogOpen}
        onClose={() => setTagDialogOpen(false)}
        onTagsConfirm={handleTagsConfirm}
      />
    </div>
  );
};

export default CreatePost;
