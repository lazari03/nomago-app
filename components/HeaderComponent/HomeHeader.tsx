import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, View } from 'react-native';

export function HomeHeader() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        HEY THERE{'\n'}GLOBAL EXPLORER!
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Join the nomad life-style, made easy
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#111',
    marginBottom: 6,
  },
  subtitle: {
    color: '#5a3aff',
    fontSize: 15,
    fontWeight: '500',
  },
});