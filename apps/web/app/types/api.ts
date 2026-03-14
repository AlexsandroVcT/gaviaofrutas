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
  menuItems: NavItem[];
  heroHighlights: string[];
  categories: CategoryItem[];
  products: ProductItem[];
  benefits: BenefitItem[];
  offers: OfferItem[];
  freshProducts?: ProductItem[];
  freshProductsSelectedAt?: string;
  announcements: AnnouncementItem[];
  store: StoreInfo;
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
