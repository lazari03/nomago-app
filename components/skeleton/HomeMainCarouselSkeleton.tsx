import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder-expo';

const screenWidth = Dimensions.get('window').width;

export default function HomeMainCarouselSkeleton({ style }: { style?: any }) {
  return (
    <View style={[{ alignItems: 'center', marginBottom: 16 }, style]}>
      <SkeletonPlaceholder borderRadius={28}>
        <View style={[styles.container, { width: screenWidth - 32 }]}
        >
          <View style={styles.progressBarOverlay}>
            {[...Array(3)].map((_, idx) => (
              <View key={idx} style={styles.progressSegment} />
            ))}
          </View>
          <View style={styles.image} />
          <View style={styles.textContainer}>
            <View style={styles.title} />
            <View style={styles.subtitle} />
            <View style={styles.price} />
            <View style={styles.reserveBtnNearText} />
          </View>
        </View>
      </SkeletonPlaceholder>
      <View style={{ height: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: '#222',
    height: 500,
    justifyContent: 'center',
  },
  progressBarOverlay: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 8,
    gap: 4,
    zIndex: 10,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: '#E1BEE7',
    borderRadius: 2,
    marginHorizontal: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 28,
  },
  textContainer: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    alignItems: 'flex-end',
    width: '60%',
  },
  title: {
    width: '80%',
    height: 24,
    borderRadius: 6,
    marginBottom: 8,
  },
  subtitle: {
    width: '60%',
    height: 16,
    borderRadius: 6,
    marginBottom: 8,
  },
  price: {
    width: '40%',
    height: 18,
    borderRadius: 6,
    marginBottom: 12,
  },
  reserveBtnNearText: {
    width: 120,
    height: 32,
    borderRadius: 10,
    marginTop: 8,
  },
});
