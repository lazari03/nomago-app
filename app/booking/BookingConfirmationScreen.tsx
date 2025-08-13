import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBookingStore } from '@/stores/useBookingStore';
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

  return (
    <ThemedView style={bookingStyles.fullScreenContainer}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
        translucent={false} 
        hidden={false}
      />
      <HeaderNavigation showBack title="Booking Confirmed" />
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
          <Text style={bookingStyles.confirmationTitle}>We received your booking!</Text>
          <Text style={bookingStyles.confirmationSubtitle}>Here are your booking details:</Text>
          <View style={bookingStyles.bookingDetails}>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>Property:</Text>
              <Text style={bookingStyles.detailValue}>{propertyTitle}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>Name:</Text>
              <Text style={bookingStyles.detailValue}>{form?.name} {form?.surname}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>Email:</Text>
              <Text style={bookingStyles.detailValue}>{form?.email}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>Phone:</Text>
              <Text style={bookingStyles.detailValue}>{form?.phoneNumber}</Text>
            </View>
            <View style={bookingStyles.detailRow}>
              <Text style={bookingStyles.detailLabel}>Check-in:</Text>
              <Text style={bookingStyles.detailValue}>{localStartDate ? localStartDate.toLocaleDateString() : 'Not selected'}</Text>
            </View>
            <View style={[bookingStyles.detailRow, { borderBottomWidth: 0 }]}> 
              <Text style={bookingStyles.detailLabel}>Check-out:</Text>
              <Text style={bookingStyles.detailValue}>{localEndDate ? localEndDate.toLocaleDateString() : 'Not selected'}</Text>
            </View>
          </View>
        </View>
        <View style={bookingStyles.confirmationButtons}>
          {/* Save Confirmation button can be implemented if needed */}
          <TouchableOpacity style={bookingStyles.doneButton} onPress={() => {
            resetForm();
            router.replace('/');
          }}>
            <ThemedText style={bookingStyles.doneButtonText}>Done</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
