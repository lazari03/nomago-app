import { HeaderNavigation } from '@/components/HeaderNavigation';
import { HomeTabBar } from '@/components/HomeTabBar';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { ThemedView } from '@/components/ThemedView';
import { useTranslations } from '@/hooks/useTranslation';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { L10n } from '@/utils/translationHelper';
import { usePullToRefresh } from '@/utils/usePullToRefresh';
import React, { useRef } from 'react';
import { Animated, RefreshControl, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function ExplorePage() {
  const { t } = useTranslations();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { category, loading: categoryLoading, error } = useCategoryStore();
  const { currentCategoryListings, setSelectedProperty, fetchListingsByCategory } = useListingsStore();
  const insets = useSafeAreaInsets();

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
    <ThemedView style={{ flex: 1, backgroundColor: '#fff' }}>
        <HeaderNavigation
          title={t(L10n.explore.title)}
          showBack={true}
          right={null}
        />
        <HomeTabBar />
        <Animated.ScrollView
          contentContainerStyle={{ 
            paddingTop: 0, 
            paddingHorizontal: 16, 
            paddingBottom: Math.max(insets.bottom + 100, 140)  // Account for safe area + tab bar height
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl {...refreshControlProps} />}
        >
          <ThemedView style={styles.stepContainer}>
            {categoryLoading ? (
              <Text>{t(L10n.explore.loading)}</Text>
            ) : error ? (
              <Text>{t(L10n.explore.error)}: {error}</Text>
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
              <Text>{t(L10n.explore.noListings, { category })}</Text>
            )}
          </ThemedView>
        </Animated.ScrollView>
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
