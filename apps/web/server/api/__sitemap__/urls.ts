import { announcements as fallbackAnnouncements } from '../../../app/data/home';

type AnnouncementResponse = {
  items?: Array<{ id: string }>;
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl || 'https://gaviaofrutas.com.br').replace(/\/$/, '');
  const apiBase = (config.public.apiBase || '').replace(/\/$/, '');
  const now = new Date().toISOString();

  let announcementIds = fallbackAnnouncements.map((item) => item.id);

  if (apiBase) {
    try {
      const response = await $fetch<AnnouncementResponse>(`${apiBase}/api/announcements`, { timeout: 3500 });

      if (response.items?.length) {
        announcementIds = response.items.map((item) => item.id);
      }
    } catch {
      // keep fallback announcement IDs
    }
  }

  const urls = [
    {
      loc: `${siteUrl}/`,
      lastmod: now,
      changefreq: 'daily',
      priority: 1,
    },
    ...announcementIds.map((id) => ({
      loc: `${siteUrl}/anuncios/${id}`,
      lastmod: now,
      changefreq: 'daily',
      priority: 0.7,
    })),
  ];

  return urls;
});
