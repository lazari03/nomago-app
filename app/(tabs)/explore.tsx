import { HeaderFilter } from '@/components/HeaderFilter';
import { HomeTabBar } from '@/components/HomeTabBar';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { ThemedView } from '@/components/ThemedView';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import React, { useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';



export default function ExplorePage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { category, categories } = useCategoryStore();
  const { currentCategoryListings, categoryLoading, fetchListingsByCategory, setSelectedProperty } = useListingsStore();

  React.useEffect(() => {
    if (category) {
      fetchListingsByCategory(category);
    }
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderFilter />  
        <HomeTabBar />
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: 0, paddingHorizontal: 16, paddingBottom: 32 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Text style={styles.categoryTitle}>Explore {category}</Text>
          <ThemedView style={styles.stepContainer}>
            {categoryLoading ? (
              <Text>Loading...</Text>
            ) : currentCategoryListings.length > 0 ? (
              currentCategoryListings.map((item) => (
                <PropertyCard
                  key={item.id}
                  id={String(item.id)}
                  title={item.title}
                  location={category || ''}
                  price={item.price !== undefined ? String(item.price) : ''}
                  rating={4.5}
                  image={item.imageUrl || ''}
                  amenities={{ bedType: 'King Bed', bathroom: '2 Bathrooms', wifi: true, breakfast: true }}
                  onPress={() => {
                    setSelectedProperty(item);
                    const { router } = require('expo-router');
                    router.push({ pathname: '/property/[id]', params: { id: item.id } });
                  }}
                />
              ))
            ) : (
              <Text>No listings found for {category}.</Text>
            )}
          </ThemedView>
        </Animated.ScrollView>
      </SafeAreaView>
      <HomeTabBar/>
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
   tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});
