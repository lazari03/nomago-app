
// Ensure i18n is initialized before any React code
import '@/i18n';
import { useFonts } from 'expo-font';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useListingsStore } from '@/stores/useListingsStore';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Centralized data-fetching on app launch
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const fetchListings = useListingsStore((state) => state.fetchListings);

  useEffect(() => {
    fetchCategories();
    fetchListings();
  }, [fetchCategories, fetchListings]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="property/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="booking/[propertyId]" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        {/* Force white background and dark status bar icons globally */}
        <StatusBar style="dark" backgroundColor="#fff" translucent={true} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
