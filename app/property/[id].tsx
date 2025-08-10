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
      {/* Fixed Header Overlay */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
          <ThemedText style={styles.headerBackIcon}>←</ThemedText>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ThemedText style={[styles.headerTitle, { flexWrap: 'wrap', textAlign: 'center', maxWidth: '90%' }]} numberOfLines={2} ellipsizeMode="tail">
            {property.title}
          </ThemedText>
        </View>
      </View>

      <ParallaxScrollView
        headerImage={
          property.featuredImageUrl ? (
            <ThemeImage
              uri={property.featuredImageUrl}
              width={Dimensions.get('window').width}
              height={320}
              style={{ borderRadius: 0, marginBottom: 8, backgroundColor: '#eee', alignSelf: 'stretch' }}
              quality={60}
            />
          ) : (
            <View style={{ height: 220, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3', borderRadius: 16, marginBottom: 8 }}>
              <ThemedText style={{ color: '#999', fontSize: 16 }}>
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

          {/* Gallery Carousel */}
          <View style={{ marginBottom: 24 }}>
            <ThemedText style={[styles.sectionTitle, { marginBottom: 8 }]}>Gallery</ThemedText>
            {galleryImages.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 180, borderRadius: 16, overflow: 'hidden', paddingLeft: 8 }}
                contentContainerStyle={{ alignItems: 'center' }}
              >
                {galleryImages.map((imgUrl, idx) => (
                  <ThemeImage
                    key={idx}
                    uri={imgUrl}
                    width={180}
                    height={180}
                    style={{ borderRadius: 16, marginRight: 12, backgroundColor: '#eee' }}
                    quality={60}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={{ height: 180, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3', borderRadius: 16 }}>
                <ThemedText style={{ color: '#999', fontSize: 16 }}>
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
