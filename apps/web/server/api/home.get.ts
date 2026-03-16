import type { HomeApiResponse } from '~/types/api';
import { proxyCatalogGet } from '../utils/catalog-api';

export default defineEventHandler(async (event) => {
  return proxyCatalogGet<HomeApiResponse>(event, '/api/home');
});
