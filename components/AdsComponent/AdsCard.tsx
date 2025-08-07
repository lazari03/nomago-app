import { ThemedText } from '@/components/ThemedText';
import { Image, TouchableOpacity, View } from 'react-native';
import { adsCardStyles as styles } from './AdsCard.styles';
import { AdsCardProps } from './AdsCard.types';

export function ListingCard({ image, title, subtitle, onBookNow }: AdsCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
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
