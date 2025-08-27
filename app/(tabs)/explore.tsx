import { HeaderNavigation } from '@/components/HeaderNavigation';
import { HomeTabBar } from '@/components/HomeTabBar';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import ListingSkeleton from '@/components/skeleton/ListingSkeleton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslations } from '@/hooks/useTranslation';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { L10n } from '@/utils/translationHelper';
import { usePullToRefresh } from '@/utils/usePullToRefresh';
import React, { useRef } from 'react';
import { Animated, RefreshControl, StyleSheet, View } from 'react-native';
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
            paddingHorizontal: 16, 
            paddingTop: 5, // Reduce top whitespace to 5px
            paddingBottom: Math.max(insets.bottom + 100, 140)
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl {...refreshControlProps} />}
        >
          <View style={styles.stepContainer}>
            {categoryLoading ? (
              <>
                {[...Array(3)].map((_, idx) => (
                  <ListingSkeleton key={idx} />
                ))}
              </>
            ) : error ? (
              <ThemedText>{t(L10n.explore.error)}: {error}</ThemedText>
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
              <ThemedText>{t(L10n.explore.noListings, { category })}</ThemedText>
            )}
          </View>
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
    // No gap or margin to remove extra space above first card
  },
   tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});
