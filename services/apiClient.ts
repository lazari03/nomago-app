// apiClient.ts
import { API_HOST } from '@/constants/Platform';
import axios from 'axios';

const BASE_URL = `https://${API_HOST}/api`;
const AUTH_HEADER = 'Bearer 3cc4fcdc4e832666d02e71cbb307a6f573e38b61b524945757171b5fca48e991cf133f562a550b5862c0aa516184d393b88f76886a2f31045a244af71c97a67841cc25866438be2bc452732b340f9fd1550595640f668efed4040075ac7a295f72d237b160ee88afc8942e93e19b277bb303593a2bf6ff9ccc8ef1fb51889325';

// Add error handling and logging for debugging
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: AUTH_HEADER,
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
  console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const apiClient = new Proxy(
  {},
  {
    get: (_, resource: string) => (options: { method?: 'get' | 'post' | 'put' | 'delete'; params?: any; data?: any; url?: string } = {}) => {
      const method = options.method || 'get';
      const url = options.url || `/${resource}`;
      return api.request({
        url,
        method,
        params: options.params,
        data: options.data,
      });
    },
  }
) as Record<string, (options?: { method?: 'get' | 'post' | 'put' | 'delete'; params?: any; data?: any; url?: string }) => Promise<any>>;
