export interface ListingSlide {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  description: string;
  price?: number;
  location?: string;
  featured: boolean;
  imageUrls: string[];
  categoryId?: number;
  categoryName?: string;
}

export interface ListingCardProps {
  slides?: ListingSlide[];
  onBookNow?: (slide: ListingSlide) => void;
}