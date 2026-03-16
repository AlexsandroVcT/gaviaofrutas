import { MigrationInterface, QueryRunner } from 'typeorm';
import { categorySeeds, inventorySeeds, productSeeds } from '../data/public-catalog-seed';

export class SyncExpandedPublicCatalog1761000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(): Promise<void> {
    // No-op on purpose. This migration syncs a live public catalog and should not
    // remove product rows from an existing production database during rollback.
  }
}
