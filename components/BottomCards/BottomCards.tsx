import { ThemedText } from '@/components/ThemedText';
import { goToExplore } from '@/services/navigationService';
import { useCategoryStore } from '@/stores/useCategoryStore';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function BottomCards() {
  const { category } = useCategoryStore();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Find Studio Apartment Card */}
        <TouchableOpacity
          style={styles.studioCard}
          onPress={() => goToExplore(category)}
        >
          <View style={styles.iconContainer}>
            <ThemedText style={styles.icon}>🏠</ThemedText>
          </View>
          <ThemedText style={styles.studioTitle}>FIND A{'\n'}STUDIO{'\n'}APARTMENT</ThemedText>
          <ThemedText style={styles.studioSubtitle}>+50 Homes</ThemedText>
        </TouchableOpacity>

        {/* Explore More Card */}
        <TouchableOpacity style={styles.exploreCard}>
          <View style={styles.exploreContent}>
            <View style={styles.exploreIconContainer}>
              <ThemedText style={styles.exploreIcon}>📊</ThemedText>
              <ThemedText style={styles.exploreLabel}>#ads{'\n'}page</ThemedText>
            </View>
            <View style={styles.exploreTextContainer}>
              <ThemedText style={styles.exploreTitle}>there is{'\n'}more to</ThemedText>
              <View style={styles.exploreButton}>
                <ThemedText style={styles.exploreButtonText}>EXPLORE</ThemedText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  studioCard: {
    flex: 1,
    backgroundColor: '#5A4FCF',
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 20,
  },
  studioTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 8,
  },
  studioSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  exploreCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
  },
  exploreContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exploreIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  exploreIcon: {
    fontSize: 20,
  },
  exploreLabel: {
    color: '#00FFB0',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'right',
    lineHeight: 12,
  },
  exploreTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exploreTitle: {
    color: '#00FFB0',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: '#00FFB0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
