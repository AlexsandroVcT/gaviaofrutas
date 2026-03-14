<script setup lang="ts">
import type { ProductItem } from "~/types/home";

const props = defineProps<{
  products: ProductItem[];
  whatsappPhone?: string;
  embedded?: boolean;
}>();
</script>

<template>
  <section id="produtos" :class="['showcase-section', { embedded: props.embedded }]">
    <div class="section-head">
      <h2>Produtos em destaque</h2>
      <a href="#produtos">Ver mais produtos</a>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in props.products"
        :key="product.id"
        :product="product"
        :whatsapp-phone="props.whatsappPhone"
      />
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
