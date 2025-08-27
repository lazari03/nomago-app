import React from 'react';
import { StyleSheet, View } from 'react-native';

const BlogSkeleton = () => (
  <View style={styles.skeleton} />
);

const styles = StyleSheet.create({
  skeleton: {
    height: 120,
    borderRadius: 12,
    backgroundColor: '#ececec',
    marginVertical: 8,
    marginHorizontal: 8,
  },
});

export default BlogSkeleton;
