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
