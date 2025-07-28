import { HomeDateBar } from '@/components/HomeDateBar';
import { HomeTopBar } from '@/components/HomeTopBar';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { ThemedView } from '@/components/ThemedView';
import { listingsByCategory } from '@/constants/mockListings';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';


export default function ExplorePage() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { category } = useLocalSearchParams<{ category?: string }>();

  type CategoryKey = keyof typeof listingsByCategory;
  const validCategory = (category && Object.keys(listingsByCategory).includes(category)) ? (category as CategoryKey) : undefined;
  const listings = validCategory ? listingsByCategory[validCategory] : [];


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HomeTopBar />
      <HomeDateBar />
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
          {listings.length > 0 ? (
            listings.map((item: { id: string; title: string; image: string; price: string }) => (
              <PropertyCard
                key={item.id}
                id={item.id}
                title={item.title}
                location={category || ''}
                price={item.price}
                rating={4.5}
                image={item.image}
                amenities={{ bedType: 'King Bed', bathroom: '2 Bathrooms', wifi: true, breakfast: true }}
                onPress={() => {
                  // Use the correct dynamic route navigation for expo-router
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
