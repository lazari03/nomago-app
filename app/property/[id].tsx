import BookingForm from '@/components/BookingForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeImage } from '@/components/ThemeImage';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './PropertyDetailScreen.styles';

export const screenOptions = {
  headerShown: false,
};

export default function PropertyDetailScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { fromDate, toDate } = useDateFilterStore();
  const { id } = useLocalSearchParams();
  const { selectedProperty } = useListingsStore();
  const router = useRouter();

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

  // Show all images from listing
  const galleryImages = property.imageUrls?.filter(url => !!url) ?? [];

  return (
    <ThemedView style={styles.container}>
      {/* Back Button Overlay (left-aligned, visually above image) */}
      <View style={styles.headerBackOverlay}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
          <ThemedText style={styles.headerBackIcon}>←</ThemedText>
        </TouchableOpacity>
      </View>

      <ParallaxScrollView
        headerImage={
          property.featuredImageUrl ? (
            <ThemeImage
              uri={property.featuredImageUrl}
              width={Dimensions.get('window').width}
              height={320}
              style={styles.featuredImage}
              quality={60}
            />
          ) : (
            <View style={styles.noFeaturedImage}>
              <ThemedText style={styles.noFeaturedImageText}>
                No featured image
              </ThemedText>
            </View>
          )
        }
        headerBackgroundColor={{ light: '#fff', dark: '#222' }}
        withTabBarPadding={false}
      >
        <View style={styles.contentWrapper}>
          {/* Title & Location */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.title} numberOfLines={3} ellipsizeMode="tail">
              {property.title}
            </ThemedText>
            <View style={styles.locationRow}>
              <ThemedText style={styles.location}>{property.location}</ThemedText>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <ThemedText style={styles.sectionTitle}>About this place</ThemedText>
            <ThemedText style={styles.description}>
              {property.description || 'No description available.'}
            </ThemedText>
          </View>

          {/* Gallery Carousel */}
          <View style={styles.gallerySection}>
            <ThemedText style={styles.sectionTitle}>Gallery</ThemedText>
            {galleryImages.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.galleryScroll}
                contentContainerStyle={styles.galleryScrollContent}
              >
                {galleryImages.map((imgUrl, idx) => (
                  <ThemeImage
                    key={idx}
                    uri={imgUrl}
                    width={180}
                    height={180}
                    style={styles.galleryImage}
                    quality={60}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.noGalleryImage}>
                <ThemedText style={styles.noGalleryImageText}>
                  No images available
                </ThemedText>
              </View>
            )}
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ParallaxScrollView>

      {/* Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <ThemedText style={styles.priceText}>{property.price}</ThemedText>
          <ThemedText style={styles.priceLabel}>per night</ThemedText>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(true)}>
          <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Booking Modal */}
      <BookingForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        propertyTitle={property.title}
        propertyId={property.id}
        propertyDocumentId={property.documentId}
        startDate={fromDate}
        endDate={toDate}
      />
    </ThemedView>
  );
}
