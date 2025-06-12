import { StyleSheet } from 'react-native';

export const listingCardStyles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#222',
  },
  image: {
    width: '100%',
    height: 220,
  },
  bookNow: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#00FFB0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 22,
    zIndex: 2,
  },
  bookNowText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 2,
  },
});