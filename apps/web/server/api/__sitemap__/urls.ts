type AnnouncementResponse = {
  items?: Array<{ slug: string }>;
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl || 'https://gaviaofrutas.com.br').replace(/\/$/, '');
  const apiBase = (config.public.apiBase || '').replace(/\/$/, '');
  const announcementsUrl = apiBase ? `${apiBase}/api/announcements` : '/api/announcements';
  const now = new Date().toISOString();

  let announcementSlugs: string[] = [];

  try {
    const response = await $fetch<AnnouncementResponse>(announcementsUrl, { timeout: 3500 });

    if (response.items?.length) {
      announcementSlugs = response.items.map((item) => item.slug);
    }
  } catch {
    // keep homepage URL only
  }

  const urls = [
    {
      loc: `${siteUrl}/`,
      lastmod: now,
      changefreq: 'daily',
      priority: 1,
    },
    ...announcementSlugs.map((slug) => ({
      loc: `${siteUrl}/anuncios/${slug}`,
      lastmod: now,
      changefreq: 'daily',
      priority: 0.7,
    })),
  ];

  return urls;
});
