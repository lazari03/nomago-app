import { ThemedText } from '@/components/ThemedText';
import { ThemeImage } from '@/components/ui/ThemeImage';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { listingCardStyles as styles } from './ListingCard.styles';
import { ListingCardProps, ListingSlide } from './ListingCard.types';

const { width } = Dimensions.get('window');




// slides is now required and must be an array of ListingSlide with imageUrls
export function ListingCard({ slides, onBookNow }: ListingCardProps) {
  // slides is now required
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleBookNow = () => {
    const currentSlide = slides[currentIndex];
    if (onBookNow) {
      onBookNow(currentSlide);
    } else {
      router.push(`/property/${currentSlide.id}`);
    }
  };

  const renderSlide = ({ item }: { item: ListingSlide }) => (
    <View style={styles.slideContainer}>
      <View style={styles.card}>
        <ThemeImage
          uri={item.imageUrls?.[0] ?? ''}
          width={400}
          height={250}
          quality={60}
          style={styles.image}
        />
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

  if (!slides || slides.length === 0) {
    return (
      <View style={styles.container}>
        <ThemedText>No listings available.</ThemedText>
      </View>
    );
  }
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
        keyExtractor={(item) => String(item.id)}
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