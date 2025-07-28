import { apiClient } from './apiClient';

// Define interfaces for the API response structure
export interface Listing {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  subtitle: string;
  description: string;
  price?: number;
  location?: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'pending';
  image?: {
    url: string;
    alternativeText?: string;
  };
  images?: Array<{
    url: string;
    alternativeText?: string;
  }>;
  category?: {
    id: number;
    name: string;
    documentId: string;
  };
}

export interface ListingsResponse {
  data: Listing[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Mapped listing interface for app usage
export interface MappedListing {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  description: string;
  price?: number;
  location?: string;
  featured: boolean;
  imageUrl?: string;
  categoryId?: number;
  categoryName?: string;
}


export async function getListings(categoryName?: string): Promise<MappedListing[]> {
  try {
    const params: any = { populate: 'category' };
    if (categoryName) {
      params['filters[category][name][$eq]'] = categoryName;
    }
    const response = await apiClient.listings({ params });
    // Map the response data to a cleaner format for the app
    return response.data.data.map((listing: Listing) => ({
      id: listing.id,
      documentId: listing.documentId,
      title: listing.title,
      subtitle: listing.subtitle,
      description: listing.description,
      price: listing.price,
      location: listing.location,
      featured: listing.featured,
      imageUrl: listing.image?.url ? `http://localhost:1337${listing.image.url}` : undefined,
      categoryId: listing.category?.id,
      categoryName: listing.category?.name,
    }));
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}


