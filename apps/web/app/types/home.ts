export type NavItem = {
  label: string;
  href: string;
};

export type CategoryItem = {
  id: string;
  name: string;
  image: string;
};

export type ProductItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  rating: number;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
};

export type OfferItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
};

export type AnnouncementCtaType = 'maps' | 'whatsapp' | 'catalog' | 'custom';

export type AnnouncementVariant = {
  tag?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaType?: AnnouncementCtaType;
  ctaUrl?: string;
};

export type AnnouncementItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaType: AnnouncementCtaType;
  ctaUrl?: string;
  isActive: boolean;
  priority: number;
  weight: number;
  startAt?: string | null;
  endAt?: string | null;
  durationMs?: number;
  onlyWhenOpen?: boolean;
  closedVariant?: AnnouncementVariant;
};

export type StoreHour = {
  day: number; // 0 domingo, 6 sabado
  open: string | null; // HH:mm
  close: string | null; // HH:mm
};

export type StoreInfo = {
  name: string;
  cityState: string;
  address: string;
  phone: string;
  mapQuery: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  hours: StoreHour[];
};
