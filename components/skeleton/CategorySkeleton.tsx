import React from 'react';
import { StyleSheet, View } from 'react-native';

const CategorySkeleton = () => (
  <View style={styles.skeleton} />
);

const styles = StyleSheet.create({
  skeleton: {
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ececec',
    marginHorizontal: 16,
    marginBottom: 12,
  },
});

export default CategorySkeleton;
