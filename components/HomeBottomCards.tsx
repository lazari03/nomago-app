import { goToExplore } from '@/services/navigationService';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeBottomCards() {
  const { category } = useCategoryStore();

  const data: Record<string, { leftTitle: string; leftSubtitle: string; rightImage: string; rightText: string }> = {
    Residences: {
      leftTitle: 'FIND A STUDIO APARTMENT',
      leftSubtitle: '+50 Homes',
      rightImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      rightText: 'there is more to EXPLORE',
    },
    Apartments: {
      leftTitle: 'MODERN APARTMENTS',
      leftSubtitle: 'City Center',
      rightImage: 'https://images.unsplash.com/photo-1519985176271-ad4e1c2d8c27',
      rightText: 'Discover Luxury Living',
    },
    Transport: {
      leftTitle: 'GET A RIDE',
      leftSubtitle: 'Taxi Lux',
      rightImage: 'https://images.unsplash.com/photo-1555992336-03a23c1f1c38',
      rightText: 'Fast and Reliable',
    },
    Restaurants: {
      leftTitle: 'FINE DINING',
      leftSubtitle: 'Gourmet Experience',
      rightImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      rightText: 'Taste the Best',
    },
  };

  const { leftTitle, leftSubtitle, rightImage, rightText } = data[category];

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.leftCard}
        onPress={() => {
          if (category) {
            goToExplore(category);
          }
        }}
      >
        <Text style={styles.leftTitle}>{leftTitle}</Text>
        <Text style={styles.leftSubtitle}>{leftSubtitle}</Text>
      </TouchableOpacity>
      <View style={styles.rightCard}>
        <Text style={styles.sponsor}>sponsor</Text>
        <Image source={{ uri: rightImage }} style={styles.scooterImg} />
        <Text style={styles.rightText}>{rightText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#f3edff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 170,
    padding: 8,
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
});
