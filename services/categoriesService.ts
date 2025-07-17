import axios from 'axios';

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
    const response = await axios.get<CategoryResponse>('http://localhost:1337/api/categories', {
      headers: {
        'Authorization': 'Bearer 3cc4fcdc4e832666d02e71cbb307a6f573e38b61b524945757171b5fca48e991cf133f562a550b5862c0aa516184d393b88f76886a2f31045a244af71c97a67841cc25866438be2bc452732b340f9fd1550595640f668efed4040075ac7a295f72d237b160ee88afc8942e93e19b277bb303593a2bf6ff9ccc8ef1fb51889325',
        'Content-Type': 'application/json'
      }
    });
    console.log('API Response:', response.data);

    // Map the response data to a cleaner format for the app
    return response.data.data.map((category: Category) => ({
      id: category.id,
      name: category.name,
      documentId: category.documentId
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}