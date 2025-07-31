// listingsService.ts
import qs from 'qs';
import { apiClient } from './apiClient';

export interface Listing {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  propertyName?: string;
  title?: string;
  subtitle?: string;
  description: string;
  price?: number;
  location?: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'pending';
  images?: {
    data: Array<{
      id: number;
      attributes: {
        url: string;
        formats?: {
          small?: { url: string };
          thumbnail?: { url: string };
        };
      };
    }>;
  };
  category?: {
    id?: number;
    name?: string;
    data?: {
      id: number;
      attributes: {
        name: string;
        documentId: string;
      };
    } | null;
  } | null;
}

export interface MappedListing {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  description: string;
  price?: number;
  location?: string;
  featured: boolean;
  imageUrls: string[];
  categoryId?: number;
  categoryName?: string;
}

function mapListing(listing: Listing): MappedListing {
  let imageUrls: string[] = [];

  // Debug: log raw images object
  console.log('Raw images object:', JSON.stringify(listing.images, null, 2));
  if (Array.isArray(listing.images)) {
    imageUrls = listing.images.map(img => img.url).filter(Boolean);
  } else if (listing.images?.data && Array.isArray(listing.images.data)) {
    imageUrls = listing.images.data.map(img => img.attributes?.url).filter(Boolean);
  }

  if (imageUrls.length === 0) {
    imageUrls = ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'];
  }

  return {
    id: listing.id,
    documentId: listing.documentId,
    title: listing.propertyName || listing.title || '',
    subtitle: listing.subtitle,
    description: listing.description,
    price: listing.price,
    location: listing.location,
    featured: listing.featured,
    imageUrls,
    categoryId: listing.category?.id ?? listing.category?.data?.id,
    categoryName: listing.category?.name ?? listing.category?.data?.attributes?.name,
  };
}

export async function fetchListings(categoryName?: string): Promise<MappedListing[]> {
  const query = qs.stringify(
    {
      populate: ['category', 'images'],
      ...(categoryName && {
        filters: {
          category: {
            name: { $eq: categoryName },
          },
        },
      }),
    },
    { encodeValuesOnly: true }
  );

  try {
    const response = await apiClient.listings({ method: 'get', url: `/listings?${query}` });
    console.log('Raw listings response:', response.data.data);
    const mapped = response.data.data.map(mapListing);
    console.log('Mapped listings:', JSON.stringify(mapped, null, 2));
    return mapped;
  } catch (error: any) {
    if (error.response) {
      console.error('Listings API error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Listings API network error:', error.message);
    } else {
      console.error('Listings API unknown error:', error);
    }
    throw error;
  }
}
