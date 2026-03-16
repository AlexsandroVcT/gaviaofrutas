import { proxyCatalogPost } from '../utils/catalog-api';

export default defineEventHandler(async (event) => {
  return proxyCatalogPost(event, '/api/events');
});
