import { goToExplore } from '@/services/navigationService';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeBottomCards = React.memo(() => {
  // Hardcoded mock card for bottom section
  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.leftCard}
          onPress={() => goToExplore('Apartments')}
        >
          <Text style={styles.leftTitle}>Find a Studio Apartment</Text>
          <Text style={styles.leftSubtitle}>from €900/mo</Text>
        </TouchableOpacity>
        <View style={styles.rightCard}>
          <Text style={styles.sponsor}>sponsor</Text>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2' }} style={styles.scooterImg} />
          <Text style={styles.rightText}>there is more to EXPLORE</Text>
        </View>
      </View>
    </View>
  );
});

export { HomeBottomCards };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  leftCard: {
    flex: 2,
    backgroundColor: '#6C4DF6',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    minHeight: 120,
  },
  leftTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  leftSubtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 14,
  },
  rightCard: {
    flex: 1,
    backgroundColor: '#f3edff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 170,
    padding: 8,
  },
  sponsor: {
    color: '#6C4DF6',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  scooterImg: {
    width: 60,
    height: 100,
    borderRadius: 12,
  },
  rightText: {
    color: '#6C4DF6',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
