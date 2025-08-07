import { ThemedText } from '@/components/ThemedText';
import { ThemeImage } from '@/components/ui/ThemeImage';
import { TouchableOpacity, View } from 'react-native';
import { adsCardStyles as styles } from './AdsCard.styles';
import { AdsCardProps } from './AdsCard.types';

export function ListingCard({ image, title, subtitle, onBookNow }: AdsCardProps) {
  return (
    <View style={styles.card}>
      <ThemeImage uri={image} width={400} height={250} quality={60} style={styles.image} />
      <TouchableOpacity style={styles.bookNow} onPress={onBookNow}>
        <ThemedText style={styles.bookNowText}>BOOK NOW</ThemedText>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
      </View>
    </View>
  );
}
