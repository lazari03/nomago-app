import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BlogCellProps {
  title: string;
  imageUrl?: string;
  isHeadline?: boolean;
  onPress: () => void;
}

const BlogCell: React.FC<BlogCellProps> = ({ title, imageUrl, isHeadline, onPress }) => (
  <TouchableOpacity
    style={[styles.cell, isHeadline && styles.headlineCell]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    {imageUrl ? (
      <Image source={{ uri: imageUrl }} style={[styles.image, isHeadline && styles.headlineImage]} />
    ) : (
      <View style={[styles.image, styles.placeholder, isHeadline && styles.headlineImage]} />
    )}
    <View style={[styles.overlay, isHeadline && styles.headlineOverlay]}>
      <Text style={[styles.title, isHeadline && styles.headlineTitle]} numberOfLines={2}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    width: '100%',
    aspectRatio: 1.7,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 12,
    backgroundColor: '#f3edff',
    elevation: 2,
  },
  headlineCell: {
    aspectRatio: 1.9,
    minHeight: 180,
    marginBottom: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headlineImage: {
    borderRadius: 20,
  },
  placeholder: {
    backgroundColor: '#e0e0e0',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headlineOverlay: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  headlineTitle: {
    fontSize: 22,
    marginBottom: 8,
  },
  date: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.85,
  },
  headlineDate: {
    fontSize: 15,
  },
});

export default BlogCell;
