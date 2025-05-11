import axios from 'axios';
import { getToken } from './auth';

// Create an Axios instance with custom configuration
const api = axios.create({
    baseURL: import.meta.env.API_URL || '/api/v1', // Use environment variable with fallback
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle specific error codes here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', error.response.data);

            if (error.response.status === 401) {
                // Unauthorized - could redirect to login
                // window.location.href = '/login'
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Configuration Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
