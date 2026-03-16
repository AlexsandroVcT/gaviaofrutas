import type {
  AnnouncementItem,
  BenefitItem,
  CategoryItem,
  NavItem,
  OfferItem,
  ProductItem,
  StoreInfo,
  StoreStatus,
} from '~/types/home';

export type HomeApiResponse = {
  store: StoreInfo;
  categories: CategoryItem[];
  products: ProductItem[];
  featuredProducts: ProductItem[];
  spotlights: ProductItem[];
  offers: OfferItem[];
  announcements: AnnouncementItem[];
  storeStatus?: StoreStatus;
  storeClockLabel?: string;
  fetchedAt?: string;
};

export type StoreStatusApiResponse = {
  store: StoreInfo;
  storeStatus: StoreStatus;
  storeClockLabel: string;
  fetchedAt: string;
};
