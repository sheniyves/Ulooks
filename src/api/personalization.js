import axios from "axios";
import axiosInstance from "./axiosInstance";

export const personalizeUser = async (formData) => {
  const response = await axiosInstance.post(
    "personalization/user",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}


export const personalizeServiceProvider = async (formData) => {
  const token = localStorage.getItem("serviceProviderToken")
  const response = await axios.post(
    "https://ulooks-api.vercel.app/api/v1/personalization/provider",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    }
  );
  return response.data;
};


