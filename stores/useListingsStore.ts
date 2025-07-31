// listingsStore.ts
import { create } from 'zustand';
import { MappedListing, fetchListings } from '../services/listingsService';

interface ListingsState {
  listings: MappedListing[];
  currentCategoryListings: MappedListing[];
  selectedProperty: MappedListing | null;
  loading: boolean;
  categoryLoading: boolean;
  error: string | null;
  categoryError: string | null;
  setSelectedProperty: (property: MappedListing | null) => void;
  fetchListings: () => Promise<void>;
  fetchListingsByCategory: (categoryName: string) => Promise<void>;
  clearError: () => void;
}

export const useListingsStore = create<ListingsState>((set) => ({
  listings: [],
  currentCategoryListings: [],
  selectedProperty: null,
  loading: false,
  categoryLoading: false,
  error: null,
  categoryError: null,

  setSelectedProperty: (property) => set({ selectedProperty: property }),

  fetchListings: async () => {
    set({ loading: true, error: null });
    try {
      const listings = await fetchListings();
      set({ listings, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch listings',
        loading: false,
      });
    }
  },

  fetchListingsByCategory: async (categoryName: string) => {
    set({ categoryLoading: true, categoryError: null });
    try {
      const currentCategoryListings = await fetchListings(categoryName);
      set({ currentCategoryListings, categoryLoading: false });
    } catch (err) {
      set({
        categoryError: err instanceof Error ? err.message : 'Failed to fetch category listings',
        categoryLoading: false,
      });
    }
  },

  clearError: () => set({ error: null, categoryError: null }),
}));
