<script setup lang="ts">
import type { ProductItem } from "~/types/home";

const props = defineProps<{
  products: ProductItem[];
  title?: string;
  activeCategoryName?: string | null;
  moreHref?: string;
  moreLabel?: string;
  hideMoreLink?: boolean;
  emptyStateText?: string;
  whatsappPhone?: string;
  embedded?: boolean;
}>();
</script>

<template>
  <section id="produtos" :class="['showcase-section', { embedded: props.embedded }]">
    <div class="section-head">
      <div class="section-copy">
        <h2>{{ props.title || 'Produtos em destaque' }}</h2>
        <p v-if="props.activeCategoryName" class="section-filter">{{ props.activeCategoryName }}</p>
      </div>
      <a v-if="!props.hideMoreLink" :href="props.moreHref || '/produtos'">{{ props.moreLabel || 'Ver mais produtos' }}</a>
    </div>

    <div v-if="props.products.length" class="products-grid">
      <ProductCard
        v-for="product in props.products"
        :key="product.id"
        :product="product"
        :whatsapp-phone="props.whatsappPhone"
      />
    </div>

    <div v-else class="empty-state">
      {{ props.emptyStateText || 'Nenhum produto disponivel nesta categoria agora.' }}
    </div>
  </section>
</template>

<style scoped>
.showcase-section {
  min-width: 0;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}

.section-head h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.section-copy {
  display: grid;
  gap: 4px;
}

.section-filter {
  margin: 0;
  color: var(--brand-1);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.section-head a {
  border: 1px solid var(--border-1);
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 700;
  color: var(--text-2);
  background: color-mix(in srgb, var(--surface-1) 90%, transparent);
  white-space: nowrap;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  min-width: 0;
  align-items: stretch;
}

.empty-state {
  border: 1px dashed var(--border-1);
  border-radius: 18px;
  padding: 28px 18px;
  text-align: center;
  color: var(--text-2);
  background: color-mix(in srgb, var(--surface-1) 88%, transparent);
}

@media (max-width: 860px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .section-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-head a {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 520px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
