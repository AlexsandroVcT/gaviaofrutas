import type { HomeApiResponse } from '~/types/api';
import { getStoreClockLabel, getStoreStatus } from '~/utils/store-status';
import {
  announcements as fallbackAnnouncements,
  benefits as fallbackBenefits,
  categories as fallbackCategories,
  heroHighlights as fallbackHighlights,
  menuItems as fallbackMenuItems,
  offers as fallbackOffers,
  products as fallbackProducts,
  store as fallbackStore,
} from '~/data/home';

function buildFallbackHomeData(): HomeApiResponse {
  const now = new Date();

  return {
    menuItems: fallbackMenuItems,
    heroHighlights: fallbackHighlights,
    categories: fallbackCategories,
    products: fallbackProducts,
    benefits: fallbackBenefits,
    offers: fallbackOffers,
    announcements: fallbackAnnouncements,
    store: fallbackStore,
    storeStatus: getStoreStatus(fallbackStore, now),
    storeClockLabel: getStoreClockLabel(fallbackStore, now),
    fetchedAt: now.toISOString(),
  };
}

function buildApiUrl(apiBase: string) {
  if (!apiBase) return '/api/home';
  return `${apiBase.replace(/\/$/, '')}/api/home`;
}

export async function useHomeData() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || '';

  try {
    const data = await $fetch<HomeApiResponse>(buildApiUrl(apiBase), {
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
