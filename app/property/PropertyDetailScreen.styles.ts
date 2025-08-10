import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Lightbox overlay styles
  lightboxOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  lightboxCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 8,
    zIndex: 101,
  },
  lightboxCloseIcon: {
    fontSize: 28,
    color: '#222',
    fontWeight: 'bold',
  },
  lightboxImage: {
    borderRadius: 12,
    maxWidth: '90%',
    maxHeight: '70%',
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
// ...existing code...
    // Header Styles
    headerOverlay: {
        position: 'absolute',
        top: 40, // Move header lower to avoid cut-off
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16, // Reduce top padding
        paddingHorizontal: 16,
        paddingBottom: 8, // Reduce bottom padding
        height: 72, // Reduce height for tighter layout
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: '#fff',

    },
    headerBackButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: Colors.card,
    },
    headerBackIcon: {
        fontSize: 24,
        color: Colors.buttonColor,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        flex: 1,
        textAlign: 'center',
        marginLeft: 8,
        marginRight: 8,
    },
    headerRightSpacer: {
        width: 40,
    },

    // Hero Image
    heroImage: {
        width: '100%',
        height: 220, // Reduce height for less space
        resizeMode: 'cover',
    },

    // Layout
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 0,
    },
    contentWrapper: {
        flex: 1,
        paddingTop: 12,
        marginTop: 0,
    },

    // Title Section
    titleSection: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 4,
        paddingTop: 0,
        paddingBottom: 0,
        borderBottomWidth: 0,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 4,
        width: '100%',
        flexWrap: 'wrap',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    location: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        flex: 1,
    },

    // Price Preview Section
    pricePreviewSection: {
        backgroundColor: Colors.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    pricePreviewText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginRight: 8,
    },
    pricePreviewLabel: {
        fontSize: 16,
        color: Colors.secondary,
    },

    // Description
    descriptionSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: Colors.text,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.secondary,
    },

    // Bottom Spacer
    bottomSpacer: {
        height: 120,
    },

    // Bottom Bar
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingBottom: 34,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    priceInfo: {
        flex: 1,
    },
    priceText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.text,
    },
    priceLabel: {
        fontSize: 14,
        color: Colors.secondary,
    },
    bookButton: {
        backgroundColor: Colors.buttonColor,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    bookButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Back Button Overlay
    headerBackOverlay: {
        position: 'absolute',
        top: 56,
        left: 24,
        zIndex: 10,
    },

    // Featured Image
    featuredImage: {
        backgroundColor: '#eee',
    },
    noFeaturedImage: {
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 16,
    },
    noFeaturedImageText: {
        color: '#999',
        fontSize: 16,
    },

    // Gallery Section
    gallerySection: {
        marginBottom: 24,
    },
    galleryScroll: {
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        paddingLeft: 8,
    },
    galleryScrollContent: {
        alignItems: 'center',
    },
    galleryImage: {
        borderRadius: 16,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    noGalleryImage: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 16,
    },
    noGalleryImageText: {
        color: '#999',
        fontSize: 16,
    },
});

export default styles;
