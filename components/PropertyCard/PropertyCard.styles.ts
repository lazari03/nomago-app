import { ColorTokens } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const propertyCardStyles = StyleSheet.create({
  card: {
    backgroundColor: ColorTokens.darkPurple, // Dark purple background
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
  },
  imageContainer: {
    width: 120,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12,
  },
  amenitiesContainer: {
    marginBottom: 12,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  amenityIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#fff',
  },
  amenityText: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
    flex: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'right',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
});
