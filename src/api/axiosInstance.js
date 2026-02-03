import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://ulooks-api.vercel.app/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Intercept to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("customerToken"); // Pass service provider token for service provider
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
