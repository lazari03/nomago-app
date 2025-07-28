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
    const response = await axios.get<CategoryResponse>('http://xgs8swck0g8cgs8gcososwg8.168.231.78.121.sslip.io/api/categories', {
      headers: {
        'Authorization': 'Bearer 838fa8553dd791f616d8577fb194259a6c8b78c39525ab1c22e44cbab06d18c793cea6d7e4a2f9903090baeeb117795578ed1f114959158809a609fbb203e96c66806d72a99ee2b86f86cdbd4c2707a49045faec2779500236e6fd6f130d72799e7c9846363a4fd51e8b714d844b982c56e54d251afdb5790fc43733f1b0dab9',
        'Content-Type': 'application/json'
      }
    });
    console.log('API Response: Category', response.data);

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