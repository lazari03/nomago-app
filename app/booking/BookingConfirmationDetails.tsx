import { PropertyCategory } from '@/utils/PropertyCategory';
import { L10n } from '@/utils/translationHelper';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { bookingStyles } from './bookingStyles';

interface BookingConfirmationDetailsProps {
  propertyTitle: string;
  form: { name: string; surname: string; email: string; phoneNumber: string };
  localStartDate: Date | null;
  localEndDate: Date | null;
  categoryName?: string;
  t: (key: any, params?: any) => string;
  locationLink?: string;
}

const isApartmentCategory = (categoryName?: string) =>
  categoryName === PropertyCategory.Apartment || categoryName === PropertyCategory.Apartments;

export const BookingConfirmationDetails: React.FC<BookingConfirmationDetailsProps> = ({
  propertyTitle,
  form,
  localStartDate,
  localEndDate,
  categoryName,
  t,
  locationLink,
}) => {
  const isApartment = isApartmentCategory(categoryName);
  const showCheckOut = isApartment || (!isApartment && localEndDate);
  const handleOpenMaps = () => {
    if (locationLink) {
      Linking.openURL(locationLink);
    }
  };
  return (
    <View style={bookingStyles.bookingDetails}>
      <View style={bookingStyles.detailRow}>
        <Text style={bookingStyles.detailLabel}>{t(L10n.booking.property)}</Text>
        <Text style={bookingStyles.detailValue}>{propertyTitle}</Text>
      </View>
      <View style={bookingStyles.detailRow}>
        <Text style={bookingStyles.detailLabel}>{t(L10n.booking.name)}</Text>
        <Text style={bookingStyles.detailValue}>{form.name} {form.surname}</Text>
      </View>
      <View style={bookingStyles.detailRow}>
        <Text style={bookingStyles.detailLabel}>{t(L10n.booking.email)}</Text>
        <Text style={bookingStyles.detailValue}>{form.email}</Text>
      </View>
      <View style={bookingStyles.detailRow}>
        <Text style={bookingStyles.detailLabel}>{t(L10n.booking.phoneNumber)}</Text>
        <Text style={bookingStyles.detailValue}>{form.phoneNumber}</Text>
      </View>
      <View style={bookingStyles.detailRow}>
        <Text style={bookingStyles.detailLabel}>{t(L10n.booking.checkIn)}</Text>
        <Text style={bookingStyles.detailValue}>{localStartDate?.toLocaleDateString() || t(L10n.booking.notSelected)}</Text>
      </View>
  {showCheckOut ? (
        <View style={bookingStyles.detailRowNoBorder}>
          <Text style={bookingStyles.detailLabel}>{t(L10n.booking.checkOut)}</Text>
          <Text style={bookingStyles.detailValue}>{localEndDate?.toLocaleDateString() || t(L10n.booking.notSelected)}</Text>
        </View>
      ) : (
        <View style={bookingStyles.detailRowNoBorder}>
          <Text style={bookingStyles.detailLabel}>{t(L10n.booking.time)}</Text>
          <Text style={bookingStyles.detailValue}>{localStartDate ? localStartDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : t(L10n.booking.notSelected)}</Text>
        </View>
      )}
      {locationLink ? (
        <TouchableOpacity
          style={bookingStyles.getLocationButton}
          onPress={handleOpenMaps}
        >
          <Text style={bookingStyles.getLocationButtonText}>Open in Maps</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
