import { HeaderNavigation } from '@/components/HeaderNavigation';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemeImage } from '@/components/ThemeImage';
import { useTranslations } from '@/hooks/useTranslation';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { PropertyCategory } from '@/utils/PropertyCategory';
import * as Linking from 'expo-linking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './PropertyDetailScreen.styles';

export const screenOptions = {
  headerShown: false,
};

export default function PropertyDetailScreen() {

  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const insets = useSafeAreaInsets();
  const { fromDate, toDate } = useDateFilterStore();
  const { id } = useLocalSearchParams();
  const { selectedProperty, listings } = useListingsStore();
  const router = useRouter();

  // Try to find the property by ID from listings if not set as selectedProperty
  let property = selectedProperty && String(selectedProperty.id) === String(id)
    ? selectedProperty
    : null;
  if (!property && listings && listings.length > 0) {
    property = listings.find((l) => String(l.id) === String(id)) || null;
  }

  const { t, L10n } = useTranslations();

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
    <>
      <View style={[styles.headerOverlaySafe, { paddingTop: insets.top }]}> 
        <HeaderNavigation showBack title={property.title} />
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
          <View style={styles.titleSection}>
            <View style={styles.locationRow}>
              <ThemedText style={styles.location}>{property.location}</ThemedText>
            </View>
          </View>
          <View style={styles.descriptionSection}>
            <ThemedText style={styles.sectionTitle}>About</ThemedText>
            <ThemedText style={styles.description}>
              {property.description || 'No description available.'}
            </ThemedText>
          </View>
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
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      setSelectedIndex(idx);
                      setLightboxVisible(true);
                    }}
                  >
                    <ThemeImage
                      uri={imgUrl}
                      width={180}
                      height={180}
                      style={styles.galleryImage}
                      quality={60}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.noGalleryImage}>
                <ThemedText style={styles.noGalleryImageText}>
                  No images available
                </ThemedText>
              </View>
            )}
            {/* Show in Maps Button */}
            {property.locationLink ? (
              <TouchableOpacity
                style={styles.showInMapsButton}
                onPress={() => {
                  const url = String(property.locationLink);
                  Linking.openURL(url);
                }}
              >
                <ThemedText style={styles.showInMapsButtonText}>Show in Maps</ThemedText>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.bottomSpacer} />
        </View>
      </ParallaxScrollView>

      {/* Lightbox Modal for Gallery Image */}
      {lightboxVisible && galleryImages.length > 0 && (
        <View style={styles.lightboxOverlay}>
          <TouchableOpacity
            style={styles.lightboxCloseButton}
            onPress={() => {
              setLightboxVisible(false);
            }}
          >
            <ThemedText style={styles.lightboxCloseIcon}>✕</ThemedText>
          </TouchableOpacity>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: selectedIndex * Dimensions.get('window').width, y: 0 }}
            onMomentumScrollEnd={e => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('window').width);
              setSelectedIndex(newIndex);
            }}
            style={{ width: Dimensions.get('window').width }}
          >
            {galleryImages.map((imgUrl, idx) => (
              <View key={idx} style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
                <ThemeImage
                  uri={imgUrl}
                  width={Dimensions.get('window').width * 0.9}
                  height={Dimensions.get('window').height * 0.7}
                  style={styles.lightboxImage}
                  quality={80}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    {/* show maps button  */}
      {/* Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          {(() => {
            const category = property.categoryName?.toLowerCase() || '';
            const isApartment = category === PropertyCategory.Apartment || category === PropertyCategory.Apartments;
            const isRestaurant = category === PropertyCategory.Restaurant || category === PropertyCategory.Restaurants;
            const isResidence = category === PropertyCategory.Residence || category === PropertyCategory.Residences;
            const isTransport = category === PropertyCategory.Transport || category === PropertyCategory.Transports;

            if (isApartment) {
              return (
                <>
                  <ThemedText style={styles.priceText}>{property.price} ALL</ThemedText>
                  <ThemedText style={styles.priceLabel}>{t(L10n.common.perNight)}</ThemedText>
                </>
              );
            } else if (isRestaurant || isResidence || isTransport) {
              return (
                <ThemedText style={styles.priceText}>
                  {t(L10n.common.from)} {property.price} ALL
                </ThemedText>
              );
            } else {
              return (
                <ThemedText style={styles.priceText}>{property.price} ALL</ThemedText>
              );
            }
          })()}
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={() => {
          router.push({
            pathname: '/booking/[propertyId]',
            params: {
              propertyId: property.id,
              propertyDocumentId: property.documentId,
              propertyTitle: property.title,
            }
          });
        }}>
          <ThemedText style={styles.bookButtonText}>{t(L10n.booking.bookNow)}</ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
}
