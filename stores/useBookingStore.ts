import { BookingPayload, createBooking } from '@/services/bookingService';
import { create } from 'zustand';

interface BookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
  book: (payload: BookingPayload) => Promise<void>;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  loading: false,
  error: null,
  success: false,
  async book(payload) {
    set({ loading: true, error: null, success: false });
    try {
      await createBooking(payload);
      set({ loading: false, success: true });
    } catch (e: any) {
      set({ loading: false, error: e?.message || 'Booking failed', success: false });
    }
  },
  reset() {
    set({ loading: false, error: null, success: false });
  },
}));
