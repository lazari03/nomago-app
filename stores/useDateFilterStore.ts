import { create } from 'zustand';

interface DateFilterState {
  fromDate: Date | null;
  toDate: Date | null;
  setDates: (from: Date | null, to: Date | null) => void;
}

export const useDateFilterStore = create<DateFilterState>((set) => ({
  fromDate: null,
  toDate: null,
  setDates: (from, to) => set({ fromDate: from, toDate: to }),
}));
