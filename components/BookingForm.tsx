import { PLATFORM_STYLES } from '@/constants/Platform';

import { useTranslations } from '@/hooks/useTranslation';
import { useBookingStore } from '@/stores/useBookingStore';
import { L10n } from '@/utils/translationHelper';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { DateRangePicker } from './DateRangePicker';
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
  const { t } = useTranslations();
  const [localStartDate, setLocalStartDate] = useState<Date | null>(startDate || null);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(endDate || null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate || null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate || null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const confirmationRef = useRef<View>(null);
  const { loading, error, success, book, reset } = useBookingStore();

  // Debug log to see if modal opens
  useEffect(() => {
    console.log('BookingForm visible state changed:', visible);
  }, [visible]);

  useEffect(() => {
    if (success) {
      setShowConfirmation(true);
      reset();
    }
    if (error) {
      Alert.alert(t(L10n.booking.bookingFailed), error);
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

      // Small delay to ensure the view is fully rendered
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
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      transparent={false}
      hardwareAccelerated={true}
    >
      <StatusBar hidden={false} barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView 
        behavior={PLATFORM_STYLES.keyboardBehavior} 
        style={styles.modalContainer}
      >
          {showConfirmation ? (
            <View style={styles.confirmationFullScreen}>
              <View style={styles.header}>
                <View style={styles.closeButton} />
                <ThemedText style={styles.headerTitle}>{t(L10n.booking.bookingConfirmed)}</ThemedText>
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
                  {/* Removed the green circle success icon as requested */}
                  <Text style={[styles.successIconText, {alignSelf: 'center', fontSize: 40, color: '#4CAF50', marginBottom: 24}]}>✓</Text>
                  <Text style={styles.confirmationTitle}>
                    {t(L10n.booking.weReceived)}
                  </Text>
                  <Text style={styles.confirmationSubtitle}>
                    {t(L10n.booking.hereAreDetails)}
                  </Text>

                  <View style={styles.bookingDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{t(L10n.booking.property)}</Text>
                      <Text style={styles.detailValue}>{propertyTitle}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{t(L10n.booking.name)}</Text>
                      <Text style={styles.detailValue}>{form.name} {form.surname}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{t(L10n.booking.email)}</Text>
                      <Text style={styles.detailValue}>{form.email}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{t(L10n.booking.phoneNumber)}</Text>
                      <Text style={styles.detailValue}>{form.phoneNumber}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{t(L10n.booking.checkIn)}</Text>
                      <Text style={styles.detailValue}>
                        {localStartDate?.toLocaleDateString() || t(L10n.booking.notSelected)}
                      </Text>
                    </View>
                    <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                      <Text style={styles.detailLabel}>{t(L10n.booking.checkOut)}</Text>
                      <Text style={styles.detailValue}>
                        {localEndDate?.toLocaleDateString() || t(L10n.booking.notSelected)}
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
                    <ThemedText style={styles.saveButtonText}>{t(L10n.booking.saveConfirmation)}</ThemedText>
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
                  <ThemedText style={styles.doneButtonText}>{t(L10n.booking.done)}</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.formBox}>
                <View style={styles.header}>
                  <View style={styles.closeButton} />
                  <ThemedText style={styles.headerTitle}>{t(L10n.booking.startBooking)}</ThemedText>
                  <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <ThemedText style={styles.closeButtonText}>✕</ThemedText>
                  </TouchableOpacity>
                </View>
                <ThemedText style={styles.formTitle}>{t(L10n.booking.bookProperty, { propertyTitle })}</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder={t(L10n.booking.name)}
                  value={form.name}
                  onChangeText={text => setForm(f => ({ ...f, name: text }))}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder={t(L10n.booking.surname)}
                  value={form.surname}
                  onChangeText={text => setForm(f => ({ ...f, surname: text }))}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder={t(L10n.booking.email)}
                  value={form.email}
                  onChangeText={text => setForm(f => ({ ...f, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder={t(L10n.booking.phoneNumber)}
                  value={form.phoneNumber}
                  onChangeText={text => setForm(f => ({ ...f, phoneNumber: text }))}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                />
                <View style={{ marginBottom: 16 }}>
                  <ThemedText style={styles.formLabel}>{t(L10n.booking.dates)}</ThemedText>
                  <DateRangePicker
                    startDate={localStartDate}
                    endDate={localEndDate}
                    onStartDateChange={setLocalStartDate}
                    onEndDateChange={setLocalEndDate}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={loading}>
                    <ThemedText style={styles.cancelButtonText}>{t(L10n.booking.cancel)}</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.submitButtonText}>{t(L10n.booking.bookNow)}</ThemedText>}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pickerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pickerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  pickerLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#6C4DF6',
    marginBottom: 8,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: PLATFORM_STYLES.headerPadding,
  },
  formBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 40,
    minHeight: Platform.OS === 'android' ? 600 : undefined, // Prevent Android cut-off
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
  // Removed successIcon style (green circle)
  successIconText: {
    fontSize: 40,
    color: '#4CAF50',
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
});
export default BookingForm;
