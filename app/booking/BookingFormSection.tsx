import { DateRangePicker } from '@/components/DateRangePicker';
import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { bookingStyles } from './bookingStyles';

interface BookingFormSectionProps {
  form: { name: string; surname: string; email: string; phoneNumber: string };
  setForm: (payload: Partial<{ name: string; surname: string; email: string; phoneNumber: string }>) => void;
  localStartDate: Date | null;
  setLocalStartDate: (date: Date | null) => void;
  localEndDate: Date | null;
  setLocalEndDate: (date: Date | null) => void;
  t: (key: any, params?: any) => string;
  propertyTitle: string;
  BOOKING_DATES_HINT: string;
  categoryName?: string;
  loading: boolean;
  handleSubmit: () => void;
  router: any;
}

export const BookingFormSection: React.FC<BookingFormSectionProps> = ({
  form,
  setForm,
  localStartDate,
  setLocalStartDate,
  localEndDate,
  setLocalEndDate,
  t,
  propertyTitle,
  BOOKING_DATES_HINT,
  categoryName,
  loading,
  handleSubmit,
  router,
}) => (
  <View style={bookingStyles.formBox}>
    <Text style={bookingStyles.formTitle}>{t('booking.bookProperty', { propertyTitle })}</Text>
    <View style={bookingStyles.inputRow}>
      <TextInput
        style={[bookingStyles.inputHalf, bookingStyles.inputLeft]}
        placeholder={t('booking.name')}
        placeholderTextColor="#888"
        value={form.name}
        onChangeText={text => setForm({ name: text })}
        autoCapitalize="words"
        returnKeyType="next"
      />
      <TextInput
        style={[bookingStyles.inputHalf, bookingStyles.inputRight]}
        placeholder={t('booking.surname')}
        placeholderTextColor="#888"
        value={form.surname}
        onChangeText={text => setForm({ surname: text })}
        autoCapitalize="words"
        returnKeyType="next"
      />
    </View>
    <TextInput
      style={bookingStyles.input}
      placeholder={t('booking.email')}
      placeholderTextColor="#888"
      value={form.email}
      onChangeText={text => setForm({ email: text })}
      keyboardType="email-address"
      autoCapitalize="none"
      returnKeyType="next"
    />
    <TextInput
      style={bookingStyles.input}
      placeholder={t('booking.phoneNumber')}
      placeholderTextColor="#888"
      value={form.phoneNumber}
      onChangeText={text => setForm({ phoneNumber: text })}
      keyboardType="phone-pad"
      returnKeyType="done"
    />
    <View style={bookingStyles.datesSection}>
      <Text style={bookingStyles.formLabel}>{t('booking.dates')}</Text>
      <Text style={bookingStyles.formValueHint}>{BOOKING_DATES_HINT}</Text>
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
        <Text style={bookingStyles.cancelButtonText}>{t('booking.cancel')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={bookingStyles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={bookingStyles.submitButtonText}>{t('booking.bookNow')}</Text>}
      </TouchableOpacity>
    </View>
  </View>
);
