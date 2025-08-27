import HomeMainCarouselSkeleton from '@/components/skeleton/HomeMainCarouselSkeleton';
import { ThemeImage } from '@/components/ThemeImage';
import { ColorTokens } from '@/constants/Colors';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeMainCarousel() {
  const { currentCategoryListings, listings, categoryLoading, fetchListingsByCategory, activeIndex, setActiveIndex } = useListingsStore();
  const { category } = useCategoryStore();
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  const displayList = category
    ? listings.filter(l => l.featured && l.categoryName === category)
    : listings.filter(l => l.featured);

  useEffect(() => {
    if (activeIndex > displayList.length - 1 && displayList.length > 0) setActiveIndex(0);
  }, [displayList.length, activeIndex, setActiveIndex]);

  const panResponder = useRef(
    displayList.length > 1
      ? PanResponder.create({
          onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20 && Math.abs(g.dy) < 20,
          onPanResponderRelease: (_, g) => {
            if (g.dx < -40) setActiveIndex(activeIndex === displayList.length - 1 ? 0 : activeIndex + 1);
            else if (g.dx > 40) setActiveIndex(activeIndex === 0 ? displayList.length - 1 : activeIndex - 1);
          },
        })
      : { panHandlers: {} }
  ).current;

  const showSkeleton = categoryLoading && displayList.length === 0;
  const showOverlay = categoryLoading && displayList.length > 0;
  const showEmpty = !categoryLoading && displayList.length === 0;
  const activeItem = displayList[activeIndex];
  const featuredImageUrl = activeItem?.featuredImageUrl || activeItem?.imageUrls?.[0] || '';

  if (showSkeleton) {
    return <HomeMainCarouselSkeleton />;
  }

  return (
    <View style={{ alignItems: 'center', marginBottom: 16 }}>
      <View style={[styles.container, { width: screenWidth - 32 }]} {...panResponder.panHandlers}>
        <View style={styles.progressBarOverlay} pointerEvents="none">
          {displayList.map((_, idx) => (
            <View key={idx} style={[styles.progressSegment, idx === activeIndex && styles.progressSegmentActive]} />
          ))}
        </View>

        {!showEmpty && displayList.length > 1 && (
          <>
            <TouchableOpacity style={styles.leftArrow} onPress={() => setActiveIndex(activeIndex === 0 ? displayList.length - 1 : activeIndex - 1)}>
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightArrow} onPress={() => setActiveIndex(activeIndex === displayList.length - 1 ? 0 : activeIndex + 1)}>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </>
        )}

        {showEmpty && (
          <View style={styles.overlayContainer}>
            <Text style={styles.loadingText}>No featured listings available</Text>
          </View>
        )}

        {!showEmpty && (
          featuredImageUrl ? (
            <>
              <ThemeImage uri={featuredImageUrl} width={400} height={500} style={styles.image} quality={60} />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradientOverlay} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{activeItem?.title || ''}</Text>
                <Text style={styles.subtitle}>{activeItem?.subtitle || ''}</Text>
                <Text style={styles.price}>{activeItem?.price != null ? `from ${activeItem.price} ALL` : ''}</Text>
                <TouchableOpacity
                  style={styles.reserveBtnNearText}
                  onPress={() => router.push({ pathname: '/property/[id]', params: { id: activeItem.id } })}
                >
                  <Text style={styles.reserveText}>BOOK NOW</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity style={styles.fallbackCard} onPress={() => router.push({ pathname: '/property/[id]', params: { id: activeItem.id } })}>
              <Text style={styles.fallbackTitle}>{activeItem?.title || ''}</Text>
              <Text style={styles.fallbackSubtitle}>{activeItem?.subtitle || ''}</Text>
              <Text style={styles.fallbackPrice}>{activeItem?.price != null ? `$${activeItem.price}` : ''}</Text>
            </TouchableOpacity>
          )
        )}
        {showOverlay && (
          <HomeMainCarouselSkeleton style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 10, opacity: 0.7 }} />
        )}
      </View>
      <View style={{ height: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: '#222',
    height: 500,
    justifyContent: 'center',
  },
  progressBarOverlay: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 8,
    gap: 4,
    zIndex: 10,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: '#E1BEE7',
    borderRadius: 2,
    marginHorizontal: 2,
  },
  progressSegmentActive: { backgroundColor: ColorTokens.purple },
  arrowText: { color: '#fff', fontSize: 28 },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(34,34,34,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  loadingText: { color: '#fff', fontSize: 16, marginTop: 10 },
  image: { width: '100%', height: '100%', position: 'absolute', borderRadius: 28 },
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
  reserveText: { color: '#111', fontWeight: 'bold', fontSize: 16 },
  textContainer: { position: 'absolute', right: 20, bottom: 24, alignItems: 'flex-end' },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'right' },
  subtitle: { color: '#fff', opacity: 0.8, fontSize: 15, marginTop: 2, textAlign: 'right' },
  price: { color: '#00FFB0', fontWeight: 'bold', fontSize: 18, marginTop: 4, textAlign: 'right' },
  fallbackCard: {
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
  },
  fallbackTitle: { fontWeight: 'bold', fontSize: 18, color: '#222' },
  fallbackSubtitle: { color: '#666', marginTop: 4 },
  fallbackPrice: { color: '#00FFB0', fontWeight: 'bold', marginTop: 6 },
});
