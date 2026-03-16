import type { HomeApiResponse } from '~/types/api';
import { benefits, heroHighlights, menuItems } from '~/data/site';
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

function buildApiUrl(apiBase: string) {
  if (!apiBase) return '/api/home';
  return `${apiBase.replace(/\/$/, '')}/api/home`;
}

function buildHomeApiCandidates(apiBase: string) {
  const candidates = [buildApiUrl(apiBase)];

  if (import.meta.dev) {
    candidates.push('http://127.0.0.1:3001/api/home');
    candidates.push('http://localhost:3001/api/home');
    candidates.push('/api/home');
  }

  return Array.from(new Set(candidates));
}

export async function useHomeData() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || '';
  const candidates = buildHomeApiCandidates(apiBase);

  for (const url of candidates) {
    try {
      const data = await $fetch<HomeApiResponse>(url, {
        timeout: 5000,
      });

      const now = new Date();

      return {
        ...data,
        storeStatus: data.storeStatus ?? getStoreStatus(data.store, now),
        storeClockLabel: data.storeClockLabel ?? getStoreClockLabel(data.store, now),
      };
    } catch {
      continue;
    }
  }

  return buildFallbackHomeData();
}

export const siteMenuItems = menuItems;
export const siteHeroHighlights = heroHighlights;
export const siteBenefits = benefits;
