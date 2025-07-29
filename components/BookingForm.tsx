import { useBookingStore } from '@/stores/useBookingStore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface BookingFormProps {
  visible: boolean;
  onClose: () => void;
  propertyTitle: string;
}


const BookingForm: React.FC<BookingFormProps> = ({ visible, onClose, propertyTitle }) => {
  const [form, setForm] = useState({ name: '', surname: '', email: '', phoneNumber: '' });
  const { loading, error, success, book, reset } = useBookingStore();

  useEffect(() => {
    if (success) {
      Alert.alert('Booking sent!', 'Your booking request has been submitted.');
      setForm({ name: '', surname: '', email: '', phoneNumber: '' });
      reset();
      onClose();
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
    book({ ...form });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
              <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={loading}>
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.submitButtonText}>Send</ThemedText>}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  cancelButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#6C4DF6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#5A4FCF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookingForm;
