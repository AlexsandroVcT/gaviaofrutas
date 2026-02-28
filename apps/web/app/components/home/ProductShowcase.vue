<script setup lang="ts">
import type { ProductItem } from "~/types/home";
import { formatPrice } from "~/utils/format";

const props = defineProps<{
  products: ProductItem[];
}>();

function buildWhatsAppLink(product: ProductItem) {
  const message = `Ola! Quero pedir ${product.name} (${product.unit}).`;
  return `https://wa.me/5582999999999?text=${encodeURIComponent(message)}`;
}
</script>

<template>
  <section id="produtos" class="showcase-section">
    <div class="section-head">
      <h2>Produtos em destaque</h2>
      <a href="#produtos">Ver mais produtos</a>
    </div>

    <div class="products-grid">
      <article v-for="product in props.products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" loading="lazy" />

        <div class="product-body">
          <h3>{{ product.name }} <span>({{ product.unit }})</span></h3>
          <p class="rating">{{ "★".repeat(product.rating) }}</p>
          <strong>{{ formatPrice(product.price) }}</strong>
        </div>

        <a
          class="order-btn"
          :href="buildWhatsAppLink(product)"
          target="_blank"
          rel="noreferrer"
        >
          Pedir no WhatsApp
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.showcase-section {
  margin-top: 20px;
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
  background: var(--surface-1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.product-card {
  border: 1px solid var(--border-1);
  border-radius: 18px;
  background: var(--surface-1);
  box-shadow: var(--shadow-2);
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.product-card img {
  width: 100%;
  height: 122px;
  object-fit: contain;
}

.product-body {
  margin-top: 8px;
}

.product-card h3 {
  margin: 0;
  line-height: 1.1;
  font-size: 1.55rem;
}

.product-card h3 span {
  color: var(--text-3);
  font-size: 0.94rem;
}

.rating {
  margin: 8px 0;
  color: #ffc62f;
  letter-spacing: 2px;
}

.product-card strong {
  font-size: 1.2rem;
}

.order-btn {
  margin-top: 12px;
  border-radius: 999px;
  padding: 11px 12px;
  background: var(--cta-gradient);
  color: #fff;
  text-align: center;
  font-weight: 700;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
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

  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-card h3 {
    font-size: 1.35rem;
  }
}
</style>
