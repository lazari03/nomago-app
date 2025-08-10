import { IconSymbol } from '@/components/ui/IconSymbol';
import { ColorTokens } from '@/constants/Colors';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  
  // Animation values for each tab
  const animatedValues = React.useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    // Animate tabs
    state.routes.forEach((_, index) => {
      const isFocused = state.index === index;
      Animated.timing(animatedValues[index], {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [state.index]);
  
  return (
    <View style={[styles.tabBarContainer, { 
      marginBottom: Math.max(insets.bottom + 16, 24),
    }]}>
      <View style={styles.tabBar}> 
        {state.routes.map((route, idx) => {
          const isFocused = state.index === idx;
          const tabData = TABS.find(tab => tab.name === route.name) || TABS[idx];
          
          // Animated styles
          const animatedBackgroundColor = animatedValues[idx].interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', '#F3F0FF'],
          });
          
          const animatedScale = animatedValues[idx].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05],
          });
          
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
              activeOpacity={0.8}
            >
              <Animated.View style={[
                styles.tabContent,
                {
                  backgroundColor: animatedBackgroundColor,
                  transform: [{ scale: animatedScale }],
                }
              ]}>
                <View style={styles.iconLabelWrapper}>
                  <IconSymbol
                    name={tabData?.icon as any}
                    size={24}
                    color={isFocused ? ColorTokens.purple : ColorTokens.darkPurple}
                  />
                  {isFocused && (
                    <Animated.View style={{
                      opacity: animatedValues[idx],
                    }}>
                      <Text style={[styles.label, styles.activeLabel]}>{tabData?.label}</Text>
                    </Animated.View>
                  )}
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32, // Made more pill-shaped
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 56, // Smaller height
    // Dynamic width based on content
    alignSelf: 'center',
    // shadow for floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  tabContent: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20, // Pill shape for highlighted tab
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
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
