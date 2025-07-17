import { useCategoryStore } from '@/stores/useCategoryStore';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function CategoriesExample() {
  const { 
    categories, 
    loading, 
    error, 
    fetchCategories, 
    category, 
    setCategory 
  } = useCategoryStore();

  useEffect(() => {
    // Fetch categories when component mounts
    fetchCategories();
  }, [fetchCategories]);

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        category === item.name && styles.selectedCategoryItem
      ]}
      onPress={() => setCategory(item.name)}
    >
      <Text style={[
        styles.categoryName,
        category === item.name && styles.selectedCategoryName
      ]}>
        {item.name}
      </Text>
      <Text style={styles.categoryId}>ID: {item.id}</Text>
      <Text style={styles.documentId}>Doc ID: {item.documentId}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCategories}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories from API</Text>
      <Text style={styles.selectedCategory}>
        Selected: {category}
      </Text>
      
      {categories.length === 0 ? (
        <Text style={styles.emptyText}>No categories found</Text>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  selectedCategory: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0066CC',
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCategoryItem: {
    borderColor: '#0066CC',
    backgroundColor: '#e6f2ff',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedCategoryName: {
    color: '#0066CC',
  },
  categoryId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  documentId: {
    fontSize: 12,
    color: '#999',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
