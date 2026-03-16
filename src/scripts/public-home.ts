import { appDataSource } from '../database';
import { Announcement } from '../entities/Announcement';
import { Category } from '../entities/Category';
import { HomeSpotlight } from '../entities/HomeSpotlight';
import { Inventory } from '../entities/Inventory';
import { Offer } from '../entities/Offer';
import { Product } from '../entities/Product';
import { StoreProfile } from '../entities/StoreProfile';
import { storeGoogleMetadata } from '../config/store-google';

type DateWindowLike = {
  startsAt?: Date | null;
  endsAt?: Date | null;
};

function isActiveInWindow(item: DateWindowLike, now: Date) {
  if (item.startsAt && item.startsAt > now) return false;
  if (item.endsAt && item.endsAt < now) return false;
  return true;
}

function toNumber(value: string | number | null | undefined) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function buildAnnouncementCtaLabel(ctaType: string | null) {
  switch (ctaType) {
    case 'maps':
      return 'Tracar rota';
    case 'whatsapp':
      return 'Chamar no WhatsApp';
    case 'catalog':
      return 'Ver produtos';
    case 'custom':
      return 'Abrir link';
    default:
      return 'Saiba mais';
  }
}

export async function getPublicStoreProfile() {
  const repository = appDataSource.getRepository(StoreProfile);
  const profile = await repository.findOne({
    where: { isActive: true },
    order: { id: 'ASC' },
  });

  if (!profile) return null;

  const city = profile.city || '';
  const state = profile.state || '';
  const cityState = [city, state].filter(Boolean).join(' - ');

  return {
    id: toNumber(profile.id),
    name: profile.name,
    slug: profile.slug,
    logoUrl: profile.logoUrl,
    coverUrl: profile.coverUrl,
    phone: profile.phone || profile.whatsapp || '',
    whatsapp: profile.whatsapp || profile.phone || '',
    instagram: profile.instagram || '',
    googleMapsUrl: profile.googleMapsUrl || '',
    googlePlaceId: profile.googlePlaceId,
    mapQuery: profile.mapQuery || profile.name,
    latitude: profile.latitude ? Number(profile.latitude) : 0,
    longitude: profile.longitude ? Number(profile.longitude) : 0,
    city,
    state,
    cityState,
    address: storeGoogleMetadata.address,
    timeZone: storeGoogleMetadata.timeZone,
    hours: storeGoogleMetadata.hours,
    specialHours: storeGoogleMetadata.specialHours,
    seoTitle: profile.seoTitle,
    seoDescription: profile.seoDescription,
  };
}

export async function getPublicCategories() {
  const repository = appDataSource.getRepository(Category);
  const items = await repository.find({
    where: { isActive: true },
    order: { sortOrder: 'ASC', name: 'ASC' },
  });

  return items.map((item) => ({
    id: toNumber(item.id),
    name: item.name,
    slug: item.slug,
    imageUrl: item.imageUrl,
    description: item.description,
    sortOrder: item.sortOrder,
    isActive: item.isActive,
  }));
}

export async function getPublicFeaturedProducts() {
  return getPublicProducts({ featuredOnly: true });
}

type ProductQueryOptions = {
  featuredOnly?: boolean;
};

export async function getPublicProducts(options: ProductQueryOptions = {}) {
  const repository = appDataSource.getRepository(Product);
  const items = await repository.find({
    where: options.featuredOnly
      ? { isActive: true, isFeatured: true }
      : { isActive: true },
    relations: { category: true, inventory: true },
    order: { sortOrder: 'ASC', name: 'ASC' },
  });

  return items
    .filter((item) => item.isAvailable && (item.inventory?.isAvailable ?? true))
    .map((item) => ({
      id: toNumber(item.id),
      categoryId: toNumber(item.categoryId),
      categorySlug: item.category?.slug || '',
      name: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription,
      unit: item.unit,
      imageUrl: item.imageUrl,
      isActive: item.isActive,
      isFeatured: item.isFeatured,
      isAvailable: item.isAvailable && (item.inventory?.isAvailable ?? true),
      sortOrder: item.sortOrder,
    }));
}

export async function getPublicSpotlights(now = new Date()) {
  const repository = appDataSource.getRepository(HomeSpotlight);
  const items = await repository.find({
    where: { isActive: true },
    relations: { product: { category: true, inventory: true } },
    order: { priority: 'DESC', id: 'ASC' },
  });

  return items
    .filter((item) => isActiveInWindow(item, now))
    .filter((item) => item.product?.isActive)
    .filter((item) => item.product?.isAvailable && (item.product.inventory?.isAvailable ?? true))
    .map((item) => ({
      id: toNumber(item.product.id),
      categoryId: toNumber(item.product.categoryId),
      categorySlug: item.product.category?.slug || '',
      name: item.product.name,
      slug: item.product.slug,
      shortDescription: item.product.shortDescription,
      unit: item.product.unit,
      imageUrl: item.product.imageUrl,
      isActive: item.product.isActive,
      isFeatured: item.product.isFeatured,
      isAvailable: item.product.isAvailable && (item.product.inventory?.isAvailable ?? true),
      sortOrder: item.product.sortOrder,
    }));
}

export async function getPublicOffers(now = new Date()) {
  const repository = appDataSource.getRepository(Offer);
  const items = await repository.find({
    where: { isActive: true },
    order: { priority: 'DESC', id: 'ASC' },
  });

  return items
    .filter((item) => isActiveInWindow(item, now))
    .map((item) => ({
      id: toNumber(item.id),
      title: item.title,
      description: item.description,
      ctaLabel: item.ctaLabel,
      ctaUrl: item.ctaUrl,
      imageUrl: item.imageUrl,
      isActive: item.isActive,
      startsAt: item.startsAt?.toISOString() ?? null,
      endsAt: item.endsAt?.toISOString() ?? null,
      priority: item.priority,
      productId: item.productId ? toNumber(item.productId) : null,
      categoryId: item.categoryId ? toNumber(item.categoryId) : null,
    }));
}

export async function getPublicAnnouncements(now = new Date()) {
  const repository = appDataSource.getRepository(Announcement);
  const items = await repository.find({
    where: { isActive: true },
    order: { priority: 'DESC', weight: 'DESC', id: 'ASC' },
  });

  return items
    .filter((item) => isActiveInWindow(item, now))
    .map((item) => ({
      id: toNumber(item.id),
      tag: item.tag,
      title: item.title,
      slug: item.slug,
      description: item.description,
      imageUrl: item.imageUrl,
      ctaLabel: buildAnnouncementCtaLabel(item.ctaType),
      ctaType: item.ctaType === 'maps' || item.ctaType === 'whatsapp' || item.ctaType === 'catalog' || item.ctaType === 'custom'
        ? item.ctaType
        : 'custom',
      ctaUrl: item.ctaUrl,
      isActive: item.isActive,
      priority: item.priority,
      weight: item.weight,
      startsAt: item.startsAt?.toISOString() ?? null,
      endsAt: item.endsAt?.toISOString() ?? null,
    }));
}

export async function getInventoryAvailability() {
  const repository = appDataSource.getRepository(Inventory);
  return repository.find();
}
