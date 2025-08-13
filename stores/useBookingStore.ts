import { BookingPayload, createBooking } from '@/services/bookingService';
import { create } from 'zustand';


interface BookingFormFields {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

interface BookingState {
  // Booking status
  loading: boolean;
  error: string | null;
  success: boolean;
  // Form fields
  form: BookingFormFields;
  setForm: (payload: Partial<BookingFormFields>) => void;
  // Dates
  localStartDate: Date | null;
  setLocalStartDate: (date: Date | null) => void;
  localEndDate: Date | null;
  setLocalEndDate: (date: Date | null) => void;
  // Date picker visibility
  showStartDatePicker: boolean;
  setShowStartDatePicker: (val: boolean) => void;
  showEndDatePicker: boolean;
  setShowEndDatePicker: (val: boolean) => void;
  // Last booking details for confirmation
  lastBooking: BookingPayload | null;
  setLastBooking: (payload: BookingPayload) => void;
  // Actions
  book: (payload: BookingPayload) => Promise<void>;
  resetForm: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  // Booking status
  loading: false,
  error: null,
  success: false,
  // Form fields
  form: { name: '', surname: '', email: '', phoneNumber: '' },
  setForm: (payload) => set((state) => ({ form: { ...state.form, ...payload } })),
  // Dates
  localStartDate: null,
  setLocalStartDate: (date) => set({ localStartDate: date }),
  localEndDate: null,
  setLocalEndDate: (date) => set({ localEndDate: date }),
  // Date picker visibility
  showStartDatePicker: false,
  setShowStartDatePicker: (val) => set({ showStartDatePicker: val }),
  showEndDatePicker: false,
  setShowEndDatePicker: (val) => set({ showEndDatePicker: val }),
  // Last booking details
  lastBooking: null,
  setLastBooking: (payload) => set({ lastBooking: payload }),
  // Book action
  async book(payload) {
    set({ loading: true, error: null, success: false });
    try {
      await createBooking(payload);
      set({ loading: false, success: true, lastBooking: payload });
    } catch (e: any) {
      set({ loading: false, error: e?.message || 'Booking failed', success: false });
    }
  },
  // Reset form fields and dates
  resetForm() {
    set({
      form: { name: '', surname: '', email: '', phoneNumber: '' },
      localStartDate: null,
      localEndDate: null,
      showStartDatePicker: false,
      showEndDatePicker: false,
    });
  },
  // Reset booking status
  reset() {
    set({ loading: false, error: null, success: false, lastBooking: null });
  },
}));
