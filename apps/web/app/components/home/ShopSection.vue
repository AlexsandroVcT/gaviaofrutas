<script setup lang="ts">
import type { BenefitItem, CategoryItem, ProductItem } from "~/types/home";

const props = defineProps<{
  categories: CategoryItem[];
  products: ProductItem[];
  benefits: BenefitItem[];
  whatsappPhone?: string;
}>();
</script>

<template>
  <section class="shop-section" aria-label="Area de compras">
    <div class="shop-main">
      <div class="catalog-shell">
        <CategoriesSection :categories="props.categories" embedded />
        <div class="catalog-divider" />
        <ProductShowcase :products="props.products" :whatsapp-phone="props.whatsappPhone" embedded />
      </div>

      <div class="sidebar-shell">
        <CartSidebar :whatsapp-phone="props.whatsappPhone" />
      </div>
    </div>

    <BenefitsSection class="benefits-shell" :benefits="props.benefits" compact />
  </section>
</template>

<style scoped>
.shop-section {
  display: grid;
  gap: 16px;
}

.shop-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(310px, 28vw, 360px);
  gap: 16px;
  align-items: start;
}

.catalog-shell,
.sidebar-shell {
  min-width: 0;
}

.catalog-shell {
  border: 1px solid var(--border-1);
  border-radius: 24px;
  background:
    radial-gradient(circle at 76% 14%, rgba(99, 190, 73, 0.12) 0%, transparent 34%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 95%, transparent), color-mix(in srgb, var(--surface-2) 88%, transparent));
  box-shadow: var(--shadow-1);
  padding: 18px;
  display: grid;
  gap: 16px;
}

.catalog-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-1), transparent);
}

.sidebar-shell {
  min-width: 0;
}

@media (max-width: 1180px) {
  .shop-main {
    grid-template-columns: minmax(0, 1fr) clamp(290px, 30vw, 330px);
  }
}

@media (max-width: 1023px) {
  .shop-main {
    grid-template-columns: 1fr;
  }

  .sidebar-shell {
    display: none;
  }
}

@media (max-width: 780px) {
  .catalog-shell {
    border-radius: 20px;
    padding: 14px;
    gap: 14px;
  }

  .shop-section,
  .shop-main {
    gap: 14px;
  }
}

@media (max-width: 560px) {
  .catalog-shell {
    border-radius: 16px;
    padding: 12px 10px;
    gap: 12px;
  }
}
</style>
