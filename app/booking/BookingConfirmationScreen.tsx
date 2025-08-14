import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslations } from '@/hooks/useTranslation';
import { useBookingStore } from '@/stores/useBookingStore';
import { L10n } from '@/utils/translationHelper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bookingStyles } from './bookingStyles';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { propertyTitle } = useLocalSearchParams();
  const confirmationRef = useRef<View>(null);
  const {
    form,
    localStartDate,
    localEndDate,
    resetForm
  } = useBookingStore();
  const { t } = useTranslations();

  return (
    <ThemedView style={bookingStyles.fullScreenContainer}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
        translucent={false} 
        hidden={false}
      />
  <HeaderNavigation showBack title={t(L10n.booking.bookingConfirmed)} />
      <ScrollView contentContainerStyle={bookingStyles.confirmationContainer}>
        <View style={bookingStyles.confirmationCard} ref={confirmationRef} collapsable={false}>
          <View style={bookingStyles.confirmationHeader}>
            <Text style={bookingStyles.brandText}>NOMAGO</Text>
            <Text style={bookingStyles.confirmationDate}>
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <View style={bookingStyles.successIcon}>
            <Text style={bookingStyles.successIconText}>✓</Text>
          </View>
          <Text style={bookingStyles.confirmationTitle}>{t(L10n.booking.weReceived)}</Text>
          <Text style={bookingStyles.confirmationSubtitle}>{t(L10n.booking.hereAreDetails)}</Text>
          <View style={bookingStyles.bookingDetails}>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>{t(L10n.booking.property)}</Text>
              <Text style={bookingStyles.detailValue}>{propertyTitle}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>{t(L10n.booking.name)}</Text>
              <Text style={bookingStyles.detailValue}>{form?.name} {form?.surname}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>{t(L10n.booking.email)}</Text>
              <Text style={bookingStyles.detailValue}>{form?.email}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>{t(L10n.booking.phoneNumber)}</Text>
              <Text style={bookingStyles.detailValue}>{form?.phoneNumber}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>{t(L10n.booking.checkIn)}</Text>
              <Text style={bookingStyles.detailValue}>{localStartDate ? localStartDate.toLocaleDateString() : t(L10n.booking.notSelected)}</Text>
            </View>
            <View style={[bookingStyles.detailRow, { borderBottomWidth: 0 }]}> 
              <Text style={bookingStyles.detailLabel}>{t(L10n.booking.checkOut)}</Text>
              <Text style={bookingStyles.detailValue}>{localEndDate ? localEndDate.toLocaleDateString() : t(L10n.booking.notSelected)}</Text>
            </View>
          </View>
        </View>
        <View style={bookingStyles.confirmationButtons}>
          {/* Save Confirmation button can be implemented if needed */}
          <TouchableOpacity style={bookingStyles.doneButton} onPress={() => {
            resetForm();
            router.replace('/');
          }}>
            <ThemedText style={bookingStyles.doneButtonText}>{t(L10n.booking.done)}</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
