import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCategoryStore } from '@/stores/useCategoryStore';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import CategoriesSkeleton from './CategoriesSkeleton';

export function CategoriesComponent() {
    const { categories, loading, error, fetchCategories, category, setCategory } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

  if (loading) {
    return <CategoriesSkeleton />;
  }

    if (error) {
        return (
            <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView>
            {categories.length === 0 ? (
                <ThemedText>No categories found.</ThemedText>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.row}>
                        {categories.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={[
                                    styles.categoryPill,
                                    category === item.name && styles.selectedCategoryPill
                                ]}
                                onPress={() => setCategory(item.name)}
                            >
                                <ThemedText style={[
                                    styles.categoryText,
                                    category === item.name && styles.selectedCategoryText
                                ]}>
                                    {item.name}
                                </ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  categoryPill: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    elevation: 2, // for subtle shadow on Android
    shadowColor: '#000', // for subtle shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCategoryPill: {
    backgroundColor: '#0066CC',
  },
  categoryText: {
    color: '#222',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
  },
});
