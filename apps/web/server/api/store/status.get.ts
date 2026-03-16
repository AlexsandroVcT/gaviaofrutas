import type { StoreStatusApiResponse } from '~/types/api';
import { proxyCatalogGet } from '../../utils/catalog-api';

export default defineEventHandler(async (event) => {
  return proxyCatalogGet<StoreStatusApiResponse>(event, '/api/store/status');
});
