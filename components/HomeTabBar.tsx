import { useCategoryStore } from '@/stores/useCategoryStore';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CategorySkeleton from './skeleton/CategorySkeleton';

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

  // Select first tab in categories as default if none selected
  React.useEffect(() => {
    if ((!category || !categories.some(cat => cat.name === category)) && categories.length > 0) {
      setCategory(categories[0].name);
    }
  }, [category, setCategory, categories]);

  if (loading) {
    return <CategorySkeleton />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabsToShow.map((tab, idx) => (
          <TouchableOpacity
            key={tab.id || tab.name}
            style={[
              styles.tab,
              category === tab.name && styles.activeTab,
              idx === 0 && { marginLeft: 8 },
              idx === tabsToShow.length - 1 && { marginRight: 8 }
            ]}
            onPress={() => setCategory(tab.name)}
          >
            <Text style={[styles.tabText, category === tab.name && styles.activeTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
  },
  container: {
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 6,
    overflow: 'hidden', // Clip children to bounds
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 0, // Less space between tabs
  },
  activeTab: {
    backgroundColor: '#f3edff',
    borderRadius: 12,
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
