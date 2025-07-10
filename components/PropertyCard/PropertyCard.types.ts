export interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  amenities: {
    bedType?: string;
    bathroom?: string;
    wifi?: boolean;
    breakfast?: boolean;
  };
  onPress?: () => void;
}
