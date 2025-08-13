
import { ColorTokens } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type HeaderNavigationProps = {
  title?: string | React.ReactNode;
  showBack?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode; // Optional override
  center?: React.ReactNode; // Optional override
  style?: object;
};

export function HeaderNavigation({ title, showBack = false, right, left, center, style }: HeaderNavigationProps) {
  const router = useRouter();
  // If left is provided, use it. Otherwise, show back button if showBack is true.
  const leftElement = left !== undefined ? left : showBack ? (
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color={ColorTokens.purple} />
    </TouchableOpacity>
  ) : null;
  // If center is provided, use it. Otherwise, use title if provided.
  const centerElement = center !== undefined ? center :
    title ? (
      typeof title === 'string' ? <Text style={styles.title}>{title}</Text> : title
    ) : null;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>{leftElement}</View>
      <View style={styles.center}>{centerElement}</View>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
  },
  left: {
    minWidth: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    minWidth: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
  },
  backButton: {
    backgroundColor: ColorTokens.lightGray,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
