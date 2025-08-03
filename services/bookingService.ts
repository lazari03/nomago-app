import { apiClient } from './apiClient';


export interface BookingPayload {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  startDate?: Date | null;
  endDate?: Date | null;
  listing: string; // documentId is always a string
}

export async function createBooking(payload: BookingPayload) {
  try {
    // Build a flat data object for Strapi
    const data: any = {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      startDate: payload.startDate ? new Date(payload.startDate).toISOString() : undefined,
      endDate: payload.endDate ? new Date(payload.endDate).toISOString() : undefined,
      listing: payload.listing, // This is the documentId
    };
    // Remove undefined fields (Strapi will reject them)
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
    // Strapi expects data inside a 'data' object
    return await apiClient.bookings({ method: 'post', data: { data } });
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
