import { listingsByCategory } from '@/constants/mockListings';
import { goToExplore } from '@/services/navigationService';
import { useCategoryStore } from '@/stores/useCategoryStore';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeBottomCards = React.memo(() => {
  const category = useCategoryStore((state) => state.category);
  const listings = listingsByCategory[category as keyof typeof listingsByCategory] || [];
  if (!listings.length) return null;
  return (
    <View>
      {listings.map((item) => (
        <View style={styles.row} key={item.id}>
          <TouchableOpacity
            style={styles.leftCard}
            onPress={() => goToExplore(category)}
          >
            <Text style={styles.leftTitle}>{item.title}</Text>
            <Text style={styles.leftSubtitle}>{item.price}</Text>
          </TouchableOpacity>
          <View style={styles.rightCard}>
            <Text style={styles.sponsor}>sponsor</Text>
            <Image source={{ uri: item.image }} style={styles.scooterImg} />
            <Text style={styles.rightText}>there is more to EXPLORE</Text>
          </View>
        </View>
      ))}
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
