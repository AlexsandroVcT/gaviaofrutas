import { proxyCatalogGet } from '../../utils/catalog-api';

export default defineEventHandler(async (event) => {
  return proxyCatalogGet(event, '/api/events/summary');
});
