import axios from 'axios';

// Determine if mock data mode should be used
// Defaults to true in dev if backend is not available or if VITE_USE_MOCK is true or unset
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('studybuddy_token') || 'mock_jwt_token_studybuddy_monika';
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Ignore if localStorage unavailable
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred';
    return Promise.reject(new Error(message));
  }
);

