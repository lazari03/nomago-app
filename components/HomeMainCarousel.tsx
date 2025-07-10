import { useCategoryStore } from '@/stores/useCategoryStore';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeMainCarousel() {
  const { category } = useCategoryStore();

  const data: Record<string, { image: string; title: string; subtitle: string }> = {
    Residences: {
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      title: 'Cozy Studio',
      subtitle: 'Art District',
    },
    Apartments: {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Modern Apartment',
      subtitle: 'City Center',
    },
    Transport: {
      image: 'https://images.unsplash.com/photo-1519985176271-ad4e1c2d8c27',
      title: 'Get a Ride',
      subtitle: 'Taxi Lux',
    },
    Restaurants: {
      image: 'https://images.unsplash.com/photo-1555992336-03a23c1f1c38',
      title: 'Fine Dining',
      subtitle: 'Gourmet Experience',
    },
  };

  const { image, title, subtitle } = data[category];

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.reserveBtnNearText}>
        <Text style={styles.reserveText}>BOOK NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#222',
    height: 500,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 28,
  },
  leftArrow: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -24,
    backgroundColor: '#8888',
    borderRadius: 20,
    padding: 4,
    zIndex: 2,
  },
  rightArrow: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -24,
    backgroundColor: '#8888',
    borderRadius: 20,
    padding: 4,
    zIndex: 2,
  },
  reserveBtnNearText: {
    backgroundColor: '#00FFB0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  reserveText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    position: 'absolute',
    left: 20,
    bottom: 24,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 15,
    marginTop: 2,
  },
});
