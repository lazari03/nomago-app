
import { goToExplore } from '@/services/navigationService';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useHomeCardsStore } from '@/stores/useHomeCardsStore';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const HomeBottomCards = React.memo(() => {

  const { leftCards, rightCards, loading, error, fetchLeftCards, fetchRightCards } = useHomeCardsStore();
  const category = useCategoryStore((state) => state.category);

  // Removed per-category fetching for smooth tab switching. Data is preloaded globally.

  const showSkeleton = loading && leftCards.length === 0 && rightCards.length === 0;
  if (error) {
    return <Text style={{ color: 'red', margin: 24 }}>Error: {error}</Text>;
  }


  // Find left card matching the selected category in its categories array (case-insensitive)
  const leftCard = leftCards.find(card =>
    card.categories?.some((cat: { name?: string }) => cat.name?.toLowerCase() === category?.toLowerCase())
  );
  // Find right card matching the selected category in its categories array (case-insensitive)
  const rightCard = rightCards.find(card =>
    card.categories?.some((cat: { name?: string }) => cat.name?.toLowerCase() === category?.toLowerCase())
  ) || rightCards[0];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.leftCard}
          onPress={() => goToExplore(leftCard?.link || 'Apartments')}
          disabled={!leftCard}
        >
          <Text style={styles.leftTitle}>
            {leftCard ? leftCard.title : 'Hey there digital explorer'}
          </Text>
          {leftCard
            ? <>
                {leftCard.description && <Text style={styles.leftSubtitle}>{leftCard.description}</Text>}
                {leftCard.subtitle && <Text style={styles.leftSubtitle}>{leftCard.subtitle}</Text>}
              </>
            : null}
        </TouchableOpacity>
        <View style={styles.rightCard}>
          {rightCard?.posterUrl && (
            <Image source={{ uri: rightCard.posterUrl }} style={styles.rightCardImage} resizeMode="cover" />
          )}
          <View style={styles.rightCardOverlay}>
            <Text style={styles.rightText}>{rightCard?.title || 'there is more to EXPLORE'}</Text>
            {rightCard?.description && (
              <Text style={styles.rightDesc}>{rightCard.description}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});

export { HomeBottomCards };

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Extra spacing at the bottom
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  leftCard: {
    flex: 2,
    backgroundColor: '#6C4DF6',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    minHeight: 120,
  },
  leftTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  leftSubtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 14,
  },
  rightCard: {
    flex: 1,
    borderRadius: 20,
    minHeight: 170,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f3edff',
  },
  rightCardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  rightCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'flex-start',
  },
  sponsor: {
    color: '#6C4DF6',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  scooterImg: {
    width: 60,
    height: 100,
    borderRadius: 12,
  },
  rightText: {
    color: '#6C4DF6',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  rightDesc: {
    color: '#6C4DF6',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    opacity: 0.8,
  },
});
