import { StyleSheet } from 'react-native';

// Consistent back button styles across the app
export const BACK_BUTTON_STYLES = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    color: '#6C4DF6',
  },
});

// Consistent header positioning
export const HEADER_STYLES = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    minHeight: 80,
  },
  overlay: {
    position: 'absolute',
    top: 44,
    left: 16,
    zIndex: 10,
  },
});
