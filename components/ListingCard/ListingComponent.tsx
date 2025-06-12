import { ThemedText } from '@/components/ThemedText';
import { Image, TouchableOpacity, View } from 'react-native';
import { listingCardStyles as styles } from './ListingCard.styles';
import { ListingCardProps } from './ListingCard.types';

export function ListingCard({ image, title, subtitle, onBookNow }: ListingCardProps) {
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