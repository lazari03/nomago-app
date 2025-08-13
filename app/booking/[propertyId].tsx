import { DateRangePicker } from '@/components/DateRangePicker';
import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BOOKING_DATES_HINT } from '@/constants/bookingFormStrings';
import Colors from '@/constants/Colors';
import { IS_ANDROID, PLATFORM_STYLES } from '@/constants/Platform';
import { useBookingStore } from '@/stores/useBookingStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';
import { create } from 'zustand';
import { bookingStyles } from './bookingStyles';

type BookingFormState = {
  form: { name: string; surname: string; email: string; phoneNumber: string };
  setForm: (payload: Partial<{ name: string; surname: string; email: string; phoneNumber: string }>) => void;
  localStartDate: Date | null;
  setLocalStartDate: (date: Date | null) => void;
  localEndDate: Date | null;
  setLocalEndDate: (date: Date | null) => void;
  showStartDatePicker: boolean;
  setShowStartDatePicker: (val: boolean) => void;
  showEndDatePicker: boolean;
  setShowEndDatePicker: (val: boolean) => void;
  showConfirmation: boolean;
  setShowConfirmation: (val: boolean) => void;
  isSaving: boolean;
  setIsSaving: (val: boolean) => void;
  resetForm: () => void;
};

export const screenOptions = {
  headerShown: false,
};


// Zustand store for form state (move outside component for persistence)
const useBookingFormStore = create<BookingFormState>((set) => ({
  form: { name: '', surname: '', email: '', phoneNumber: '' },
  setForm: (payload: Partial<{ name: string; surname: string; email: string; phoneNumber: string }>) =>
    set((state: any) => ({ form: { ...state.form, ...payload } })),
  localStartDate: null as Date | null,
  setLocalStartDate: (date: Date | null) => set({ localStartDate: date }),
  localEndDate: null as Date | null,
  setLocalEndDate: (date: Date | null) => set({ localEndDate: date }),
  showStartDatePicker: false,
  setShowStartDatePicker: (val: boolean) => set({ showStartDatePicker: val }),
  showEndDatePicker: false,
  setShowEndDatePicker: (val: boolean) => set({ showEndDatePicker: val }),
  showConfirmation: false,
  setShowConfirmation: (val: boolean) => set({ showConfirmation: val }),
  isSaving: false,
  setIsSaving: (val: boolean) => set({ isSaving: val }),
  resetForm: () => set({
    form: { name: '', surname: '', email: '', phoneNumber: '' },
    localStartDate: null,
    localEndDate: null,
    showStartDatePicker: false,
    showEndDatePicker: false,
    showConfirmation: false,
    isSaving: false,
  }),
}));

export default function BookingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { propertyId, propertyDocumentId, propertyTitle } = useLocalSearchParams<{
    propertyId: string;
    propertyDocumentId: string;
    propertyTitle: string;
  }>();

  const { fromDate, toDate } = useDateFilterStore();
  const {
    form, setForm,
    localStartDate, setLocalStartDate,
    localEndDate, setLocalEndDate,
    showStartDatePicker, setShowStartDatePicker,
    showEndDatePicker, setShowEndDatePicker,
    showConfirmation, setShowConfirmation,
    isSaving, setIsSaving, resetForm
  } = useBookingFormStore();

  const confirmationRef = useRef<View>(null);
  const { loading, error, success, book, reset } = useBookingStore();

  useEffect(() => {
    if (success) {
      setShowConfirmation(true);
      reset();
    }
    if (error) {
      Alert.alert('Booking failed', error);
      reset();
    }
  }, [success, error, setShowConfirmation, reset]);

  const handleSubmit = () => {
    if (!form.name || !form.surname || !form.email || !form.phoneNumber) {
      Alert.alert('Please fill all fields');
      return;
    }
    if (!localStartDate || !localEndDate) {
      Alert.alert('Please select both start and end dates');
      return;
    }
    if (!propertyDocumentId) {
      Alert.alert('Property Document ID is missing.');
      return;
    }
    book({
      ...form,
      startDate: localStartDate,
      endDate: localEndDate,
      listing: propertyDocumentId,
    });
  };

  const handleClose = () => {
    setShowConfirmation(false);
    resetForm();
    router.back();
  };

  const handleSaveBookingData = async () => {
    if (!confirmationRef.current) {
      Alert.alert('Error', 'No confirmation to save.');
      return;
    }
    setIsSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access media library is required!');
        setIsSaving(false);
        return;
      }
      await new Promise(res => setTimeout(res, 100));
      const uri = await captureRef(confirmationRef, {
        format: 'png',
        quality: 1,
      });
      await MediaLibrary.createAssetAsync(uri);
      Alert.alert('Success', 'Booking confirmation saved to your gallery!');
    } catch (error) {
      console.error('Error saving booking confirmation image:', error);
      Alert.alert('Error', 'Failed to save image. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ThemedView style={bookingStyles.fullScreenContainer}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.background || '#fff'} 
        translucent={IS_ANDROID} 
        hidden={false}
      />
      <HeaderNavigation
        showBack
        title={showConfirmation ? 'Booking Confirmed' : undefined}
      />
      <KeyboardAvoidingView 
        behavior={PLATFORM_STYLES.keyboardBehavior} 
        style={bookingStyles.content}
      >
        {showConfirmation ? (
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
                  <Text style={bookingStyles.detailValue}>{form.name} {form.surname}</Text>
                </View>
                <View style={bookingStyles.detailRow}>
                  <Text style={bookingStyles.detailLabel}>Email:</Text>
                  <Text style={bookingStyles.detailValue}>{form.email}</Text>
                </View>
                <View style={bookingStyles.detailRow}>
                  <Text style={bookingStyles.detailLabel}>Phone:</Text>
                  <Text style={bookingStyles.detailValue}>{form.phoneNumber}</Text>
                </View>
                <View style={bookingStyles.detailRow}>
                  <Text style={bookingStyles.detailLabel}>Check-in:</Text>
                  <Text style={bookingStyles.detailValue}>{localStartDate?.toLocaleDateString() || 'Not selected'}</Text>
                </View>
                <View style={[bookingStyles.detailRow, { borderBottomWidth: 0 }]}>
                  <Text style={bookingStyles.detailLabel}>Check-out:</Text>
                  <Text style={bookingStyles.detailValue}>{localEndDate?.toLocaleDateString() || 'Not selected'}</Text>
                </View>
              </View>
            </View>
            <View style={bookingStyles.confirmationButtons}>
              <TouchableOpacity style={bookingStyles.saveButton} onPress={handleSaveBookingData} disabled={isSaving}>
                {isSaving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <ThemedText style={bookingStyles.saveButtonText}>Save Confirmation</ThemedText>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={bookingStyles.doneButton} onPress={handleClose}>
                <ThemedText style={bookingStyles.doneButtonText}>Done</ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={bookingStyles.formBox}>
            <ThemedText style={bookingStyles.formTitle}>Book {propertyTitle}</ThemedText>
            <View style={bookingStyles.inputRow}>
              <TextInput
                style={[bookingStyles.inputHalf, bookingStyles.inputLeft]}
                placeholder="Name"
                value={form.name}
                onChangeText={text => setForm({ name: text })}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <TextInput
                style={[bookingStyles.inputHalf, bookingStyles.inputRight]}
                placeholder="Surname"
                value={form.surname}
                onChangeText={text => setForm({ surname: text })}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>
            <TextInput
              style={bookingStyles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={text => setForm({ email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TextInput
              style={bookingStyles.input}
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChangeText={text => setForm({ phoneNumber: text })}
              keyboardType="phone-pad"
              returnKeyType="done"
            />
            <View style={bookingStyles.datesSection}>
              <ThemedText style={bookingStyles.formLabel}>Dates:</ThemedText>
              {(fromDate && toDate) ? (
                <ThemedText style={bookingStyles.formValue}>
                  {fromDate ? fromDate.toLocaleDateString() : ''} - {toDate ? toDate.toLocaleDateString() : ''}
                </ThemedText>
              ) : (
                <>
                  <ThemedText style={bookingStyles.formValueHint}>{BOOKING_DATES_HINT}</ThemedText>
                  <DateRangePicker
                    startDate={localStartDate}
                    endDate={localEndDate}
                    onStartDateChange={setLocalStartDate}
                    onEndDateChange={setLocalEndDate}
                  />
                </>
              )}
            </View>
            <View style={bookingStyles.buttonContainer}>
              <TouchableOpacity style={bookingStyles.cancelButton} onPress={() => router.back()} disabled={loading}>
                <ThemedText style={bookingStyles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={bookingStyles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={bookingStyles.submitButtonText}>Book Now</ThemedText>}
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
