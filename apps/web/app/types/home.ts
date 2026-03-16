export type NavItem = {
  label: string;
  href: string;
};

export type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type ProductItem = {
  id: number;
  categoryId: number;
  categorySlug: string;
  categoryName: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  unit: string;
  imageUrl: string | null;
  isActive: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  sortOrder: number;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
};

export type OfferItem = {
  id: number;
  title: string;
  description: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  imageUrl: string | null;
  isActive: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  priority: number;
  productId?: number | null;
  categoryId?: number | null;
};

export type AnnouncementCtaType = 'maps' | 'whatsapp' | 'catalog' | 'custom';

export type AnnouncementVariant = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaType?: AnnouncementCtaType;
  ctaUrl?: string | null;
};

export type AnnouncementItem = {
  id: number;
  tag: string | null;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  ctaLabel: string;
  ctaType: AnnouncementCtaType;
  ctaUrl?: string | null;
  isActive: boolean;
  priority: number;
  weight: number;
  startsAt?: string | null;
  endsAt?: string | null;
  durationMs?: number;
  onlyWhenOpen?: boolean;
  closedVariant?: AnnouncementVariant;
};

export type StoreHour = {
  day: number;
  open: string | null;
  close: string | null;
};

export type StoreSpecialHour = {
  date: string;
  open: string | null;
  close: string | null;
  note?: string;
};

export type StoreStatus = {
  isOpen: boolean;
  text: string;
  nextText: string;
};

export type StoreInfo = {
  id: number;
  name: string;
  slug: string;
  logoUrl: string | null;
  coverUrl: string | null;
  phone: string;
  whatsapp: string;
  instagram: string;
  googleMapsUrl: string;
  googlePlaceId: string | null;
  mapQuery: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  cityState: string;
  address: string;
  timeZone: string;
  hours: StoreHour[];
  specialHours?: StoreSpecialHour[];
  seoTitle: string | null;
  seoDescription: string | null;
};
