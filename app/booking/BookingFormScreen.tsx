import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BOOKING_DATES_HINT } from '@/constants/bookingFormStrings';
import { IS_ANDROID, IS_IOS, IS_WEB, PLATFORM_STYLES } from '@/constants/Platform';
import { useTranslations } from '@/hooks/useTranslation';
import { useBookingStore } from '@/stores/useBookingStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { L10n } from '@/utils/translationHelper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StatusBar, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bookingStyles } from './bookingStyles';

export default function BookingFormScreen() {
  const { t } = useTranslations();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { propertyId, propertyDocumentId, propertyTitle } = useLocalSearchParams();
  const { fromDate, toDate } = useDateFilterStore();
  const {
    form, setForm,
    localStartDate, setLocalStartDate,
    localEndDate, setLocalEndDate,
    showStartDatePicker, setShowStartDatePicker,
    showEndDatePicker, setShowEndDatePicker,
    loading, book, resetForm
  } = useBookingStore();

  const handleSubmit = () => {
    if (!form.name || !form.surname || !form.email || !form.phoneNumber) {
      Alert.alert(t(L10n.booking.pleaseFillAllFields));
      return;
    }
    if (!localStartDate || !localEndDate) {
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
      endDate: localEndDate,
      listing: Array.isArray(propertyDocumentId) ? propertyDocumentId[0] : propertyDocumentId,
    });
    router.push({ pathname: '/booking/BookingConfirmationScreen', params: { propertyTitle } });
  };

  return (
    <ThemedView style={bookingStyles.fullScreenContainer}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
        translucent={IS_ANDROID} 
        hidden={false}
      />
      <HeaderNavigation showBack />
      <KeyboardAvoidingView 
        behavior={PLATFORM_STYLES.keyboardBehavior} 
        style={bookingStyles.content}
      >
        <ScrollView contentContainerStyle={bookingStyles.formBox}>
          <ThemedText style={bookingStyles.formTitle}>{t(L10n.booking.bookProperty, { propertyTitle })}</ThemedText>
          <View style={bookingStyles.inputRow}>
            <TextInput
              style={[bookingStyles.inputHalf, bookingStyles.inputLeft]}
              placeholder={t(L10n.booking.name)}
              value={form.name}
              onChangeText={text => setForm({ name: text })}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <TextInput
              style={[bookingStyles.inputHalf, bookingStyles.inputRight]}
              placeholder={t(L10n.booking.surname)}
              value={form.surname}
              onChangeText={text => setForm({ surname: text })}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>
          <TextInput
            style={bookingStyles.input}
            placeholder={t(L10n.booking.email)}
            value={form.email}
            onChangeText={text => setForm({ email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            style={bookingStyles.input}
            placeholder={t(L10n.booking.phoneNumber)}
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
                <View style={bookingStyles.dateRow}>
                  <View style={bookingStyles.dateCol}>
                    <ThemedText style={bookingStyles.formLabel}>Check-in:</ThemedText>
                    {IS_WEB ? (
                      <input
                        type="date"
                        className="dateInputWeb"
                        value={localStartDate ? localStartDate.toISOString().split('T')[0] : ''}
                        onChange={e => {
                          const val = e.target.value;
                          setLocalStartDate(val ? new Date(val) : null);
                        }}
                      />
                    ) : (
                      <TouchableOpacity 
                        style={bookingStyles.dateButton}
                        onPress={() => {
                          setShowStartDatePicker(true);
                          setShowEndDatePicker(false);
                        }}
                      >
                        <ThemedText style={bookingStyles.dateButtonText}>
                          {localStartDate ? localStartDate.toLocaleDateString() : 'Select check-in date'}
                        </ThemedText>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={bookingStyles.dateCol}>
                    <ThemedText style={bookingStyles.formLabel}>Check-out:</ThemedText>
                    {IS_WEB ? (
                      <input
                        type="date"
                        className="dateInputWeb"
                        value={localEndDate ? localEndDate.toISOString().split('T')[0] : ''}
                        onChange={e => {
                          const val = e.target.value;
                          setLocalEndDate(val ? new Date(val) : null);
                        }}
                      />
                    ) : (
                      <TouchableOpacity 
                        style={bookingStyles.dateButton}
                        onPress={() => {
                          setShowEndDatePicker(true);
                          setShowStartDatePicker(false);
                        }}
                      >
                        <ThemedText style={bookingStyles.dateButtonText}>
                          {localEndDate ? localEndDate.toLocaleDateString() : 'Select check-out date'}
                        </ThemedText>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/* Date Pickers: Use react-native-modal-datetime-picker for iOS, DateTimePicker for Android */}
                {!IS_WEB && IS_IOS && (
                  <>
                    <DateTimePickerModal
                      isVisible={showStartDatePicker}
                      mode="date"
                      date={localStartDate || new Date()}
                      onConfirm={date => {
                        setLocalStartDate(date);
                        setShowStartDatePicker(false);
                      }}
                      onCancel={() => setShowStartDatePicker(false)}
                    />
                    <DateTimePickerModal
                      isVisible={showEndDatePicker}
                      mode="date"
                      date={localEndDate || new Date()}
                      onConfirm={date => {
                        setLocalEndDate(date);
                        setShowEndDatePicker(false);
                      }}
                      onCancel={() => setShowEndDatePicker(false)}
                    />
                  </>
                )}
                {!IS_WEB && IS_ANDROID && showStartDatePicker && (
                  <DateTimePicker
                    value={localStartDate || new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      setShowStartDatePicker(false);
                      if (event.type === 'set' && selectedDate) setLocalStartDate(selectedDate);
                    }}
                  />
                )}
                {!IS_WEB && IS_ANDROID && showEndDatePicker && (
                  <DateTimePicker
                    value={localEndDate || new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      setShowEndDatePicker(false);
                      if (event.type === 'set' && selectedDate) setLocalEndDate(selectedDate);
                    }}
                  />
                )}
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
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
