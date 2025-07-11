import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorTokens } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Tab config: icon, label, route
const TABS = [
  {
    name: 'Home',
    icon: 'house.fill',
    route: '/'
  },
  {
    name: 'Explore',
    icon: 'paperplane.fill',
    route: '/Explore'
  },
  {
    name: 'Contact',
    icon: 'chevron.left.forwardslash.chevron.right',
    route: '/Contact'
  },
  {
    name: 'SignIn',
    icon: 'person.fill', // You may need to add this mapping in IconSymbol
    route: '/SignIn'
  },
];

export function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}> 
      {TABS.map((tab, idx) => {
        const isFocused = state.index === idx;
        return (
          <TouchableOpacity
            key={tab.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(tab.route)}
            style={[styles.tab, isFocused && styles.activeTab]}
            activeOpacity={0.8}
          >
            <IconSymbol
              name={tab.icon}
              size={28}
              color={isFocused ? ColorTokens.white : ColorTokens.darkPurple}
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>{tab.name}</Text>
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
    backgroundColor: ColorTokens.lightPurple, // changed to light purple
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginHorizontal: 8,
    marginBottom: Platform.OS === 'ios' ? 16 : 8,
    paddingTop: 8,
    // shadow for floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    // Optionally add a highlight or scale effect
  },
  label: {
    color: ColorTokens.darkPurple,
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  activeLabel: {
    color: ColorTokens.darkPurple,
    fontWeight: 'bold',
  },
});

export default CustomTabBar;
