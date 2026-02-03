import axios from "axios";
import axiosInstance from "./axiosInstance";

  const token = localStorage.getItem("serviceProviderToken");
export const getServiceCategories = async () => {
  const response = await axiosInstance.get("services/categories");
  return response.data;
};

export const getTopService = async (date) => {
  const response = await axiosInstance.get("services/top-week", {
    params: { date },
  });
  return response.data;
};


export const getServiceCatalog = async () => {
  if (!token) {
    console.log("Token not available")
    return
  };
  const response = await axios.get(
    "https://ulooks-api.vercel.app/api/v1/services/catalog",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

export const createService = async (formData) => {

  const response = await axios.post(
    "https://ulooks-api.vercel.app/api/v1/services",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
