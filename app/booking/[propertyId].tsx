import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BOOKING_DATES_HINT } from '@/constants/bookingFormStrings';
import Colors from '@/constants/Colors';
import { IS_ANDROID, PLATFORM_STYLES } from '@/constants/Platform';
import { useTranslations } from '@/hooks/useTranslation';
import type { MappedListing } from '@/services/listingsService';
import { useBookingStore } from '@/stores/useBookingStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { PropertyCategory } from '@/utils/PropertyCategory';
import { L10n } from '@/utils/translationHelper';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';
import { create } from 'zustand';
import { BookingConfirmationDetails } from './BookingConfirmationDetails';
import { BookingFormSection } from './BookingFormSection';
import { bookingStyles } from './bookingStyles';
// Helper to check if a category is an apartment
const isApartmentCategory = (categoryName?: string) =>
  categoryName === PropertyCategory.Apartment || categoryName === PropertyCategory.Apartments;

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

// BookingScreen component
export default function BookingScreen() {
  // Get property context for categoryName
  const { propertyId, propertyDocumentId, propertyTitle } = useLocalSearchParams<{
    propertyId: string;
    propertyDocumentId: string;
    propertyTitle: string;
  }>();
  const { selectedProperty, listings } = useListingsStore();
  // Now that propertyId is available, do the lookup
  const property: MappedListing | null = useMemo(() => {
    if (selectedProperty && String(selectedProperty.id) === String(propertyId)) {
      return selectedProperty;
    }
    if (listings && listings.length > 0) {
      return listings.find((l) => String(l.id) === String(propertyId)) || null;
    }
    return null;
  }, [selectedProperty, listings, propertyId]);
  const categoryName = property?.categoryName;
  const { t } = useTranslations();

  const router = useRouter();
  const insets = useSafeAreaInsets();

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

  // Always reset form and local dates on mount
  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    if (success) {
      setShowConfirmation(true);
      reset();
    }
    if (error) {
      Alert.alert(t(L10n.booking.bookingFailed), error);
      reset();
    }
  }, [success, error, setShowConfirmation, reset]);

  const handleSubmit = useCallback(() => {
    if (!form.name || !form.surname || !form.email || !form.phoneNumber) {
      Alert.alert(t(L10n.booking.pleaseFillAllFields));
      return;
    }
    if (!localStartDate) {
      Alert.alert(t(L10n.booking.pleaseSelectDates));
      return;
    }
    // Only require endDate for apartments
    const isApartment = isApartmentCategory(categoryName);
    if (isApartment && !localEndDate) {
      Alert.alert(t(L10n.booking.pleaseSelectDates));
      return;
    }
    if (!propertyDocumentId) {
      Alert.alert(t(L10n.booking.propertyDocumentMissing));
      return;
    }
    book({
      ...form,
      startDate: localStartDate,
      endDate: isApartment ? localEndDate : null,
      listing: propertyDocumentId,
    });
  }, [form, localStartDate, localEndDate, t, categoryName, propertyDocumentId, book]);

  const handleClose = useCallback(() => {
    setShowConfirmation(false);
    resetForm();
    router.back();
  }, [setShowConfirmation, resetForm, router]);

  const handleSaveBookingData = useCallback(async () => {
    if (!confirmationRef.current) {
      Alert.alert(t(L10n.booking.errorSaving), t(L10n.booking.failedToSave));
      return;
    }
    setIsSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t(L10n.booking.permissionDenied), t(L10n.booking.permissionRequired));
        setIsSaving(false);
        return;
      }
      await new Promise(res => setTimeout(res, 100));
      const uri = await captureRef(confirmationRef, {
        format: 'png',
        quality: 1,
      });
      await MediaLibrary.createAssetAsync(uri);
      Alert.alert(t(L10n.booking.success), t(L10n.booking.confirmationSaved));
    } catch (error) {
      console.error('Error saving booking confirmation image:', error);
      Alert.alert(t(L10n.booking.errorSaving), t(L10n.booking.failedToSave));
    } finally {
      setIsSaving(false);
    }
  }, [confirmationRef, t, setIsSaving]);

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
  title={showConfirmation ? t(L10n.booking.bookingConfirmed) : undefined}
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
              <Text style={bookingStyles.confirmationTitle}>{t(L10n.booking.weReceived)}</Text>
              <Text style={bookingStyles.confirmationSubtitle}>{t(L10n.booking.hereAreDetails)}</Text>
              <BookingConfirmationDetails
                propertyTitle={propertyTitle}
                form={form}
                localStartDate={localStartDate}
                localEndDate={localEndDate}
                categoryName={categoryName}
                t={t}
              />
            </View>
            <View style={bookingStyles.confirmationButtons}>
              <TouchableOpacity style={bookingStyles.saveButton} onPress={handleSaveBookingData} disabled={isSaving}>
                {isSaving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <ThemedText style={bookingStyles.saveButtonText}>{t(L10n.booking.saveConfirmation)}</ThemedText>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={bookingStyles.doneButton} onPress={handleClose}>
                <ThemedText style={bookingStyles.doneButtonText}>{t(L10n.booking.done)}</ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <BookingFormSection
              form={form}
              setForm={setForm}
              localStartDate={localStartDate}
              setLocalStartDate={setLocalStartDate}
              localEndDate={localEndDate}
              setLocalEndDate={setLocalEndDate}
              t={t}
              propertyTitle={propertyTitle}
              BOOKING_DATES_HINT={BOOKING_DATES_HINT}
              categoryName={categoryName}
              loading={loading}
              handleSubmit={handleSubmit}
              router={router}
            />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
