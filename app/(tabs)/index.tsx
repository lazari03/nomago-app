import { HomeHeader } from '@/components/HeaderComponent/HomeHeader';
import { HelloWave } from '@/components/HelloWave';
import { ListingCard } from '@/components/ListingCard/ListingComponent';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';

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

      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
      <HomeHeader />

      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 140, paddingHorizontal: 16, paddingBottom: 32 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ListingCard
          image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          title="KOOPERATIVA E ARTIT"
          subtitle="ART RESIDENCE"
          onBookNow={() => alert('Book Now pressed!')}
        />
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            {`Tap the Explore tab to learn more about what's included in this starter app.`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            {`When you're ready, run `}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 40,
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
  animatedHeader: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 9,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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