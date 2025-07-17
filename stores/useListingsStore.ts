import { create } from 'zustand';
import { MappedListing, getFeaturedListings, getListings, getListingsByCategory } from '../services/listingsService';

interface ListingsState {
  // Current listings data
  listings: MappedListing[];
  featuredListings: MappedListing[];
  currentCategoryListings: MappedListing[];
  
  // Loading states
  loading: boolean;
  featuredLoading: boolean;
  categoryLoading: boolean;
  
  // Error states
  error: string | null;
  featuredError: string | null;
  categoryError: string | null;
  
  // Actions
  fetchListings: () => Promise<void>;
  fetchFeaturedListings: () => Promise<void>;
  fetchListingsByCategory: (categoryName: string) => Promise<void>;
  clearError: () => void;
}

export const useListingsStore = create<ListingsState>((set, get) => ({
  // Initial state
  listings: [],
  featuredListings: [],
  currentCategoryListings: [],
  loading: false,
  featuredLoading: false,
  categoryLoading: false,
  error: null,
  featuredError: null,
  categoryError: null,
  
  // Fetch all listings
  fetchListings: async () => {
    set({ loading: true, error: null });
    try {
      const listings = await getListings();
      set({ listings, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch listings',
        loading: false 
      });
    }
  },
  
  // Fetch featured listings for carousel
  fetchFeaturedListings: async () => {
    set({ featuredLoading: true, featuredError: null });
    try {
      const featuredListings = await getFeaturedListings();
      set({ featuredListings, featuredLoading: false });
    } catch (error) {
      set({ 
        featuredError: error instanceof Error ? error.message : 'Failed to fetch featured listings',
        featuredLoading: false 
      });
    }
  },
  
  // Fetch listings by category
  fetchListingsByCategory: async (categoryName: string) => {
    set({ categoryLoading: true, categoryError: null });
    try {
      const currentCategoryListings = await getListingsByCategory(categoryName);
      set({ currentCategoryListings, categoryLoading: false });
    } catch (error) {
      set({ 
        categoryError: error instanceof Error ? error.message : 'Failed to fetch category listings',
        categoryLoading: false 
      });
    }
  },
  
  // Clear errors
  clearError: () => set({ error: null, featuredError: null, categoryError: null }),
}));
