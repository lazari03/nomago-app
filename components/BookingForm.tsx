import { useBookingStore } from '@/stores/useBookingStore';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { ThemedText } from './ThemedText';

interface BookingFormProps {
  visible: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyId: number | string;
  propertyDocumentId: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ visible, onClose, propertyTitle, propertyId, propertyDocumentId, startDate, endDate }) => {
  const [form, setForm] = useState({ name: '', surname: '', email: '', phoneNumber: '' });
  const [localStartDate, setLocalStartDate] = useState<Date | null>(startDate || null);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(endDate || null);
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

  // If dates from filter change, update local state
  useEffect(() => {
    if (startDate) setLocalStartDate(startDate);
    if (endDate) setLocalEndDate(endDate);
  }, [startDate, endDate]);

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
    onClose();
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
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          {showConfirmation ? (
            <View style={styles.confirmationFullScreen}>
              <View style={styles.header}>
                <View style={styles.closeButton} />
                <ThemedText style={styles.headerTitle}>Booking Confirmed</ThemedText>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <ThemedText style={styles.closeButtonText}>✕</ThemedText>
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View
                  ref={confirmationRef}
                  collapsable={false}
                  style={styles.confirmationContainer}
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
              </ScrollView>

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
          ) : (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.formBox}>
                <View style={styles.header}>
                  <View style={styles.closeButton} />
                  <ThemedText style={styles.headerTitle}>Book Property</ThemedText>
                  <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <ThemedText style={styles.closeButtonText}>✕</ThemedText>
                  </TouchableOpacity>
                </View>
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
                  {(startDate && endDate) ? (
                    <ThemedText style={styles.formValue}>
                      {startDate ? startDate.toLocaleDateString() : ''} - {endDate ? endDate.toLocaleDateString() : ''}
                    </ThemedText>
                  ) : (
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <ThemedText style={styles.formLabel}>From:</ThemedText>
                        {Platform.OS === 'web' ? (
                          <input
                            type="date"
                            style={{ marginLeft: 8, fontSize: 16, padding: 4, borderRadius: 6, border: '1px solid #eee' }}
                            value={localStartDate ? localStartDate.toISOString().split('T')[0] : ''}
                            onChange={e => {
                              const val = e.target.value;
                              setLocalStartDate(val ? new Date(val) : null);
                            }}
                          />
                        ) : (
                          <DateTimePicker
                            value={localStartDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                              if (selectedDate) setLocalStartDate(selectedDate);
                            }}
                          />
                        )}
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ThemedText style={styles.formLabel}>To:</ThemedText>
                        {Platform.OS === 'web' ? (
                          <input
                            type="date"
                            style={{ marginLeft: 8, fontSize: 16, padding: 4, borderRadius: 6, border: '1px solid #eee' }}
                            value={localEndDate ? localEndDate.toISOString().split('T')[0] : ''}
                            onChange={e => {
                              const val = e.target.value;
                              setLocalEndDate(val ? new Date(val) : null);
                            }}
                          />
                        ) : (
                          <DateTimePicker
                            value={localEndDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                              if (selectedDate) setLocalEndDate(selectedDate);
                            }}
                          />
                        )}
                      </View>
                    </View>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={loading}>
                    <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.submitButtonText}>Send Booking</ThemedText>}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  modalOverlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
  },
  formBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
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
  confirmationFullScreen: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 40,
  },
  confirmationContainer: {
    width: 350,
    height: 600,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignSelf: 'center',
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
    marginBottom: 32,
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
export default BookingForm;
