import { Image, StyleSheet, View } from 'react-native';

export function HomeTopBar() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <View style={styles.statusIcons}>
        {/* You can add status icons here, e.g. wifi, battery, etc. */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logo: {
    width: 80,
    height: 32,
    resizeMode: 'contain',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
