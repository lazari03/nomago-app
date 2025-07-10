import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeDateBar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#6C4DF6" />
      </TouchableOpacity>
      <View style={styles.dateSection}>
        <Text style={styles.chooseText}>Choose</Text>
        <Text style={styles.datesText}>Your Dates</Text>
        <Ionicons name="calendar" size={22} color="#6C4DF6" style={{ marginLeft: 4 }} />
        <Ionicons name="checkmark-circle" size={18} color="#00FFB0" style={{ marginLeft: -8, marginTop: 2 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  backButton: {
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 6,
    marginRight: 8,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chooseText: {
    color: '#888',
    fontWeight: '400',
    marginRight: 2,
  },
  datesText: {
    fontWeight: 'bold',
    color: '#222',
    marginRight: 2,
  },
});
