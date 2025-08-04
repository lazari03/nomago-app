import { IconSymbol } from '@/components/ui/IconSymbol';
import { ColorTokens } from '@/constants/Colors';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Tab config: icon, label, route (only Home and Explore for now)
const TABS = [
  {
    name: 'index',
    icon: 'house.fill',
    label: 'Home',
    route: '/'
  },
  {
    name: 'explore',
    icon: 'magnifyingglass',
    label: 'Explore',
    route: '/explore'
  },
];

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.tabBar, { 
      marginBottom: Math.max(insets.bottom + 16, 24),
      position: 'absolute',
      bottom: 0,
      left: 16,
      right: 16,
    }]}> 
      {state.routes.map((route, idx) => {
        const isFocused = state.index === idx;
        const tabData = TABS.find(tab => tab.name === route.name) || TABS[idx];
        
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tab, isFocused && styles.activeTab]}
            activeOpacity={0.8}
          >
            <View style={styles.iconLabelWrapper}>
              <IconSymbol
                name={tabData?.icon as any}
                size={24}
                color={isFocused ? ColorTokens.purple : ColorTokens.darkPurple}
              />
              <Text style={[styles.label, isFocused && styles.activeLabel]}>{tabData?.label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 64,
    // shadow for floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
  iconLabelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  activeTab: {
    backgroundColor: '#F3F0FF',
  },
  label: {
    color: ColorTokens.darkPurple,
    fontSize: 12,
    fontWeight: '600',
  },
  activeLabel: {
    color: ColorTokens.purple,
    fontWeight: 'bold',
  },
});
