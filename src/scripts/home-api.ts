import express from 'express';
import { getStoreClockLabel, getStoreStatus } from './store-status';
import {
  getPublicAnnouncements,
  getPublicCategories,
  getPublicFeaturedProducts,
  getPublicOffers,
  getPublicProducts,
  getPublicSpotlights,
  getPublicStoreProfile,
} from './public-home';

export const homeApi = express.Router();

type EventCounter = {
  count: number;
  lastAt: string;
};

const eventCounters = new Map<string, EventCounter>();

function incrementEventCounter(key: string) {
  const now = new Date().toISOString();
  const current = eventCounters.get(key);

  if (!current) {
    eventCounters.set(key, { count: 1, lastAt: now });
    return;
  }

  current.count += 1;
  current.lastAt = now;
  eventCounters.set(key, current);
}

homeApi.get('/api/home', async (_req, res, next) => {
  try {
    const now = new Date();
    const [store, categories, products, featuredProducts, spotlights, offers, announcements] = await Promise.all([
      getPublicStoreProfile(),
      getPublicCategories(),
      getPublicProducts(),
      getPublicFeaturedProducts(),
      getPublicSpotlights(now),
      getPublicOffers(now),
      getPublicAnnouncements(now),
    ]);

    if (!store) {
      res.status(503).json({ message: 'Store profile is not configured' });
      return;
    }

    res.status(200).json({
      store,
      categories,
      products,
      featuredProducts,
      spotlights,
      offers,
      announcements,
      storeStatus: getStoreStatus(store, now),
      storeClockLabel: getStoreClockLabel(store, now),
      fetchedAt: now.toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

homeApi.get('/api/announcements', async (_req, res, next) => {
  try {
    const items = await getPublicAnnouncements(new Date());

    res.status(200).json({
      items,
      total: items.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

homeApi.get('/api/products', async (req, res, next) => {
  try {
    const { category, featured, limit } = req.query;

    let items = await getPublicProducts({ featuredOnly: featured === 'true' });

    if (typeof category === 'string' && category.trim()) {
      const categoryFilter = category.trim();
      items = items.filter(
        (item) => item.categorySlug === categoryFilter || String(item.categoryId) === categoryFilter,
      );
    }

    if (typeof limit === 'string') {
      const parsedLimit = Number.parseInt(limit, 10);
      if (Number.isFinite(parsedLimit) && parsedLimit > 0) {
        items = items.slice(0, parsedLimit);
      }
    }

    res.status(200).json({ items, total: items.length });
  } catch (error) {
    next(error);
  }
});

homeApi.get('/api/categories', async (_req, res, next) => {
  try {
    const items = await getPublicCategories();
    res.status(200).json({ items, total: items.length });
  } catch (error) {
    next(error);
  }
});

homeApi.get('/api/store/status', async (_req, res, next) => {
  try {
    const now = new Date();
    const store = await getPublicStoreProfile();

    if (!store) {
      res.status(503).json({ message: 'Store profile is not configured' });
      return;
    }

    res.status(200).json({
      store,
      storeStatus: getStoreStatus(store, now),
      storeClockLabel: getStoreClockLabel(store, now),
      fetchedAt: now.toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

homeApi.post('/api/events', (req, res) => {
  const { eventType, itemId, source } = req.body ?? {};

  if (typeof eventType !== 'string' || !eventType.trim()) {
    res.status(400).json({ message: 'eventType is required' });
    return;
  }

  const safeType = eventType.trim().slice(0, 64);
  const safeItemId = typeof itemId === 'string' && itemId.trim() ? itemId.trim().slice(0, 80) : 'unknown';
  const safeSource = typeof source === 'string' && source.trim() ? source.trim().slice(0, 64) : 'web';
  const key = `${safeType}::${safeItemId}::${safeSource}`;

  incrementEventCounter(key);

  res.status(202).json({
    ok: true,
    eventType: safeType,
    itemId: safeItemId,
    source: safeSource,
    receivedAt: new Date().toISOString(),
  });
});

homeApi.get('/api/events/summary', (_req, res) => {
  const items = Array.from(eventCounters.entries())
    .map(([key, value]) => ({
      key,
      count: value.count,
      lastAt: value.lastAt,
    }))
    .sort((a, b) => b.count - a.count);

  res.status(200).json({
    totalEvents: items.reduce((sum, item) => sum + item.count, 0),
    keys: items.length,
    items,
  });
});
