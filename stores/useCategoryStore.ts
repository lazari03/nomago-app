import { create } from 'zustand';
import { MappedCategory, getCategories } from '../services/categoriesService';

interface CategoryState {
  // Current selected category
  category: string;
  setCategory: (category: string) => void;
  
  // Categories data from API
  categories: MappedCategory[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  category: '', // Start with empty string instead of 'Residences'
  categories: [],
  loading: false,
  error: null,
  
  setCategory: (category: string) => set({ category }),
  
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await getCategories();
      const currentState = get();
      
      // Always select the first category from the API if no category is selected
      // or if the current category doesn't exist in the fetched categories
      if (!currentState.category || !categories.some(cat => cat.name === currentState.category)) {
        const firstCategory = categories.length > 0 ? categories[0].name : '';
        set({ categories, loading: false, category: firstCategory });
      } else {
        set({ categories, loading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
        loading: false 
      });
    }
  },
}));
