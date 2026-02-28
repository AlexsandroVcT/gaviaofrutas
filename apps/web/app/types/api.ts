import type {
  BenefitItem,
  CategoryItem,
  NavItem,
  OfferItem,
  ProductItem,
} from '~/types/home';

export type HomeApiResponse = {
  menuItems: NavItem[];
  heroHighlights: string[];
  categories: CategoryItem[];
  products: ProductItem[];
  benefits: BenefitItem[];
  offers: OfferItem[];
  fetchedAt?: string;
};
