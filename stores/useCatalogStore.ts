import { getCategories } from '@/services/categoriesService';
import { create } from 'zustand';

interface CatalogStore {
  items: Array<{ id: number; name: string }>;
  fetchCatalog: () => Promise<void>;
  addItem: (item: { id: number; name: string }) => void;
}

const useCatalogStore = create<CatalogStore>((set) => ({
  items: [],

  // Fetch catalog items using the service
  fetchCatalog: async () => {
    try {
      const data = await getCategories();
      set({ items: data });
    } catch (error) {
      console.error('Failed to fetch catalog:', error);
    }
  },

  // Add a new item to the catalog
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));

export default useCatalogStore;