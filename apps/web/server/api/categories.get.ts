import { proxyCatalogGet } from '../utils/catalog-api';

type CategoriesApiResponse = {
  items: unknown[];
  total: number;
};

export default defineEventHandler(async (event) => {
  return proxyCatalogGet<CategoriesApiResponse>(event, '/api/categories');
});
