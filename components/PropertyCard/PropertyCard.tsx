import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { propertyCardStyles as styles } from './PropertyCard.styles';
// Accepts a MappedListing object directly
import { ThemeImage } from '@/components/ThemeImage';
import { MappedListing } from '@/services/listingsService';


type PropertyCardProps = {
  listing: MappedListing;
  onPress?: () => void;
};

export function PropertyCard({ listing, onPress }: PropertyCardProps) {
  const router = useRouter();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/property/${listing.id}`);
    }
  };

  // Use featuredImageUrl if present, else fallback to first imageUrl
  const imageUrl = listing.featuredImageUrl || listing.imageUrls?.[0] || '';
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.cardContent}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <ThemeImage uri={imageUrl} width={180} height={120} style={styles.image} quality={60} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.title}>{listing.title}</ThemedText>
            <ThemedText style={styles.location}>{listing.location || ''}</ThemedText>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <ThemedText style={styles.priceLabel}>starting from </ThemedText>
            <ThemedText style={styles.price}>{listing.price !== undefined ? String(listing.price) : ''}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
