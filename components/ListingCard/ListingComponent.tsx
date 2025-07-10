import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { listingCardStyles as styles } from './ListingCard.styles';
import { ListingCardProps, ListingSlide } from './ListingCard.types';

const { width } = Dimensions.get('window');

// Mock data - you can replace this with real data later
const mockSlides: ListingSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    title: 'Modern Apartment',
    subtitle: 'Downtown, City Center',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    title: 'Cozy Studio',
    subtitle: 'Art District',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
    title: 'Luxury Suite',
    subtitle: 'Business District',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c5a0',
    title: 'Beach House',
    subtitle: 'Coastal Area',
  },
];

export function ListingCard({ slides = mockSlides, onBookNow }: ListingCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleBookNow = () => {
    const currentSlide = slides[currentIndex];
    if (onBookNow) {
      onBookNow(currentSlide);
    } else {
      // Navigate to property detail page
      router.push(`/property/${currentSlide.id}`);
    }
  };

  const renderSlide = ({ item }: { item: ListingSlide }) => (
    <View style={styles.slideContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay} />
        <TouchableOpacity style={styles.bookNow} onPress={handleBookNow}>
          <ThemedText style={styles.bookNowText}>BOOK NOW</ThemedText>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          <ThemedText style={styles.subtitle}>{item.subtitle}</ThemedText>
        </View>
      </View>
    </View>
  );

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={width}
        decelerationRate="fast"
        style={styles.carousel}
        keyExtractor={(item) => item.id}
      />
      
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}