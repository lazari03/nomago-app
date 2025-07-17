import axios from 'axios';

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

export async function getListings(categoryId?: number): Promise<MappedListing[]> {
  try {
    let url = 'http://localhost:1337/api/listings?populate=category,image,images';
    
    // Filter by category if provided
    if (categoryId) {
      url += `&filters[category][id][$eq]=${categoryId}`;
    }

    const response = await axios.get<ListingsResponse>(url, {
      headers: {
        'Authorization': 'Bearer 3cc4fcdc4e832666d02e71cbb307a6f573e38b61b524945757171b5fca48e991cf133f562a550b5862c0aa516184d393b88f76886a2f31045a244af71c97a67841cc25866438be2bc452732b340f9fd1550595640f668efed4040075ac7a295f72d237b160ee88afc8942e93e19b277bb303593a2bf6ff9ccc8ef1fb51889325',
        'Content-Type': 'application/json'
      }
    });

    console.log('Listings API Response:', response.data);

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

export async function getFeaturedListings(): Promise<MappedListing[]> {
  try {
    const url = 'http://localhost:1337/api/listings?populate=category,image,images&filters[featured][$eq]=true';

    const response = await axios.get<ListingsResponse>(url, {
      headers: {
        'Authorization': 'Bearer 3cc4fcdc4e832666d02e71cbb307a6f573e38b61b524945757171b5fca48e991cf133f562a550b5862c0aa516184d393b88f76886a2f31045a244af71c97a67841cc25866438be2bc452732b340f9fd1550595640f668efed4040075ac7a295f72d237b160ee88afc8942e93e19b277bb303593a2bf6ff9ccc8ef1fb51889325',
        'Content-Type': 'application/json'
      }
    });

    console.log('Featured Listings API Response:', response.data);

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
    console.error('Error fetching featured listings:', error);
    throw error;
  }
}

export async function getListingsByCategory(categoryName: string): Promise<MappedListing[]> {
  try {
    const url = `http://localhost:1337/api/listings?populate=category,image,images&filters[category][name][$eq]=${encodeURIComponent(categoryName)}`;

    const response = await axios.get<ListingsResponse>(url, {
      headers: {
        'Authorization': 'Bearer 3cc4fcdc4e832666d02e71cbb307a6f573e38b61b524945757171b5fca48e991cf133f562a550b5862c0aa516184d393b88f76886a2f31045a244af71c97a67841cc25866438be2bc452732b340f9fd1550595640f668efed4040075ac7a295f72d237b160ee88afc8942e93e19b277bb303593a2bf6ff9ccc8ef1fb51889325',
        'Content-Type': 'application/json'
      }
    });

    console.log(`Listings for category "${categoryName}":`, response.data);

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
    console.error(`Error fetching listings for category "${categoryName}":`, error);
    throw error;
  }
}
