import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Header Styles
    headerOverlay: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 44, // Safe area top padding
        paddingHorizontal: 16,
        paddingBottom: 12,
        height: 100, // Adjust based on safe area
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
        height: 260,
        resizeMode: 'cover',
    },

    // Layout
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    // Title Section
    titleSection: {
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.text,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 16,
        color: Colors.secondary,
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
});

export default styles;
