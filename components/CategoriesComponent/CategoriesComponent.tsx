import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useCatalogStore from '@/stores/useCatalogStore';
import React, { useEffect } from 'react';

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
        items.map((item) => (
          <ThemedText key={item.id}>{item.name}</ThemedText>
        ))
      )}
    </ThemedView>
  );
}