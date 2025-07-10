import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useCatalogStore from '@/stores/useCatalogStore';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';


export function CategoriesComponent() {
    const { items, fetchCatalog } = useCatalogStore();

    useEffect(() => {
        fetchCatalog();
    }, [fetchCatalog]);


    return (
        <ThemedView>
            {items.length === 0 ? (
                <ThemedText>No categories found.</ThemedText>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.row}>
                        {items.map((item) => (
                            <View key={item.id} style={styles.categoryPill}>
                                <ThemedText style={styles.categoryText}>{item.name}</ThemedText>
                            </View>
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
  categoryText: {
    color: '#222',
    fontWeight: '600',
  },
});
