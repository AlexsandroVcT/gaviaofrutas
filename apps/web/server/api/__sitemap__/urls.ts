type AnnouncementResponse = {
  items?: Array<{ slug: string }>;
};

type ProductsResponse = {
  items?: Array<{ slug: string }>;
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl || 'https://gaviaofrutas.com.br').replace(/\/$/, '');
  const now = new Date().toISOString();

  let announcementSlugs: string[] = [];
  let productSlugs: string[] = [];

  try {
    const response = await $fetch<AnnouncementResponse>('/api/announcements', { timeout: 3500 });

    if (response.items?.length) {
      announcementSlugs = response.items.map((item) => item.slug);
    }
  } catch {
    // keep homepage URL only
  }

  try {
    const response = await $fetch<ProductsResponse>('/api/products', { timeout: 3500 });

    if (response.items?.length) {
      productSlugs = response.items.map((item) => item.slug);
    }
  } catch {
    // keep base URLs only
  }

  const urls = [
    {
      loc: `${siteUrl}/`,
      lastmod: now,
      changefreq: 'daily',
      priority: 1,
    },
    {
      loc: `${siteUrl}/produtos`,
      lastmod: now,
      changefreq: 'daily',
      priority: 0.9,
    },
    ...announcementSlugs.map((slug) => ({
      loc: `${siteUrl}/anuncios/${slug}`,
      lastmod: now,
      changefreq: 'daily',
      priority: 0.7,
    })),
    ...productSlugs.map((slug) => ({
      loc: `${siteUrl}/produtos/${slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.8,
    })),
  ];

  return urls;
});
