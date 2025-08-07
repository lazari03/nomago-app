import { HeaderFilter } from '@/components/HeaderFilter';
import { HomeTabBar } from '@/components/HomeTabBar';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { ThemedView } from '@/components/ThemedView';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { usePullToRefresh } from '@/utils/usePullToRefresh';
import React, { useRef } from 'react';
import { Animated, FlatList, RefreshControl, StyleSheet, Text } from 'react-native';



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
    // Removed debug console.log
  }, [currentCategoryListings]);

  // Pagination state for lazy loading
  const [visibleCount, setVisibleCount] = React.useState(10);

  const handleLoadMore = () => {
    if (currentCategoryListings.length > visibleCount) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderFilter />
      <HomeTabBar />
      <Animated.View style={{ flex: 1 }}>
        {categoryLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : currentCategoryListings.length > 0 ? (
          <FlatList
            data={currentCategoryListings.slice(0, visibleCount)}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }: { item: any }) => (
              <PropertyCard
                listing={item}
                onPress={() => {
                  setSelectedProperty(item);
                  import('expo-router').then(({ useRouter }) => {
                    const router = useRouter();
                    router.push({ pathname: '/property/[id]', params: { id: item.id } });
                  });
                }}
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              visibleCount < currentCategoryListings.length ? (
                <Text style={{ textAlign: 'center', marginVertical: 16 }}>Loading more...</Text>
              ) : null
            }
            refreshControl={<RefreshControl {...refreshControlProps} />}
            contentContainerStyle={{ paddingTop: 0, paddingHorizontal: 16, paddingBottom: 32 }}
          />
        ) : (
          <Text>No listings found for {category}.</Text>
        )}
      </Animated.View>
    </ThemedView>
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
    gap: 4,  // Reduced from 8 to 4
    marginBottom: 8,
  },
   tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});
