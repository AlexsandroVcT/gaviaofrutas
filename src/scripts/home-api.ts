import express from 'express';
import {
  announcements,
  benefits,
  categories,
  heroHighlights,
  menuItems,
  offers,
  products,
  store,
} from '../data/home-catalog';

export const homeApi = express.Router();

type EventCounter = {
  count: number;
  lastAt: string;
};

const eventCounters = new Map<string, EventCounter>();

function isAnnouncementLive(
  announcement: {
    isActive: boolean;
    startAt?: string | null;
    endAt?: string | null;
  },
  now: Date,
) {
  if (!announcement.isActive) return false;

  if (announcement.startAt) {
    const start = new Date(announcement.startAt);
    if (!Number.isNaN(start.getTime()) && now < start) return false;
  }

  if (announcement.endAt) {
    const end = new Date(announcement.endAt);
    if (!Number.isNaN(end.getTime()) && now > end) return false;
  }

  return true;
}

function getActiveAnnouncements() {
  const now = new Date();

  return announcements
    .filter((item) => isAnnouncementLive(item, now))
    .sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (b.weight !== a.weight) return b.weight - a.weight;
      return a.id.localeCompare(b.id);
    });
}

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

homeApi.get('/api/home', (_req, res) => {
  res.status(200).json({
    menuItems,
    heroHighlights,
    categories,
    products,
    benefits,
    offers,
    announcements: getActiveAnnouncements(),
    store,
    fetchedAt: new Date().toISOString(),
  });
});

homeApi.get('/api/announcements', (_req, res) => {
  const items = getActiveAnnouncements();

  res.status(200).json({
    items,
    total: items.length,
    fetchedAt: new Date().toISOString(),
  });
});

homeApi.get('/api/products', (req, res) => {
  const { category, limit } = req.query;

  let result = products;

  if (typeof category === 'string' && category.trim()) {
    result = result.filter((item) => item.categoryId === category.trim());
  }

  if (typeof limit === 'string') {
    const parsedLimit = Number.parseInt(limit, 10);

    if (Number.isFinite(parsedLimit) && parsedLimit > 0) {
      result = result.slice(0, parsedLimit);
    }
  }

  res.status(200).json({ items: result, total: result.length });
});

homeApi.get('/api/categories', (_req, res) => {
  res.status(200).json({ items: categories, total: categories.length });
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
