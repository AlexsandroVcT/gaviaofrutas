import type { AnnouncementsApiResponse } from '~/types/api';
import { proxyCatalogGet } from '../utils/catalog-api';

export default defineEventHandler(async (event) => {
  return proxyCatalogGet<AnnouncementsApiResponse>(event, '/api/announcements');
});
