// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3200/api",  // Use environment variables for the base URL
    timeout: 10000,  // Set a request timeout
    headers: {
        "Content-Type": "application/json",  // Common headers
    },
});

// You can also add interceptors for handling errors or injecting tokens
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add a token here if needed
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default axiosInstance;
