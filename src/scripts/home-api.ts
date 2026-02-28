import express from 'express';
import {
  benefits,
  categories,
  heroHighlights,
  menuItems,
  offers,
  products,
} from '../data/home-catalog';

export const homeApi = express.Router();

homeApi.get('/api/home', (_req, res) => {
  res.status(200).json({
    menuItems,
    heroHighlights,
    categories,
    products,
    benefits,
    offers,
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
