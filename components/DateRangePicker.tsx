import { IS_WEB } from '@/constants/Platform';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Platform, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [showStart, setShowStart] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);
  const [tempStart, setTempStart] = React.useState<Date | null>(startDate || null);
  const [tempEnd, setTempEnd] = React.useState<Date | null>(endDate || null);

  // Keep tempStart/tempEnd in sync with props when changed externally
  React.useEffect(() => {
    if (!showStart) setTempStart(startDate || null);
  }, [startDate, showStart]);
  React.useEffect(() => {
    if (!showEnd) setTempEnd(endDate || null);
  }, [endDate, showEnd]);

  // Android-specific state for showing pickers
  const [showAndroidStart, setShowAndroidStart] = React.useState(false);
  const [showAndroidEnd, setShowAndroidEnd] = React.useState(false);

  return (
    <View>
      {/* Check-in */}
      <ThemedText style={styles.label}>Check-in:</ThemedText>
      {IS_WEB ? (
        <input
          type="date"
          style={styles.inputWeb as React.CSSProperties}
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={e => {
            const val = e.target.value;
            onStartDateChange(val ? new Date(val) : null);
          }}
        />
      ) : Platform.OS === 'android' ? (
        <>
          <TouchableOpacity style={styles.button} onPress={() => setShowAndroidStart(true)}>
            <ThemedText style={styles.buttonText}>
              {startDate ? startDate.toLocaleDateString() : 'Select check-in date'}
            </ThemedText>
          </TouchableOpacity>
          {showAndroidStart && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setShowAndroidStart(false);
                if (event.type === 'set' && selectedDate) onStartDateChange(selectedDate);
              }}
            />
          )}
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={() => {
            setTempStart(startDate || new Date());
            setShowStart(true);
            setShowEnd(false);
          }}>
            <ThemedText style={styles.buttonText}>
              {startDate ? startDate.toLocaleDateString() : 'Select check-in date'}
            </ThemedText>
          </TouchableOpacity>
          <Modal
            visible={showStart}
            animationType="none"
            transparent
            onRequestClose={() => setShowStart(false)}
          >
            <Pressable style={styles.pickerOverlay} onPress={() => setShowStart(false)} />
            <View style={styles.pickerContent}>
              <DateTimePicker
                value={tempStart || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  if (selectedDate) setTempStart(selectedDate);
                }}
                style={Platform.OS === 'ios' ? { width: '100%' } : {}}
              />
              <TouchableOpacity style={styles.doneButton} onPress={() => {
                setShowStart(false);
                if (tempStart) onStartDateChange(tempStart);
              }}>
                <ThemedText style={styles.doneButtonText}>Done</ThemedText>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
      {/* Check-out */}
      <ThemedText style={[styles.label, { marginTop: 12 }]}>Check-out:</ThemedText>
      {IS_WEB ? (
        <input
          type="date"
          style={styles.inputWeb as React.CSSProperties}
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          min={startDate ? startDate.toISOString().split('T')[0] : undefined}
          onChange={e => {
            const val = e.target.value;
            onEndDateChange(val ? new Date(val) : null);
          }}
        />
      ) : Platform.OS === 'android' ? (
        <>
          <TouchableOpacity style={styles.button} onPress={() => setShowAndroidEnd(true)}>
            <ThemedText style={styles.buttonText}>
              {endDate ? endDate.toLocaleDateString() : 'Select check-out date'}
            </ThemedText>
          </TouchableOpacity>
          {showAndroidEnd && (
            <DateTimePicker
              value={endDate || (startDate || new Date())}
              mode="date"
              display="default"
              minimumDate={startDate || undefined}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setShowAndroidEnd(false);
                if (event.type === 'set' && selectedDate) onEndDateChange(selectedDate);
              }}
            />
          )}
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={() => {
            setTempEnd(endDate || (startDate || new Date()));
            setShowEnd(true);
            setShowStart(false);
          }}>
            <ThemedText style={styles.buttonText}>
              {endDate ? endDate.toLocaleDateString() : 'Select check-out date'}
            </ThemedText>
          </TouchableOpacity>
          <Modal
            visible={showEnd}
            animationType="none"
            transparent
            onRequestClose={() => setShowEnd(false)}
          >
            <Pressable style={styles.pickerOverlay} onPress={() => setShowEnd(false)} />
            <View style={styles.pickerContent}>
              <DateTimePicker
                value={tempEnd || (startDate || new Date())}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                minimumDate={startDate || undefined}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  if (selectedDate) setTempEnd(selectedDate);
                }}
                style={Platform.OS === 'ios' ? { width: '100%' } : {}}
              />
              <TouchableOpacity style={styles.doneButton} onPress={() => {
                setShowEnd(false);
                if (tempEnd) onEndDateChange(tempEnd);
              }}>
                <ThemedText style={styles.doneButtonText}>Done</ThemedText>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C4DF6',
    marginBottom: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#faf9ff',
    marginBottom: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  inputWeb: {
    fontSize: 16,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
    marginBottom: 4,
  },
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
  doneButton: {
    marginTop: 16,
    backgroundColor: '#6C4DF6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
