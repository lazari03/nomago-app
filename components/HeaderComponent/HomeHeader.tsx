import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

type HomeHeaderProps = {
  style?: ViewStyle; // Add style prop
  showText?: boolean; // Optional prop to control text visibility
};

export function HomeHeader({ style, showText = true }: HomeHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {showText && (
        <View>
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 80, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 8 }}
            accessibilityLabel="Nomago Logo"
          />
          <Text style={styles.title}>HEY THERE{''}GLOBAL EXPLORER!</Text>
          <Text style={styles.subtitle}>Join the nomad life-style, made easy</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    paddingLeft: 10,
  },
  title: {
    alignContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 26,
    color: '#111',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#5a3aff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});