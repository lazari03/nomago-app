import { ThemedText } from '@/components/ThemedText';
import { IS_ANDROID, IS_WEB, PLATFORM_STYLES } from '@/constants/Platform';
import { useBookingStore } from '@/stores/useBookingStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';

export const screenOptions = {
  headerShown: false,
};

export default function BookingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { propertyId, propertyDocumentId, propertyTitle } = useLocalSearchParams<{
    propertyId: string;
    propertyDocumentId: string;
    propertyTitle: string;
  }>();
  
  const { fromDate, toDate } = useDateFilterStore();
  const [form, setForm] = useState({ name: '', surname: '', email: '', phoneNumber: '' });
  const [localStartDate, setLocalStartDate] = useState<Date | null>(fromDate || null);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(toDate || null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
  }, [success, error]);

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
    setForm({ name: '', surname: '', email: '', phoneNumber: '' });
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

      // Small delay to ensure the view is fully rendered
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
    <View style={styles.fullScreenContainer}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
        translucent={IS_ANDROID} 
        hidden={false}
      />
      {/* Header */}
      <View style={[styles.header, { paddingTop: IS_ANDROID ? insets.top : insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6C4DF6" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          {showConfirmation ? 'Booking Confirmed' : 'Book Property'}
        </ThemedText>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView 
        behavior={PLATFORM_STYLES.keyboardBehavior} 
        style={styles.content}
      >
        {showConfirmation ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.confirmationContainer}>
              <View
                ref={confirmationRef}
                collapsable={false}
                style={styles.confirmationCard}
              >
                <View style={styles.confirmationHeader}>
                  <Text style={styles.brandText}>NOMAGO</Text>
                  <Text style={styles.confirmationDate}>
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
                <View style={styles.successIcon}>
                  <Text style={styles.successIconText}>✓</Text>
                </View>
                <Text style={styles.confirmationTitle}>
                  We received your booking!
                </Text>
                <Text style={styles.confirmationSubtitle}>
                  Here are your booking details:
                </Text>

                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Property:</Text>
                    <Text style={styles.detailValue}>{propertyTitle}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Name:</Text>
                    <Text style={styles.detailValue}>{form.name} {form.surname}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailValue}>{form.email}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Phone:</Text>
                    <Text style={styles.detailValue}>{form.phoneNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Check-in:</Text>
                    <Text style={styles.detailValue}>
                      {localStartDate?.toLocaleDateString() || 'Not selected'}
                    </Text>
                  </View>
                  <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.detailLabel}>Check-out:</Text>
                    <Text style={styles.detailValue}>
                      {localEndDate?.toLocaleDateString() || 'Not selected'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.confirmationButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveBookingData}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <ThemedText style={styles.saveButtonText}>Save Confirmation</ThemedText>
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
                  <ThemedText style={styles.doneButtonText}>Done</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.formBox}>
              <ThemedText style={styles.formTitle}>Book {propertyTitle}</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={form.name}
                onChangeText={text => setForm(f => ({ ...f, name: text }))}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <TextInput
                style={styles.input}
                placeholder="Surname"
                value={form.surname}
                onChangeText={text => setForm(f => ({ ...f, surname: text }))}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={text => setForm(f => ({ ...f, email: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChangeText={text => setForm(f => ({ ...f, phoneNumber: text }))}
                keyboardType="phone-pad"
                returnKeyType="done"
              />
              <View style={{ marginBottom: 16 }}>
                <ThemedText style={styles.formLabel}>Dates:</ThemedText>
                {(fromDate && toDate) ? (
                  <ThemedText style={styles.formValue}>
                    {fromDate ? fromDate.toLocaleDateString() : ''} - {toDate ? toDate.toLocaleDateString() : ''}
                  </ThemedText>
                ) : (
                  <View>
                    <ThemedText style={[styles.formValue, { color: '#666', fontStyle: 'italic', marginBottom: 12 }]}>
                      Please select your check-in and check-out dates
                    </ThemedText>
                    
                    {/* Check-in Date Button */}
                    <View style={{ marginBottom: 8 }}>
                      <ThemedText style={[styles.formLabel, { marginBottom: 4 }]}>Check-in:</ThemedText>
                      {IS_WEB ? (
                        <input
                          type="date"
                          style={{ fontSize: 16, padding: 8, borderRadius: 6, border: '1px solid #eee', width: '100%' }}
                          value={localStartDate ? localStartDate.toISOString().split('T')[0] : ''}
                          onChange={e => {
                            const val = e.target.value;
                            setLocalStartDate(val ? new Date(val) : null);
                          }}
                        />
                      ) : (
                        <TouchableOpacity 
                          style={styles.dateButton}
                          onPress={() => setShowStartDatePicker(true)}
                        >
                          <ThemedText style={styles.dateButtonText}>
                            {localStartDate ? localStartDate.toLocaleDateString() : 'Select check-in date'}
                          </ThemedText>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Check-out Date Button */}
                    <View style={{ marginBottom: 8 }}>
                      <ThemedText style={[styles.formLabel, { marginBottom: 4 }]}>Check-out:</ThemedText>
                      {IS_WEB ? (
                        <input
                          type="date"
                          style={{ fontSize: 16, padding: 8, borderRadius: 6, border: '1px solid #eee', width: '100%' }}
                          value={localEndDate ? localEndDate.toISOString().split('T')[0] : ''}
                          onChange={e => {
                            const val = e.target.value;
                            setLocalEndDate(val ? new Date(val) : null);
                          }}
                        />
                      ) : (
                        <TouchableOpacity 
                          style={styles.dateButton}
                          onPress={() => setShowEndDatePicker(true)}
                        >
                          <ThemedText style={styles.dateButtonText}>
                            {localEndDate ? localEndDate.toLocaleDateString() : 'Select check-out date'}
                          </ThemedText>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Date Pickers (only show when button is pressed) */}
                    {!IS_WEB && showStartDatePicker && (
                      <DateTimePicker
                        value={localStartDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                          setShowStartDatePicker(false);
                          if (selectedDate) setLocalStartDate(selectedDate);
                        }}
                      />
                    )}
                    
                    {!IS_WEB && showEndDatePicker && (
                      <DateTimePicker
                        value={localEndDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                          setShowEndDatePicker(false);
                          if (selectedDate) setLocalEndDate(selectedDate);
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} disabled={loading}>
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.submitButtonText}>Book Now</ThemedText>}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    minHeight: 80,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  formBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C4DF6',
    marginBottom: 2,
  },
  formValue: {
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#faf9ff',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#faf9ff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 32,
    paddingTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#5A4FCF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmationContainer: {
    flex: 1,
    padding: 24,
  },
  confirmationCard: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  confirmationHeader: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#5A4FCF',
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A4FCF',
    letterSpacing: 2,
  },
  confirmationDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  bookingDetails: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#212529',
    flex: 2,
    textAlign: 'right',
  },
  confirmationButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#5A4FCF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
