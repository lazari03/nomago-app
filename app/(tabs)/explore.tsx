import { CategoriesComponent } from '@/components/CategoriesComponent/CategoriesComponent';
import { HomeHeader } from '@/components/HeaderComponent/HomeHeader';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { ThemedView } from '@/components/ThemedView';
import useCatalogStore from '@/stores/useCatalogStore';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface CatalogItem {
  id: number;
  name: string;
}

export default function ExplorePage() {
  const { category = 'Default Category' } = useLocalSearchParams();

  const { items, fetchCatalog } = useCatalogStore();
  const [filteredItems, setFilteredItems] = useState<CatalogItem[]>([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    const filtered = items.filter((item) => item.name.toLowerCase() === String(category).toLowerCase());
    setFilteredItems(filtered);
  }, [items, category]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.stickyHeader}>
        <HomeHeader />
      </View>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 140, paddingHorizontal: 16, paddingBottom: 32 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <ThemedView style={styles.titleContainer}>
          <CategoriesComponent />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PropertyCard
                key={item.id}
                id={item.id.toString()}
                title={item.name}
                location={Array.isArray(category) ? category[0] : category}
                price="$100"
                rating={4.5}
                image="https://via.placeholder.com/150"
                amenities={{ bedType: 'King Bed', bathroom: '2 Bathrooms', wifi: true, breakfast: true }}
              />
            ))
          ) : (
            <Text>No items found for {category}.</Text>
          )}
        </ThemedView>
        <Text style={styles.categoryTitle}>Explore {category}</Text>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
  },
  reactLogo: {
    height: 40,
    width: 140,
    resizeMode: 'contain',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
});
