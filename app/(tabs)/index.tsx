import { HomeBottomCards } from '@/components/HomeBottomCards';
import { HomeDateBar } from '@/components/HomeDateBar';
import { HomeMainCarousel } from '@/components/HomeMainCarousel';
import { HomeTabBar } from '@/components/HomeTabBar';
import { ThemedView } from '@/components/ThemedView';
import { useListingsStore } from '@/stores/useListingsStore';
import { usePullToRefresh } from '@/utils/usePullToRefresh';
import { useRef } from 'react';
import { Animated, RefreshControl, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { fetchListings } = useListingsStore();
  const { refreshControlProps } = usePullToRefresh(fetchListings);
  const insets = useSafeAreaInsets();

  // Fade out header between 0 and 80px of scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <ThemedView style={styles.container}>
      <HomeDateBar />
      <HomeTabBar />
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingBottom: Math.max(insets.bottom + 100, 140),  // Account for safe area + tab bar height
          paddingHorizontal: 8  // Add horizontal padding for better spacing
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl {...refreshControlProps} />}
        showsVerticalScrollIndicator={false}  // Hide scroll indicator for cleaner look
      >
        <HomeMainCarousel />
        <HomeBottomCards />
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
  },
  reactLogo: {
    height: 40,
    width: 140,
    resizeMode: 'contain',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
