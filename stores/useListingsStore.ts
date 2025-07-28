import { create } from 'zustand';
import { MappedListing, getListings } from '../services/listingsService';

interface ListingsState {
  // Current listings data
  listings: MappedListing[];
  currentCategoryListings: MappedListing[];
  // Selected property for detail page
  selectedProperty: MappedListing | null;
  setSelectedProperty: (property: MappedListing | null) => void;
  // Loading states
  loading: boolean;
  categoryLoading: boolean;
  // Error states
  error: string | null;
  categoryError: string | null;
  // Actions
  fetchListings: () => Promise<void>;
  fetchListingsByCategory: (categoryName: string) => Promise<void>;
  clearError: () => void;
}

export const useListingsStore = create<ListingsState>((set, get) => ({
  // Initial state
  listings: [],
  currentCategoryListings: [],
  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  loading: false,
  categoryLoading: false,
  error: null,
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
  
  // Fetch listings by category
  fetchListingsByCategory: async (categoryName: string) => {
    set({ categoryLoading: true, categoryError: null });
    try {
      const currentCategoryListings = await getListings(categoryName);
      set({ currentCategoryListings, categoryLoading: false });
    } catch (error) {
      set({ 
        categoryError: error instanceof Error ? error.message : 'Failed to fetch category listings',
        categoryLoading: false 
      });
    }
  },
  
  // Clear errors
  clearError: () => set({ error: null, categoryError: null }),
}));
