import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder-expo';

export default function CategoriesSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={16}>
      <View style={{ flexDirection: 'row', padding: 12 }}>
        {[...Array(5)].map((_, idx) => (
          <View key={idx} style={{ width: 80, height: 32, borderRadius: 16, marginRight: 12 }} />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
}
