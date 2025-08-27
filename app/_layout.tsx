
// Ensure i18n is initialized before any React code
import '@/i18n';
import { useFonts } from 'expo-font';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useHomeCardsStore } from '@/stores/useHomeCardsStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Satoshi-Regular': require('../assets/fonts/Satoshi-Variable.ttf'),
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Variable.ttf'),
    // Only Satoshi-Variable.ttf is available, used for both regular and bold
  });

  // Centralized data-fetching on app launch
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const fetchListings = useListingsStore((state) => state.fetchListings);
  const fetchLeftCards = useHomeCardsStore((state) => state.fetchLeftCards);
  const fetchRightCards = useHomeCardsStore((state) => state.fetchRightCards);

  useEffect(() => {
    fetchCategories();
    fetchListings();
    fetchLeftCards();
    fetchRightCards();
  }, [fetchCategories, fetchListings, fetchLeftCards, fetchRightCards]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="property/[id]" />
          <Stack.Screen name="booking/[propertyId]" />
          <Stack.Screen name="+not-found" />
        </Stack>
        {/* Force white background and dark status bar icons globally */}
        <StatusBar style="dark" backgroundColor="#fff" translucent={true} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
