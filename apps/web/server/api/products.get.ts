import { proxyCatalogGet } from '../utils/catalog-api';

type ProductsApiResponse = {
  items: unknown[];
  total: number;
};

export default defineEventHandler(async (event) => {
  return proxyCatalogGet<ProductsApiResponse>(event, '/api/products');
});
