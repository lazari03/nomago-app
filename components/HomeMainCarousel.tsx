import { ThemeImage } from '@/components/ui/ThemeImage';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeMainCarousel() {
  const { currentCategoryListings, listings, categoryLoading, fetchListingsByCategory } = useListingsStore();
  const { category } = useCategoryStore();

  // Fetch listings for the selected category when it changes
  useEffect(() => {
    if (category) {
      fetchListingsByCategory(category);
    }
  }, [category, fetchListingsByCategory]);

  if (categoryLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6C4DF6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Prefer category listings, fallback to all listings
  const displayList = (currentCategoryListings && currentCategoryListings.length > 0)
    ? currentCategoryListings
    : listings;

  if (!displayList || displayList.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No listings available.</Text>
      </View>
    );
  }

  // Show the first listing (can be replaced with a FlatList/Carousel for multiple)
  const displayListing = displayList[0];

  return (
    <View style={styles.container}>
          <ThemeImage
            uri={displayListing.imageUrls?.[0] ?? ''}
            width={500}
            height={500}
            quality={60}
            style={styles.image}
          />
      
      {/* Gradient overlay covering bottom 40% */}
      <LinearGradient
        colors={['transparent', 'rgba(108,77,246,0.8)']}
        style={styles.gradientOverlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{displayListing.title}</Text>
        <Text style={styles.subtitle}>{displayListing.subtitle}</Text>
        {displayListing.price && (
          <Text style={styles.price}>${displayListing.price}</Text>
        )}
        <TouchableOpacity style={styles.reserveBtnNearText}>
          <Text style={styles.reserveText}>BOOK NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#222',
    height: 500,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 28,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  leftArrow: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -24,
    backgroundColor: '#8888',
    borderRadius: 20,
    padding: 4,
    zIndex: 2,
  },
  rightArrow: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -24,
    backgroundColor: '#8888',
    borderRadius: 20,
    padding: 4,
    zIndex: 2,
  },
  reserveBtnNearText: {
    backgroundColor: '#00FFB0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  reserveText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    alignItems: 'flex-end',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'right',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 15,
    marginTop: 2,
    textAlign: 'right',
  },
  price: {
    color: '#00FFB0',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
    textAlign: 'right',
  },
});
