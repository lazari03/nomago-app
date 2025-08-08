import BookingForm from '@/components/BookingForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeImage } from '@/components/ThemeImage';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
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

  // Exclude featuredImage from detail carousel
  const detailImages = property.imageUrls?.filter(url => url !== property.featuredImageUrl) ?? [];
  // Fallback if no images
  const fallbackImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2';

  return (
    <ThemedView style={styles.container}>
      {/* Fixed Header Overlay */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
          <ThemedText style={styles.headerBackIcon}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText
          style={styles.headerTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {property.title}
        </ThemedText>
      </View>

      <ParallaxScrollView
        headerImage={
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.heroImageCarousel}>
            {(detailImages.length > 0 ? detailImages : [fallbackImage]).map((imgUrl, idx) => (
              <ThemeImage
                key={idx}
                uri={imgUrl}
                width={typeof styles.heroImage.width === 'number' ? styles.heroImage.width : 400}
                height={typeof styles.heroImage.height === 'number' ? styles.heroImage.height : 220}
                style={styles.heroImage}
                quality={60}
              />
            ))}
          </ScrollView>
        }
        headerBackgroundColor={{ light: '#fff', dark: '#222' }}
        withTabBarPadding={false}
      >
        <View style={styles.contentWrapper}>
          {/* Title & Location */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.title}>{property.title}</ThemedText>
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
