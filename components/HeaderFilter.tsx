import { useCategoryStore } from '@/stores/useCategoryStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HeaderFilter() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const { fromDate, toDate, setDates } = useDateFilterStore();
  const { category } = useCategoryStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#6C4DF6" />
      </TouchableOpacity>
      <Text style={styles.categoryTitle}>Explore {category}</Text>
      <View style={styles.rightHeader}>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.filterButton}>
          <Ionicons name="filter" size={22} color="#6C4DF6" />
        </TouchableOpacity>
      </View>
      {showModal && (
        <Modal
          visible={showModal}
          animationType="none"
          transparent
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.availabilityText}>Filter by Date</Text>
              <View style={styles.dateFieldRowCentered}>
                <Text style={styles.dateFieldLabel}>From:</Text>
                  <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) setDates(selectedDate, toDate);
                    }}
                  />
              </View>
              <View style={styles.dateFieldRowCentered}>
                <Text style={styles.dateFieldLabel}>To:</Text>
                  <DateTimePicker
                    value={toDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) setDates(fromDate, selectedDate);
                    }}
                  />
              </View>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateFieldRowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  dateFieldWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
  },
  dateFieldButtonCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f4ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0dfff',
    shadowColor: '#6C4DF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    width: 150,
    justifyContent: 'center',
  },
  inlinePickerPopoverCompact: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
    width: 150,
    alignSelf: 'center',
  },
  inlinePickerContainer: {
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  pickerBottomOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pickerBottomContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
    height: 56,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  headerAvailabilityText: {
    color: '#6C4DF6',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  filterButton: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  dateFieldLabel: {
    fontWeight: '600',
    color: '#6C4DF6',
    fontSize: 15,
    width: 50,
  },
  dateFieldButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f4ff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0dfff',
    shadowColor: '#6C4DF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  inlinePickerPopover: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  dateFieldText: {
    color: '#6C4DF6',
    fontWeight: '600',
    fontSize: 15,
  },
  applyButton: {
    marginTop: 16,
    backgroundColor: '#6C4DF6',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  pickerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pickerContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  pickerLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#6C4DF6',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#6C4DF6',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
});
