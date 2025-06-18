import axios, { AxiosInstance } from 'axios';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.STRAPI_API_URL;
const token = Constants.expoConfig?.extra?.STRAPI_API_TOKEN;

const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token and log debug info
apiClient.interceptors.request.use(
  (config) => {
    // Debug: log the full URL and token
    const fullUrl = config.baseURL
      ? `${config.baseURL.replace(/\/$/, '')}${config.url?.startsWith('/') ? '' : '/'}${config.url}`
      : config.url;
    console.log('API Request URL:', fullUrl);
    console.log('API Token:', token);

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;