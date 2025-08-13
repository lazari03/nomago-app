import { Image, StyleSheet, View } from 'react-native';

function Logo() {
  return (
    <Image
      source={require('@/assets/images/header-logo.png')}
      style={{ width: 120, height: 40 }}
      resizeMode="contain"
    />
  );
}

export function HomeLogo() {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
