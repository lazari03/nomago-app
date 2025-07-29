// Type guard helpers
function hasHost(obj: any): obj is { host: { name: string; avatar: string; joined: string } } {
  return obj && typeof obj.host === 'object' && typeof obj.host.name === 'string';
}
function hasAmenities(obj: any): obj is { amenities: { bedType?: string; bathroom?: string; wifi?: boolean; breakfast?: boolean } } {
  return obj && typeof obj.amenities === 'object';
}
function getImageUrl(obj: any): string {
  return obj.imageUrl || obj.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2';
}


import BookingForm from '@/components/BookingForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useListingsStore } from '@/stores/useListingsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';




import { listingsByCategory } from '@/constants/mockListings';


// Extend listing with mock details for demo
function getListingById(id: string) {
  for (const category of Object.values(listingsByCategory)) {
    const found = category.find((item) => item.id === id);
    if (found) {
      // Add mock details for demo
      return {
        ...found,
        location: 'Sample Location',
        description: 'This is a sample property description for demo purposes.',
        amenities: {
          bedType: 'King Bed',
          bathroom: '2 Bathrooms',
          wifi: true,
          breakfast: true,
        },
        host: {
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a0',
          joined: '2021',
        },
      };
    }
  }
  return undefined;
}



// Hide the native navigation header using Expo Router Stack options
export const screenOptions = {
  headerShown: false,
};

export default function PropertyDetailScreen() {
  // Modal state for booking form (must be inside component)
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();
  const { selectedProperty } = useListingsStore();
  const router = useRouter();

  // Use Zustand property if available, else fallback to mock/demo lookup
  const property = selectedProperty && String(selectedProperty.id) === String(id)
    ? selectedProperty
    : getListingById(id as string);

  if (!property) {
    return (
      <View style={styles.container}>
        <ThemedText>Property not found</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header - Explore style */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.circleBackButton} onPress={() => router.back()}>
          <View style={styles.iconCircle}>
            <ThemedText style={styles.iconArrow}>←</ThemedText>
          </View>
        </TouchableOpacity>
        <ThemedText style={styles.inlineTitle} numberOfLines={1} ellipsizeMode="tail">
          {property.title}
        </ThemedText>
      </View>
      <ParallaxScrollView
        headerImage={
          <Image
            source={{ uri: getImageUrl(property) }}
            style={styles.heroImage}
          />
        }
        headerBackgroundColor={{ light: '#fff', dark: '#222' }}
        withTabBarPadding={false}
      >
        {/* Title and Location */}
        <View style={styles.titleSection}>
          <ThemedText style={styles.title}>{property.title}</ThemedText>
          <ThemedText style={styles.location}>📍 {property.location}</ThemedText>
        </View>

        {/* Host Info */}
        {hasHost(property) && (
          <View style={styles.hostSection}>
            <Image source={{ uri: property.host.avatar }} style={styles.hostAvatar} />
            <View style={styles.hostInfo}>
              <ThemedText style={styles.hostName}>Hosted by {property.host.name}</ThemedText>
              <ThemedText style={styles.hostJoined}>Host since {property.host.joined}</ThemedText>
            </View>
          </View>
        )}

        {/* Description */}
        <View style={styles.descriptionSection}>
          <ThemedText style={styles.sectionTitle}>About this place</ThemedText>
          <ThemedText style={styles.description}>{property.description}</ThemedText>
        </View>

        {/* Amenities */}
        {hasAmenities(property) && (
          <View style={styles.amenitiesSection}>
            <ThemedText style={styles.sectionTitle}>Amenities</ThemedText>
            <View style={styles.amenitiesList}>
              {property.amenities.bedType && (
                <View style={styles.amenityItem}>
                  <ThemedText style={styles.amenityIcon}>🛏️</ThemedText>
                  <ThemedText style={styles.amenityText}>{property.amenities.bedType}</ThemedText>
                </View>
              )}
              {property.amenities.bathroom && (
                <View style={styles.amenityItem}>
                  <ThemedText style={styles.amenityIcon}>🚿</ThemedText>
                  <ThemedText style={styles.amenityText}>{property.amenities.bathroom}</ThemedText>
                </View>
              )}
              {property.amenities.wifi && (
                <View style={styles.amenityItem}>
                  <ThemedText style={styles.amenityIcon}>📶</ThemedText>
                  <ThemedText style={styles.amenityText}>Free Wi-Fi</ThemedText>
                </View>
              )}
              {property.amenities.breakfast && (
                <View style={styles.amenityItem}>
                  <ThemedText style={styles.amenityIcon}>🍳</ThemedText>
                  <ThemedText style={styles.amenityText}>Breakfast included</ThemedText>
                </View>
              )}
            </View>
          </View>
        )}
      </ParallaxScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <ThemedText style={styles.priceText}>{property.price}</ThemedText>
          <ThemedText style={styles.priceLabel}>per night</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => setModalVisible(true)}
        >
          <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Booking Modal (must be at root, not inside bottomBar) */}
      <BookingForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        propertyId={String(property.id)}
        propertyTitle={property.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, // Lower than before
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  inlineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 12,
    flexShrink: 1,
  },
  circleBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconArrow: {
    fontSize: 22,
    color: '#6C4DF6',
    fontWeight: 'bold',
    marginLeft: 2,
    marginTop: -2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  hostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  hostJoined: {
    fontSize: 14,
    color: '#666',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  amenitiesSection: {
    marginBottom: 100,
  },
  amenitiesList: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  amenityText: {
    fontSize: 16,
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceInfo: {
    flex: 1,
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#5A4FCF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
