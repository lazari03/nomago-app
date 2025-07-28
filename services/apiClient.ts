import axios from 'axios';

const BASE_URL = 'http://localhost:1337/api';
const AUTH_HEADER = 'Bearer 16b6055fb458f239370fd6e3fd487134c02ffc439706c884c48b4b828ae8324e4c57d7b708f882a1a46781966ed89f2962fa8a46dec71bbd54e9b612ed2ebe89e94992b5ab61554611cc7a6ad2127ce5266fbaa0de04d2b146d5b9cdc49afe3e57859c72f0b2e42d0fd445652252b86e8580dfa92f2f1c6898c9b5dfdc8f26dd';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: AUTH_HEADER,
    'Content-Type': 'application/json',
  },
});

// Usage: apiClient.categories(), apiClient.listings(), etc.
export const apiClient = new Proxy({}, {
  get: (_, resource: string) => {
    return (options: { method?: 'get' | 'post' | 'put' | 'delete', params?: any, data?: any } = {}) => {
      const method = options.method || 'get';
      const url = `/${resource}`;
      return api.request({
        url,
        method,
        params: options.params,
        data: options.data,
      });
    };
  }
}) as Record<string, (options?: { method?: 'get' | 'post' | 'put' | 'delete', params?: any, data?: any }) => Promise<any>>;