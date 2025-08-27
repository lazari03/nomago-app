import React from 'react';
import { StyleSheet, View } from 'react-native';

const ListingSkeleton = () => (
  <View style={styles.skeleton} />
);

const styles = StyleSheet.create({
  skeleton: {
    height: 160,
    borderRadius: 16,
    backgroundColor: '#ececec',
    marginVertical: 8,
    marginHorizontal: 8,
  },
});

export default ListingSkeleton;
