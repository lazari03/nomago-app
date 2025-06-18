import { CategoriesComponent } from '@/components/CategoriesComponent/CategoriesComponent';
import { HomeHeader } from '@/components/HeaderComponent/HomeHeader';
import { ListingCard } from '@/components/ListingCard/ListingComponent';
import { ThemedView } from '@/components/ThemedView';
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
      <View style={styles.stickyHeader}>
        <HomeHeader />
      </View>      
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 140, paddingHorizontal: 16, paddingBottom: 32 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <ThemedView style={styles.titleContainer}>
        <CategoriesComponent/>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
        </ThemedView>
        <ListingCard
          image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          title="KOOPERATIVA E ARTIT"
          subtitle="ART RESIDENCE"
          onBookNow={() => alert('Book Now pressed!')}
        />
        <ThemedView style={styles.stepContainer}>
        <ListingCard
          image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          title="ads 1"
          subtitle="ART RESIDENCE"
          onBookNow={() => alert('Book Now pressed!')}
        />
        </ThemedView>  
      </Animated.ScrollView>
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
