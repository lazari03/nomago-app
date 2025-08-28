import { DateRangePicker } from '@/components/DateRangePicker';
import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BOOKING_DATES_HINT } from '@/constants/bookingFormStrings';
import Colors from '@/constants/Colors';
import { IS_ANDROID, PLATFORM_STYLES } from '@/constants/Platform';
import { useTranslations } from '@/hooks/useTranslation';
import { useBookingStore } from '@/stores/useBookingStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { L10n } from '@/utils/translationHelper';
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
  let property = selectedProperty && String(selectedProperty.id) === String(propertyId)
    ? selectedProperty
    : null;
  if (!property && listings && listings.length > 0) {
    property = listings.find((l) => String(l.id) === String(propertyId)) || null;
  }
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

  const handleSubmit = () => {
    if (!form.name || !form.surname || !form.email || !form.phoneNumber) {
      Alert.alert(t(L10n.booking.pleaseFillAllFields));
      return;
    }
    if (!localStartDate) {
      Alert.alert(t(L10n.booking.pleaseSelectDates));
      return;
    }
    // Only require endDate for apartments
    const isApartment = categoryName === 'apartment' || categoryName === 'apartments';
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
  };

  const handleClose = () => {
    setShowConfirmation(false);
    resetForm();
    router.back();
  };

  const handleSaveBookingData = async () => {
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
                { (categoryName === 'apartment' || categoryName === 'apartments') ? (
                  <View style={[bookingStyles.detailRow, { borderBottomWidth: 0 }]}> 
                    <Text style={bookingStyles.detailLabel}>{t(L10n.booking.checkOut)}</Text>
                    <Text style={bookingStyles.detailValue}>{localEndDate?.toLocaleDateString() || t(L10n.booking.notSelected)}</Text>
                  </View>
                ) : (
                  <View style={[bookingStyles.detailRow, { borderBottomWidth: 0 }]}> 
                    <Text style={bookingStyles.detailLabel}>{t(L10n.booking.time)}</Text>
                    <Text style={bookingStyles.detailValue}>{localStartDate ? localStartDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : t(L10n.booking.notSelected)}</Text>
                  </View>
                )}
              </View>
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
          <ScrollView contentContainerStyle={bookingStyles.formBox}>
            <ThemedText style={bookingStyles.formTitle}>{t(L10n.booking.bookProperty, { propertyTitle })}</ThemedText>
            <View style={bookingStyles.inputRow}>
        <TextInput
          style={[bookingStyles.inputHalf, bookingStyles.inputLeft]}
          placeholder={t(L10n.booking.name)}
           placeholderTextColor="#888"
          value={form.name}
          onChangeText={text => setForm({ name: text })}
          autoCapitalize="words"
          returnKeyType="next"
        />
        <TextInput
          style={[bookingStyles.inputHalf, bookingStyles.inputRight]}
          placeholder={t(L10n.booking.surname)}
           placeholderTextColor="#888"
          value={form.surname}
          onChangeText={text => setForm({ surname: text })}
          autoCapitalize="words"
          returnKeyType="next"
        />
            </View>
              <TextInput
                style={bookingStyles.input}
                placeholder={t(L10n.booking.email)}
                 placeholderTextColor="#888"
                value={form.email}
                onChangeText={text => setForm({ email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TextInput
                style={bookingStyles.input}
                placeholder={t(L10n.booking.phoneNumber)}
                 placeholderTextColor="#888"
                value={form.phoneNumber}
                onChangeText={text => setForm({ phoneNumber: text })}
                keyboardType="phone-pad"
                returnKeyType="done"
              />
            <View style={bookingStyles.datesSection}>
              <ThemedText style={bookingStyles.formLabel}>{t(L10n.booking.dates)}</ThemedText>
              <ThemedText style={bookingStyles.formValueHint}>{BOOKING_DATES_HINT}</ThemedText>
              <DateRangePicker
                startDate={localStartDate}
                endDate={localEndDate}
                onStartDateChange={setLocalStartDate}
                onEndDateChange={setLocalEndDate}
                categoryName={categoryName}
              />
            </View>
            <View style={bookingStyles.buttonContainer}>
              <TouchableOpacity style={bookingStyles.cancelButton} onPress={() => router.back()} disabled={loading}>
                <ThemedText style={bookingStyles.cancelButtonText}>{t(L10n.booking.cancel)}</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={bookingStyles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={bookingStyles.submitButtonText}>{t(L10n.booking.bookNow)}</ThemedText>}
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
