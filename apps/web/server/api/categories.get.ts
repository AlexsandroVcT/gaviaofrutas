import type { CategoriesApiResponse } from '~/types/api';
import { proxyCatalogGet } from '../utils/catalog-api';

export default defineEventHandler(async (event) => {
  return proxyCatalogGet<CategoriesApiResponse>(event, '/api/categories');
});
