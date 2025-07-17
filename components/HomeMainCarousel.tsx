import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeMainCarousel() {
  const { category } = useCategoryStore();
  const { featuredListings, featuredLoading, fetchFeaturedListings, currentCategoryListings, fetchListingsByCategory, categoryLoading } = useListingsStore();

  // Fetch featured listings on mount
  React.useEffect(() => {
    fetchFeaturedListings();
  }, [fetchFeaturedListings]);

  // Fetch listings for current category
  React.useEffect(() => {
    if (category) {
      fetchListingsByCategory(category);
    }
  }, [category, fetchListingsByCategory]);

  // Fallback data for when no listings are available
  const fallbackData: Record<string, { image: string; title: string; subtitle: string }> = {
    Residences: {
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      title: 'Cozy Studio',
      subtitle: 'Art District',
    },
    Apartments: {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Modern Apartment',
      subtitle: 'City Center',
    },
    Transport: {
      image: 'https://images.unsplash.com/photo-1519985176271-ad4e1c2d8c27',
      title: 'Get a Ride',
      subtitle: 'Taxi Lux',
    },
    Restaurant: {
      image: 'https://images.unsplash.com/photo-1555992336-03a23c1f1c38',
      title: 'Fine Dining',
      subtitle: 'Gourmet Experience',
    },
    Restaurants: {
      image: 'https://images.unsplash.com/photo-1555992336-03a23c1f1c38',
      title: 'Fine Dining',
      subtitle: 'Gourmet Experience',
    },
  };

  // Use category-specific listings if available, otherwise use featured listings, otherwise fallback
  const displayListing = currentCategoryListings.length > 0 
    ? currentCategoryListings[0] 
    : featuredListings.length > 0 
      ? featuredListings[0] 
      : null;

  if (categoryLoading || featuredLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6C4DF6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If we have a listing from API, use it
  if (displayListing) {
    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: displayListing.imageUrl || fallbackData[category]?.image || fallbackData.Residences.image }} 
          style={styles.image} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{displayListing.title}</Text>
          <Text style={styles.subtitle}>{displayListing.subtitle}</Text>
          {displayListing.price && (
            <Text style={styles.price}>${displayListing.price}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.reserveBtnNearText}>
          <Text style={styles.reserveText}>BOOK NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Fallback to static data
  const categoryData = fallbackData[category] || {
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    title: 'Discover',
    subtitle: 'Explore Options',
  };

  const { image, title, subtitle } = categoryData;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.reserveBtnNearText}>
        <Text style={styles.reserveText}>BOOK NOW</Text>
      </TouchableOpacity>
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
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  reserveText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    position: 'absolute',
    left: 20,
    bottom: 24,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 15,
    marginTop: 2,
  },
  price: {
    color: '#00FFB0',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
  },
});
