import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, // Lower than before
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  inlineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 12,
    flexShrink: 1,
  },
  circleBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconArrow: {
    fontSize: 22,
    color: '#6C4DF6',
    fontWeight: 'bold',
    marginLeft: 2,
    marginTop: -2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  hostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  hostJoined: {
    fontSize: 14,
    color: '#666',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  amenitiesSection: {
    marginBottom: 100,
  },
  amenitiesList: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  amenityText: {
    fontSize: 16,
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceInfo: {
    flex: 1,
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#5A4FCF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
