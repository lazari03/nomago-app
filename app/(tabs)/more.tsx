import { HeaderNavigation } from '@/components/HeaderNavigation';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function MoreScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderNavigation title="More" showBack={true} />
      {/* Add more content here */}
    </ThemedView>
  );
}
