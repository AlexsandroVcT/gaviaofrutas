import { proxyCatalogGet } from '../utils/catalog-api';

type AnnouncementsApiResponse = {
  items: unknown[];
  total: number;
  fetchedAt?: string;
};

export default defineEventHandler(async (event) => {
  return proxyCatalogGet<AnnouncementsApiResponse>(event, '/api/announcements');
});
