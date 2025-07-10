export interface ListingSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface ListingCardProps {
  slides?: ListingSlide[];
  onBookNow?: (slide: ListingSlide) => void;
}