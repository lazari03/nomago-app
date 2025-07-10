import { listingsByCategory } from '@/constants/mockListings';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

type CategoryKey = keyof typeof listingsByCategory;

export default function ExplorePage() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const validCategory = (category && Object.keys(listingsByCategory).includes(category)) ? (category as CategoryKey) : undefined;
  const listings = validCategory ? listingsByCategory[validCategory] : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore {category || 'All'}</Text>
      <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>
        {listings.length > 0 ? (
          listings.map((item: { id: string; title: string; image: string; price: string }) => (
            <View key={item.id} style={{ marginVertical: 12, alignItems: 'center' }}>
              <Image source={{ uri: item.image }} style={{ width: 220, height: 120, borderRadius: 12 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>{item.title}</Text>
              <Text style={{ color: '#666', marginTop: 2 }}>{item.price}</Text>
            </View>
          ))
        ) : (
          <Text style={{ marginTop: 24 }}>No listings found for {category}.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
