import { apiClient } from './apiClient';

export interface BookingPayload {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export async function createBooking(payload: BookingPayload) {
  try {
    // Strapi expects data inside a 'data' object
    return await apiClient.bookings({ method: 'post', data: { data: payload } });
  } catch (error: any) {
    // Log error details for debugging
    if (error.response) {
      console.error('Booking API error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Booking API network error:', error.message);
    } else {
      console.error('Booking API unknown error:', error);
    }
    throw error;
  }
}
