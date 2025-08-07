import { ThemedText } from '@/components/ThemedText';
import { ThemeImage } from '@/components/ui/ThemeImage';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { propertyCardStyles as styles } from './PropertyCard.styles';
// Accepts a MappedListing object directly
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

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.cardContent}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <ThemeImage uri={listing.imageUrls?.[0] || ''} width={120} height={140} quality={60} style={styles.image} />
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
            <ThemedText style={styles.priceLabel}>Price/Night</ThemedText>
            <ThemedText style={styles.price}>{listing.price !== undefined ? String(listing.price) : ''}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
