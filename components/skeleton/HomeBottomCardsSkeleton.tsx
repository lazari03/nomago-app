import React from 'react';
import { StyleSheet, View } from 'react-native';


const HomeBottomCardsSkeleton = ({ style }: { style?: any }) => (
  <View style={[styles.skeleton, style]} />
);

const styles = StyleSheet.create({
  skeleton: {
    height: 180,
    borderRadius: 20,
    backgroundColor: '#ececec',
    marginHorizontal: 8,
    marginBottom: 20,
  },
});

export default HomeBottomCardsSkeleton;
