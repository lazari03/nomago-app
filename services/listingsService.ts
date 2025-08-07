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
  // Removed debug console.log
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
    const mapped = response.data.data.map(mapListing);
    return mapped;
  } catch (error: any) {
    if (error.response) {
      // Error logging removed
    }
    throw error;
  }
}
