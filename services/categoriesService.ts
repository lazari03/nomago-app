import { apiClient } from './apiClient';

// Define interfaces for the API response structure
export interface Category {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
}

export interface CategoryResponse {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Mapped category interface for app usage
export interface MappedCategory {
  id: number;
  name: string;
  documentId: string;
}

export async function getCategories(): Promise<MappedCategory[]> {
  try {
    const response = await apiClient.categories();
    // Map the response data to a cleaner format for the app
    return response.data.data.map((category: Category) => ({
      id: category.id,
      name: category.name,
      documentId: category.documentId
    }));
  } catch (error) {
    // Error logging removed
    throw error;
  }
}
