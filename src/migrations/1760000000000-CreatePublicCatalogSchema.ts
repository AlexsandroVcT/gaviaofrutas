import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  announcementSeeds,
  categorySeeds,
  homeSpotlightSeeds,
  inventorySeeds,
  offerSeeds,
  productSeeds,
  storeProfileSeed,
} from '../data/public-catalog-seed';

export class CreatePublicCatalogSchema1760000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS store_profile (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        slug VARCHAR(160) NOT NULL UNIQUE,
        logo_url TEXT NULL,
        cover_url TEXT NULL,
        phone VARCHAR(30) NULL,
        whatsapp VARCHAR(30) NULL,
        instagram VARCHAR(120) NULL,
        google_maps_url TEXT NULL,
        google_place_id VARCHAR(255) NULL,
        map_query VARCHAR(255) NULL,
        latitude NUMERIC(10,7) NULL,
        longitude NUMERIC(10,7) NULL,
        city VARCHAR(120) NULL,
        state VARCHAR(2) NULL,
        seo_title VARCHAR(255) NULL,
        seo_description TEXT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        slug VARCHAR(140) NOT NULL UNIQUE,
        image_url TEXT NULL,
        description TEXT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS products (
        id BIGSERIAL PRIMARY KEY,
        category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
        name VARCHAR(160) NOT NULL,
        slug VARCHAR(180) NOT NULL UNIQUE,
        short_description TEXT NULL,
        unit VARCHAR(20) NOT NULL DEFAULT 'un',
        image_url TEXT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        is_featured BOOLEAN NOT NULL DEFAULT false,
        is_available BOOLEAN NOT NULL DEFAULT true,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id BIGSERIAL PRIMARY KEY,
        product_id BIGINT NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
        stock_quantity NUMERIC(10,3) NULL,
        is_available BOOLEAN NOT NULL DEFAULT true,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS offers (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(180) NOT NULL,
        description TEXT NULL,
        cta_label VARCHAR(80) NULL,
        cta_url TEXT NULL,
        image_url TEXT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        starts_at TIMESTAMPTZ NULL,
        ends_at TIMESTAMPTZ NULL,
        priority INTEGER NOT NULL DEFAULT 0,
        product_id BIGINT NULL REFERENCES products(id) ON DELETE SET NULL,
        category_id BIGINT NULL REFERENCES categories(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id BIGSERIAL PRIMARY KEY,
        tag VARCHAR(60) NULL,
        title VARCHAR(180) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        description TEXT NULL,
        image_url TEXT NULL,
        cta_type VARCHAR(30) NULL,
        cta_url TEXT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        starts_at TIMESTAMPTZ NULL,
        ends_at TIMESTAMPTZ NULL,
        priority INTEGER NOT NULL DEFAULT 0,
        weight INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS home_spotlights (
        id BIGSERIAL PRIMARY KEY,
        product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        is_active BOOLEAN NOT NULL DEFAULT true,
        priority INTEGER NOT NULL DEFAULT 0,
        starts_at TIMESTAMPTZ NULL,
        ends_at TIMESTAMPTZ NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      INSERT INTO store_profile (
        name, slug, logo_url, cover_url, phone, whatsapp, instagram, google_maps_url,
        google_place_id, map_query, latitude, longitude, city, state, seo_title, seo_description, is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, true)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        logo_url = EXCLUDED.logo_url,
        cover_url = EXCLUDED.cover_url,
        phone = EXCLUDED.phone,
        whatsapp = EXCLUDED.whatsapp,
        instagram = EXCLUDED.instagram,
        google_maps_url = EXCLUDED.google_maps_url,
        google_place_id = EXCLUDED.google_place_id,
        map_query = EXCLUDED.map_query,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        seo_title = EXCLUDED.seo_title,
        seo_description = EXCLUDED.seo_description,
        is_active = EXCLUDED.is_active,
        updated_at = now()
    `, [
      storeProfileSeed.name,
      storeProfileSeed.slug,
      storeProfileSeed.logoUrl,
      storeProfileSeed.coverUrl,
      storeProfileSeed.phone,
      storeProfileSeed.whatsapp,
      storeProfileSeed.instagram,
      storeProfileSeed.googleMapsUrl,
      storeProfileSeed.googlePlaceId,
      storeProfileSeed.mapQuery,
      storeProfileSeed.latitude,
      storeProfileSeed.longitude,
      storeProfileSeed.city,
      storeProfileSeed.state,
      storeProfileSeed.seoTitle,
      storeProfileSeed.seoDescription,
    ]);

    for (const category of categorySeeds) {
      await queryRunner.query(`
        INSERT INTO categories (name, slug, image_url, description, sort_order, is_active)
        VALUES ($1, $2, $3, $4, $5, true)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          image_url = EXCLUDED.image_url,
          description = EXCLUDED.description,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active,
          updated_at = now()
      `, [category.name, category.slug, category.imageUrl, category.description, category.sortOrder]);
    }

    for (const product of productSeeds) {
      await queryRunner.query(`
        INSERT INTO products (
          category_id, name, slug, short_description, unit, image_url, is_active, is_featured, is_available, sort_order
        )
        VALUES (
          (SELECT id FROM categories WHERE slug = $1),
          $2, $3, $4, $5, $6, true, $7, $8, $9
        )
        ON CONFLICT (slug) DO UPDATE SET
          category_id = EXCLUDED.category_id,
          name = EXCLUDED.name,
          short_description = EXCLUDED.short_description,
          unit = EXCLUDED.unit,
          image_url = EXCLUDED.image_url,
          is_active = EXCLUDED.is_active,
          is_featured = EXCLUDED.is_featured,
          is_available = EXCLUDED.is_available,
          sort_order = EXCLUDED.sort_order,
          updated_at = now()
      `, [
        product.categorySlug,
        product.name,
        product.slug,
        product.shortDescription,
        product.unit,
        product.imageUrl,
        product.isFeatured,
        product.isAvailable,
        product.sortOrder,
      ]);
    }

    for (const inventory of inventorySeeds) {
      await queryRunner.query(`
        INSERT INTO inventory (product_id, stock_quantity, is_available, updated_at)
        VALUES ((SELECT id FROM products WHERE slug = $1), $2, $3, now())
        ON CONFLICT (product_id) DO UPDATE SET
          stock_quantity = EXCLUDED.stock_quantity,
          is_available = EXCLUDED.is_available,
          updated_at = now()
      `, [inventory.productSlug, inventory.stockQuantity, inventory.isAvailable]);
    }

    for (const offer of offerSeeds) {
      await queryRunner.query(`
        INSERT INTO offers (
          title, description, cta_label, cta_url, image_url, is_active, starts_at, ends_at, priority, product_id, category_id
        )
        VALUES (
          $1, $2, $3, $4, $5, true, NULL, NULL, $6,
          NULL,
          (SELECT id FROM categories WHERE slug = $7)
        )
        ON CONFLICT DO NOTHING
      `, [offer.title, offer.description, offer.ctaLabel, offer.ctaUrl, offer.imageUrl, offer.priority, offer.categorySlug]);
    }

    for (const announcement of announcementSeeds) {
      await queryRunner.query(`
        INSERT INTO announcements (
          tag, title, slug, description, image_url, cta_type, cta_url, is_active, starts_at, ends_at, priority, weight
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, true, NULL, NULL, $8, $9)
        ON CONFLICT (slug) DO UPDATE SET
          tag = EXCLUDED.tag,
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          image_url = EXCLUDED.image_url,
          cta_type = EXCLUDED.cta_type,
          cta_url = EXCLUDED.cta_url,
          is_active = EXCLUDED.is_active,
          starts_at = EXCLUDED.starts_at,
          ends_at = EXCLUDED.ends_at,
          priority = EXCLUDED.priority,
          weight = EXCLUDED.weight,
          updated_at = now()
      `, [
        announcement.tag,
        announcement.title,
        announcement.slug,
        announcement.description,
        announcement.imageUrl,
        announcement.ctaType,
        announcement.ctaUrl,
        announcement.priority,
        announcement.weight,
      ]);
    }

    for (const spotlight of homeSpotlightSeeds) {
      await queryRunner.query(`
        INSERT INTO home_spotlights (product_id, is_active, priority, starts_at, ends_at)
        SELECT p.id, true, $2, NULL, NULL
        FROM products p
        WHERE p.slug = $1
          AND NOT EXISTS (
            SELECT 1
            FROM home_spotlights hs
            WHERE hs.product_id = p.id
          )
      `, [spotlight.productSlug, spotlight.priority]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS home_spotlights');
    await queryRunner.query('DROP TABLE IF EXISTS announcements');
    await queryRunner.query('DROP TABLE IF EXISTS offers');
    await queryRunner.query('DROP TABLE IF EXISTS inventory');
    await queryRunner.query('DROP TABLE IF EXISTS products');
    await queryRunner.query('DROP TABLE IF EXISTS categories');
    await queryRunner.query('DROP TABLE IF EXISTS store_profile');
  }
}
