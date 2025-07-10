import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// This would normally come from your API/store
const getPropertyById = (id: string) => {
  const properties = [
    {
      id: '1',
      title: 'Modern Apartment',
      location: 'Downtown, City Center',
      price: '$120',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      description: 'A beautiful modern apartment in the heart of the city. Perfect for business travelers and couples looking for a comfortable stay with easy access to restaurants, shops, and public transportation.',
      amenities: {
        bedType: 'King Bed',
        bathroom: '2 Bathrooms',
        wifi: true,
        breakfast: true,
      },
      gallery: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb',
      ],
      host: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a0',
        joined: '2019',
      },
    },
    {
      id: '2',
      title: 'Cozy Studio',
      location: 'Art District',
      price: '$85',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      description: 'A cozy studio apartment in the vibrant art district. Surrounded by galleries, cafes, and creative spaces. Perfect for artists and creative professionals.',
      amenities: {
        bedType: 'Queen Bed',
        bathroom: '1 Bathroom',
        wifi: true,
        breakfast: false,
      },
      gallery: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb',
      ],
      host: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        joined: '2020',
      },
    },
    {
      id: '3',
      title: 'Luxury Suite',
      location: 'Business District',
      price: '$200',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
      description: 'Luxurious suite in the premium business district. Features high-end amenities, concierge service, and stunning city views. Perfect for executive stays.',
      amenities: {
        bedType: 'King Bed',
        bathroom: '3 Bathrooms',
        wifi: true,
        breakfast: true,
      },
      gallery: [
        'https://images.unsplash.com/photo-1554995207-c18c203602cb',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      ],
      host: {
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        joined: '2018',
      },
    },
    {
      id: '4',
      title: 'Beach House',
      location: 'Coastal Area',
      price: '$150',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c5a0',
      description: 'Charming beach house with direct ocean access. Wake up to stunning sunrise views and fall asleep to the sound of waves. Perfect for a peaceful getaway.',
      amenities: {
        bedType: 'Double Bed',
        bathroom: '2 Bathrooms',
        wifi: true,
        breakfast: false,
      },
      gallery: [
        'https://images.unsplash.com/photo-1520637836862-4d197d17c5a0',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      ],
      host: {
        name: 'David Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        joined: '2017',
      },
    },
  ];
  
  return properties.find(p => p.id === id);
};

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const property = getPropertyById(id as string);
  const scrollY = useRef(new Animated.Value(0)).current;

  if (!property) {
    return (
      <View style={styles.container}>
        <ThemedText>Property not found</ThemedText>
      </View>
    );
  }

  // Image height animation for pull-to-stretch effect
  const imageHeight = scrollY.interpolate({
    inputRange: [-300, 0],
    outputRange: [700, 400], // Stretch from 400 to 700
    extrapolate: 'clamp',
  });

  // Image translateY to fill the stretched area from top
  const imageTranslateY = scrollY.interpolate({
    inputRange: [-300, 0],
    outputRange: [-150, 0], // Move image up to fill the stretched area
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Changed to false for height animation
        )}
        scrollEventThrottle={16}
        bounces={true}
        contentContainerStyle={{ paddingTop: 0 }} // Remove any top padding
        style={{ backgroundColor: '#fff' }}
      >
        {/* Stretchable Image - iOS table view style */}
        <Animated.View style={[styles.imageContainer, {
          height: imageHeight,
          transform: [{ translateY: imageTranslateY }],
        }]}>
          <Image 
            source={{ uri: property.image }} 
            style={styles.heroImage} 
          />
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Location */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.title}>{property.title}</ThemedText>
            <ThemedText style={styles.location}>📍 {property.location}</ThemedText>
          </View>

          {/* Host Info */}
          <View style={styles.hostSection}>
            <Image source={{ uri: property.host.avatar }} style={styles.hostAvatar} />
            <View style={styles.hostInfo}>
              <ThemedText style={styles.hostName}>Hosted by {property.host.name}</ThemedText>
              <ThemedText style={styles.hostJoined}>Host since {property.host.joined}</ThemedText>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <ThemedText style={styles.sectionTitle}>About this place</ThemedText>
            <ThemedText style={styles.description}>{property.description}</ThemedText>
          </View>

          {/* Amenities */}
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
        </View>
      </Animated.ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <ThemedText style={styles.priceText}>{property.price}</ThemedText>
          <ThemedText style={styles.priceLabel}>per night</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => alert(`Book ${property.title}`)}
        >
          <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
