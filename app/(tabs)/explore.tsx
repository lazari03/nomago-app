import { HeaderFilter } from '@/components/HeaderFilter';
import { HomeTabBar } from '@/components/HomeTabBar';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { ThemedView } from '@/components/ThemedView';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { usePullToRefresh } from '@/utils/usePullToRefresh';
import React, { useRef } from 'react';
import { Animated, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';



export default function ExplorePage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { category } = useCategoryStore();
  const {
    currentCategoryListings,
    categoryLoading,
    fetchListingsByCategory,
    setSelectedProperty,
    error,
    clearError,
  } = useListingsStore();

  React.useEffect(() => {
    if (category) {
      fetchListingsByCategory(category);
    }
  }, [category]);

  // Pull-to-refresh logic
  const { refreshControlProps } = usePullToRefresh(async () => {
    if (category) {
      await fetchListingsByCategory(category);
    }
  });

  // Debug: log all listing ids and titles
  React.useEffect(() => {
    if (currentCategoryListings && currentCategoryListings.length > 0) {
      console.log('ExplorePage listings:', currentCategoryListings.map(l => ({ id: l.id, title: l.title })));
    }
  }, [currentCategoryListings]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderFilter />
        <HomeTabBar />
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: 0, paddingHorizontal: 16, paddingBottom: 32 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl {...refreshControlProps} />}
        >
          <Text style={styles.categoryTitle}>Explore {category}</Text>
          <ThemedView style={styles.stepContainer}>
            {categoryLoading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>Error: {error}</Text>
            ) : currentCategoryListings.length > 0 ? (
              currentCategoryListings.map((item) => (
                <PropertyCard
                  key={item.id}
                  listing={item}
                  onPress={() => {
                    setSelectedProperty(item);
                    // Use useRouter for navigation
                    import('expo-router').then(({ useRouter }) => {
                      const router = useRouter();
                      router.push({ pathname: '/property/[id]', params: { id: item.id } });
                    });
                  }}
                />
              ))
            ) : (
              <Text>No listings found for {category}.</Text>
            )}
          </ThemedView>
        </Animated.ScrollView>
      </SafeAreaView>
      <HomeTabBar />
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
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
   tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});
