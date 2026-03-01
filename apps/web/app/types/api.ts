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
  announcements: AnnouncementItem[];
  store: StoreInfo;
  storeStatus?: StoreStatus;
  fetchedAt?: string;
};

export type StoreStatusApiResponse = {
  store: StoreInfo;
  storeStatus: StoreStatus;
  fetchedAt: string;
};
