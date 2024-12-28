import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-15-207-100-201.ap-south-1.compute.amazonaws.com:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
