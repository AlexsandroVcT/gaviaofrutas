import type { HomeApiResponse } from '~/types/api';
import { getStoreClockLabel, getStoreStatus } from '~/utils/store-status';

function buildFallbackHomeData(): HomeApiResponse {
  const now = new Date();
  const fallbackStore = {
    id: 0,
    name: 'Gaviao Frutas',
    slug: 'gaviao-frutas',
    logoUrl: null,
    coverUrl: null,
    phone: '',
    whatsapp: '',
    instagram: '',
    googleMapsUrl: '',
    googlePlaceId: null,
    mapQuery: 'Gaviao Frutas',
    latitude: 0,
    longitude: 0,
    city: '',
    state: '',
    cityState: '',
    address: '',
    timeZone: 'America/Maceio',
    hours: [],
    specialHours: [],
    seoTitle: null,
    seoDescription: null,
  };

  return {
    store: fallbackStore,
    categories: [],
    products: [],
    featuredProducts: [],
    spotlights: [],
    offers: [],
    announcements: [],
    storeStatus: getStoreStatus(fallbackStore, now),
    storeClockLabel: getStoreClockLabel(fallbackStore, now),
    fetchedAt: now.toISOString(),
  };
}

export async function useHomeData() {
  try {
    const data = await $fetch<HomeApiResponse>('/api/home', {
      timeout: 5000,
    });

    const now = new Date();

    return {
      ...data,
      storeStatus: data.storeStatus ?? getStoreStatus(data.store, now),
      storeClockLabel: data.storeClockLabel ?? getStoreClockLabel(data.store, now),
    };
  } catch {
    return buildFallbackHomeData();
  }
}
