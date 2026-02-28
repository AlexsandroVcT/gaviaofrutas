import type {
  AnnouncementItem,
  BenefitItem,
  CategoryItem,
  NavItem,
  OfferItem,
  ProductItem,
  StoreInfo,
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
  fetchedAt?: string;
};
