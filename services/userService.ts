import { apiClient } from './apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
}


export const getUser = async (userId: string): Promise<User> => {
  const response = await apiClient['users']({
    method: 'get',
    url: `/users/${userId}`,
  });
  return response.data;
};


export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient['users']({
    method: 'post',
    data: userData,
    url: '/users',
  });
  return response.data;
};
