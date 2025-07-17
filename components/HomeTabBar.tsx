import { useCategoryStore } from '@/stores/useCategoryStore';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeTabBar() {
  const { category, setCategory, categories, loading, fetchCategories, error } = useCategoryStore();
  
  // Fallback tabs in case API fails
  const fallbackTabs = ['Residences', 'Apartments', 'Transport', 'Restaurants'];
  
  // Fetch categories on mount
  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Ensure we always have tabs to display
  const tabsToShow = categories.length > 0 ? categories : fallbackTabs.map(name => ({ id: name, name, documentId: '' }));

  // Select first tab if none selected
  React.useEffect(() => {
    if (!category && tabsToShow.length > 0) {
      setCategory(tabsToShow[0].name);
    }
  }, [category, setCategory, tabsToShow]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#6C4DF6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tabsToShow.map((tab) => (
        <TouchableOpacity
          key={tab.id || tab.name}
          style={[styles.tab, category === tab.name && styles.activeTab]}
          onPress={() => setCategory(tab.name)}
        >
          <Text style={[styles.tabText, category === tab.name && styles.activeTabText]}>
            {tab.name}
          </Text>
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
  loadingText: {
    color: '#888',
    fontSize: 14,
    marginLeft: 8,
  },
});
