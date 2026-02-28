import type { HomeApiResponse } from '~/types/api';
import {
  benefits as fallbackBenefits,
  categories as fallbackCategories,
  heroHighlights as fallbackHighlights,
  menuItems as fallbackMenuItems,
  offers as fallbackOffers,
  products as fallbackProducts,
} from '~/data/home';

const FALLBACK_HOME_DATA: HomeApiResponse = {
  menuItems: fallbackMenuItems,
  heroHighlights: fallbackHighlights,
  categories: fallbackCategories,
  products: fallbackProducts,
  benefits: fallbackBenefits,
  offers: fallbackOffers,
};

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

    return data;
  } catch {
    return FALLBACK_HOME_DATA;
  }
}
