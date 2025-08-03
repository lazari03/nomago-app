// Type guard helpers
function hasHost(obj: any): obj is { host: { name: string; avatar: string; joined: string } } {
  return obj && typeof obj.host === 'object' && typeof obj.host.name === 'string';
}
// Amenities removed
function getImageUrl(obj: any): string {
  return obj.imageUrl || obj.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2';
}


import BookingForm from '@/components/BookingForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import styles from './PropertyDetailScreen.styles';


export const screenOptions = {
  headerShown: false,
};

export default function PropertyDetailScreen() {
  // Modal state for booking form (must be inside component)
  const [modalVisible, setModalVisible] = useState(false);
  const { fromDate, toDate } = useDateFilterStore();
  const { id } = useLocalSearchParams();
  const { selectedProperty } = useListingsStore();
  const router = useRouter();

  // Use Zustand property only
  const property = selectedProperty && String(selectedProperty.id) === String(id)
    ? selectedProperty
    : null;

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

        {/* Amenities removed */}
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
        propertyTitle={property.title}
        propertyId={property.id}
        propertyDocumentId={property.documentId}
        startDate={fromDate}
        endDate={toDate}
      />
    </SafeAreaView>
  );
}

