import { ThemeImage } from '@/components/ui/ThemeImage';
import { StyleSheet, View } from 'react-native';

function Logo() {
  return (
    <ThemeImage
      uri={require('@/assets/images/header-logo.png')}
      width={120}
      height={40}
      quality={80}
      style={{ resizeMode: 'contain' }}
    />
  );
}

export function HomeDateBar() {
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
