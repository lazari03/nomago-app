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
  isFeatured?: boolean;
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
  featuredImageUrl?: string;
  locationLink?: string;
  categoryId?: number;
  categoryName?: string;
}

function mapListing(listing: Listing): MappedListing {
  let imageUrls: string[] = [];
  let featuredImageUrl: string | undefined;

  // Helper to extract best image URL from formats
  const getBestUrl = (formats: any, fallback?: string) =>
    formats?.small?.url || formats?.medium?.url || formats?.large?.url || formats?.thumbnail?.url || fallback;

  // Images array (Strapi v3 or v4)
  if (Array.isArray(listing.images)) {
    imageUrls = listing.images.map(img => getBestUrl(img.formats, img.url)).filter(Boolean);
  } else if (listing.images?.data && Array.isArray(listing.images.data)) {
    imageUrls = listing.images.data.map(img => {
      const attr = img.attributes;
      return getBestUrl(attr?.formats, attr?.url);
    }).filter(Boolean);
  }

  // Featured image (Strapi field: featuredImage)
  const featured = (listing as any).featuredImage?.data?.attributes || (listing as any).featuredImage;
  if (featured) {
    featuredImageUrl = getBestUrl(featured.formats, featured.url);
  }

  if (!imageUrls.length) {
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
    featured: listing.isFeatured === true,
    imageUrls,
    featuredImageUrl,
    locationLink: (listing as any).locationLink,
    categoryId: listing.category?.id ?? listing.category?.data?.id,
    categoryName: listing.category?.name ?? listing.category?.data?.attributes?.name,
  };
}

export async function fetchListings(categoryName?: string): Promise<MappedListing[]> {
  const query = qs.stringify(
    {
      populate: ['category', 'images', 'featuredImage'],
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

  const response = await apiClient.listings({ method: 'get', url: `/listings?${query}` });
  return response.data.data.map(mapListing);
}
