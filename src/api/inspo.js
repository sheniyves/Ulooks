import axiosInstance from "./axiosInstance";

export const getInspo = async () => {
  const response = await axiosInstance.get("/inspo/recommended");
  return response.data;
};

export const likePost = async (postId) => {
  const response = await axiosInstance.post(`/inspo/${postId}/like`);
  return response.data;
};

export const createInspo = async (postData) => {
  console.log("Creating inspo with data:", postData);

  // Debug: Log all FormData entries
  console.log("FormData contents:");
  for (let [key, value] of postData.entries()) {
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

  try {
    const response = await axiosInstance.post("/inspo/upload", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [(data) => data],
    });
    return response.data;
  } catch (error) {
    console.error("Full error:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    console.error("Response headers:", error.response?.headers);
    throw error;
  }
};

export const musicSearch = async (searchQuery) => {
  if (!searchQuery) return;

  const response = await axiosInstance.get(`/inspo/music/search`, {
    params: {
      query: searchQuery,
      limit: 20,
    },
  });

  return response.data;
};
