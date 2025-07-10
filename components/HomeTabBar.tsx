import { useCategoryStore } from '@/stores/useCategoryStore';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tabs = ['Residences', 'Apartments', 'Transport', 'Restaurants'];

export function HomeTabBar() {

  const { category, setCategory } = useCategoryStore();
  // Select first tab on mount if none selected
  React.useEffect(() => {
    if (!category && tabs.length > 0) {
      setCategory(tabs[0]);
    }
  }, [category, setCategory]);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, category === tab && styles.activeTab]}
          onPress={() => setCategory(tab)}
        >
          <Text style={[styles.tabText, category === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 6,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#f3edff',
  },
  tabText: {
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6C4DF6',
    fontWeight: 'bold',
  },
});
