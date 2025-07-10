import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { propertyCardStyles as styles } from './PropertyCard.styles';
import { PropertyCardProps } from './PropertyCard.types';

export function PropertyCard({ 
  id,
  title, 
  location, 
  price, 
  rating, 
  image, 
  amenities, 
  onPress 
}: PropertyCardProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to property detail page
      router.push(`/property/${id}`);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.cardContent}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText style={styles.location}>{location}</ThemedText>
          </View>

          {/* Amenities */}
          <View style={styles.amenitiesContainer}>
            {amenities.bedType && (
              <View style={styles.amenityRow}>
                <ThemedText style={{ fontSize: 14, marginRight: 8 }}>🛏️</ThemedText>
                <ThemedText style={styles.amenityText}>{amenities.bedType}</ThemedText>
              </View>
            )}
            {amenities.bathroom && (
              <View style={styles.amenityRow}>
                <ThemedText style={{ fontSize: 14, marginRight: 8 }}>🚿</ThemedText>
                <ThemedText style={styles.amenityText}>{amenities.bathroom}</ThemedText>
              </View>
            )}
            {amenities.wifi && (
              <View style={styles.amenityRow}>
                <ThemedText style={{ fontSize: 14, marginRight: 8 }}>📶</ThemedText>
                <ThemedText style={styles.amenityText}>Free Wi-Fi</ThemedText>
              </View>
            )}
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <ThemedText style={styles.priceLabel}>Price/Night</ThemedText>
            <ThemedText style={styles.price}>{price}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
