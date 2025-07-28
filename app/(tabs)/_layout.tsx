import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ColorTokens } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ColorTokens.darkPurple,
        tabBarInactiveTintColor: ColorTokens.gray,
        tabBarActiveBackgroundColor: ColorTokens.lightPurple,
        tabBarInactiveBackgroundColor: ColorTokens.lightPurple,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: ColorTokens.lightPurple }} />
        ),
        tabBarStyle: [
          { backgroundColor: ColorTokens.lightPurple, borderTopWidth: 0 },
          Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        ],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name="house.fill" color={focused ? ColorTokens.purple : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name="magnifyingglass" color={focused ? ColorTokens.purple : color} />
          ),
        }}
      />
    </Tabs>
  );
}
