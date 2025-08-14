import { ThemeImage } from '@/components/ThemeImage';
import { ColorTokens } from '@/constants/Colors';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export function HomeMainCarousel() {
  // All hooks must be called before any return

  const { currentCategoryListings, listings, categoryLoading, fetchListingsByCategory } = useListingsStore();
  const { category } = useCategoryStore();
  const { useRouter } = require('expo-router');
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (category) {
      fetchListingsByCategory(category);
    }
  }, [category, fetchListingsByCategory]);



  // Ensure activeIndex is always valid when displayList changes

  // Use category listings if available, otherwise all listings
  let displayList = (currentCategoryListings && currentCategoryListings.length > 0)
    ? currentCategoryListings.filter(l => l.featured === true)
    : listings.filter(l => l.featured === true);

    // Ensure activeIndex is always valid when displayList changes
    useEffect(() => {
      if (activeIndex > displayList.length - 1) {
        setActiveIndex(0);
      }
    }, [displayList.length]);

  // PanResponder for swipe gestures (must be before any return)
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        // Only respond to horizontal swipes
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
      },
      onPanResponderRelease: (_evt, gestureState) => {
        if (gestureState.dx < -40) {
          setActiveIndex(i => (i === displayList.length - 1 ? 0 : i + 1));
        } else if (gestureState.dx > 40) {
          setActiveIndex(i => (i === 0 ? displayList.length - 1 : i - 1));
        }
      },
    })
  ).current;

  // Always keep space below the carousel consistent
  // Always render the cell, overlay loading/empty state if needed
  const showLoading = categoryLoading;
  const showEmpty = !categoryLoading && (!displayList || displayList.length === 0);

  // Show only the active item
  const activeItem = displayList[activeIndex];
  const featuredImageUrl = activeItem.featuredImageUrl || activeItem.imageUrls?.[0] || '';

  return (
    <View style={{ alignItems: 'center', marginBottom: 16 }}>
      <View
        style={[styles.container, styles.carouselCell]}
        {...panResponder.panHandlers}
      >
        {/* Progress bar inside the cell, at the top */}
        <View style={styles.progressBarOverlay} pointerEvents="none">
          {displayList.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.progressSegment,
                idx === activeIndex ? styles.progressSegmentActive : null,
              ]}
            />
          ))}
        </View>
        {/* Left arrow */}
        {/* Left arrow (always visible, loops) */}
        <TouchableOpacity
          style={styles.leftArrow}
          onPress={() => setActiveIndex(i => (i === 0 ? displayList.length - 1 : i - 1))}
        >
          <Text style={{ color: '#fff', fontSize: 28 }}>{'‹'}</Text>
        </TouchableOpacity>
        {/* Right arrow (always visible, loops) */}
        <TouchableOpacity
          style={styles.rightArrow}
          onPress={() => setActiveIndex(i => (i === displayList.length - 1 ? 0 : i + 1))}
        >
          <Text style={{ color: '#fff', fontSize: 28 }}>{'›'}</Text>
        </TouchableOpacity>
        {/* Show image cell or fallback card */}
        {featuredImageUrl ? (
          <>
            <ThemeImage
              uri={featuredImageUrl}
              width={400}
              height={500}
              style={styles.image}
              quality={60}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradientOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{String(activeItem.title ?? '')}</Text>
              <Text style={styles.subtitle}>{String(activeItem.subtitle ?? '')}</Text>
              <Text style={styles.price}>{activeItem.price != null ? `$${activeItem.price}` : ''}</Text>
              <TouchableOpacity
                style={styles.reserveBtnNearText}
                onPress={() => {
                  router.push({
                    pathname: '/property/[id]',
                    params: { id: activeItem.id },
                  });
                }}
              >
                <Text style={styles.reserveText}>BOOK NOW</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              width: '90%',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 2,
              marginBottom: 12,
              alignSelf: 'center',
              marginTop: 40,
            }}
            onPress={() => {
              router.push({
                pathname: '/property/[id]',
                params: { id: activeItem.id },
              });
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222' }}>{String(activeItem.title ?? '')}</Text>
            <Text style={{ color: '#666', marginTop: 4 }}>{String(activeItem.subtitle ?? '')}</Text>
            <Text style={{ color: '#00FFB0', fontWeight: 'bold', marginTop: 6 }}>{activeItem.price != null ? `$${activeItem.price}` : ''}</Text>
          </TouchableOpacity>
        )}
      </View>
  {/* Extra space below carousel for separation from bottom cards */}
  <View style={{ height: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselCell: {
    width: Dimensions.get('window').width - 32,
  },
  flatListContent: {
    paddingHorizontal: 8,
  },
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 0, // Remove bottom margin to align with cards
    backgroundColor: '#222',
    height: 500,
    justifyContent: 'center',
  },
  progressBarOverlay: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 8,
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: '#E1BEE7', // lightPurple
    borderRadius: 2,
    marginHorizontal: 2,
  },
  progressSegmentActive: {
    backgroundColor: ColorTokens.purple,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 28,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  leftArrow: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -28,
    backgroundColor: '#8888',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  rightArrow: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -28,
    backgroundColor: '#8888',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  reserveBtnNearText: {
    backgroundColor: '#00FFB0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  reserveText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    alignItems: 'flex-end',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'right',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 15,
    marginTop: 2,
    textAlign: 'right',
  },
  price: {
    color: '#00FFB0',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
    textAlign: 'right',
  },
});