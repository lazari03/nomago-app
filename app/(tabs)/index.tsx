import { HomeBottomCards } from '@/components/HomeBottomCards';
import { HomeDateBar } from '@/components/HomeDateBar';
import { HomeMainCarousel } from '@/components/HomeMainCarousel';
import { HomeTabBar } from '@/components/HomeTabBar';
import { HomeTopBar } from '@/components/HomeTopBar';
import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Fade out header between 0 and 80px of scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HomeTopBar />
      <HomeDateBar />
      <HomeTabBar />
      <HomeMainCarousel />
      <HomeBottomCards />
    </View>
  );
}

const styles = StyleSheet.create({
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
