import { fetchHomeLeftCards, fetchHomeRightCards, HomeRightCard } from '@/services/homeCardsService';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { create } from 'zustand';

interface HomeCardsState {
  leftCards: HomeRightCard[];
  rightCards: HomeRightCard[];
  loading: boolean;
  error: string | null;
  fetchLeftCards: () => Promise<void>;
  fetchRightCards: () => Promise<void>;
}

export const useHomeCardsStore = create<HomeCardsState>((set) => ({
  leftCards: [],
  rightCards: [],
  loading: false,
  error: null,
  fetchLeftCards: async () => {
    set({ loading: true, error: null });
    try {
      // Get the selected category from the category store
  const category = useCategoryStore.getState().category;
      const cards = await fetchHomeLeftCards(category);
      set({ leftCards: cards, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch left cards', loading: false });
    }
  },
  fetchRightCards: async () => {
    set({ loading: true, error: null });
    try {
      const cards = await fetchHomeRightCards();
      set({ rightCards: cards, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch right cards', loading: false });
    }
  },
}));
