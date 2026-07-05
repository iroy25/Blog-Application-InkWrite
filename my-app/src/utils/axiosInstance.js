import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-application-inkwrite.onrender.com",  
  //baseURL:"http://localhost:9095",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;