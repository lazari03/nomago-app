import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const listingCardStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  carousel: {
    height: 120,
  },
  card: {
    width: width - 16, // Small margin for visual breathing room
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#4A148C',
  },
  slideContainer: {
    width: width,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 260,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(74, 20, 140, 0.3)', // Dark purple overlay
    zIndex: 1,
  },
  bookNow: {
    position: 'absolute',
    bottom: 18,
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
    bottom: 60,
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  paginationDotActive: {
    backgroundColor: '#00FFB0',
  },
});