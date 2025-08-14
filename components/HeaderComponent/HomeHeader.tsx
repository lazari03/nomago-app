import { useTranslations } from '@/hooks/useTranslation';
import { L10n } from '@/utils/translationHelper';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

type HomeHeaderProps = {
  style?: ViewStyle; // Add style prop
  showText?: boolean; // Optional prop to control text visibility
};

export function HomeHeader({ style, showText = true }: HomeHeaderProps) {
  const { t } = useTranslations();
  return (
    <View style={[styles.container, style]}>
      {showText && (
        <View>
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 80, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 8 }}
            accessibilityLabel={t(L10n.common.nomagoLogo)}
          />
          <Text style={styles.title}>{t(L10n.homeHeader.title)}</Text>
          <Text style={styles.subtitle}>{t(L10n.homeHeader.subtitle)}</Text>
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