<script setup lang="ts">
import { computed, ref } from 'vue';
import { createError } from 'h3';
import { menuItems } from '~/data/site';
import { useCartStore } from '~/stores/cart';
import type { ProductsApiResponse, StoreStatusApiResponse } from '~/types/api';
import type { ProductItem, StoreInfo } from '~/types/home';

const route = useRoute();
const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalItems);
const isCartDrawerOpen = ref(false);
const slug = computed(() => String(route.params.slug || ''));

const fallbackStore: StoreInfo = {
  id: 0,
  name: 'Gaviao Frutas',
  slug: 'gaviao-frutas',
  logoUrl: null,
  coverUrl: null,
  phone: '',
  whatsapp: '',
  instagram: '',
  googleMapsUrl: '',
  googlePlaceId: null,
  mapQuery: 'Gaviao Frutas',
  latitude: 0,
  longitude: 0,
  city: '',
  state: '',
  cityState: '',
  address: '',
  timeZone: 'America/Maceio',
  hours: [],
  specialHours: [],
  seoTitle: null,
  seoDescription: null,
};

const { data } = await useAsyncData(
  () => `product-page:${slug.value}`,
  async () => {
    const [productsResponse, storeResponse] = await Promise.all([
      $fetch<ProductsApiResponse>('/api/products', {
        timeout: 5000,
        query: { slug: slug.value, limit: 1 },
      }),
      $fetch<StoreStatusApiResponse>('/api/store/status', { timeout: 5000 }),
    ]);

    return {
      product: productsResponse.items[0] ?? null,
      store: storeResponse.store,
    };
  },
);

const product = computed<ProductItem | null>(() => data.value?.product ?? null);
const store = computed<StoreInfo>(() => data.value?.store ?? fallbackStore);

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Produto nao encontrado',
  });
}

const whatsappHref = computed(() => {
  const message = `Ola! Quero pedir ${product.value?.name} (${product.value?.unit}).`;
  return `https://wa.me/${store.value.phone}?text=${encodeURIComponent(message)}`;
});

function addToCart() {
  if (!product.value) return;
  cartStore.add(product.value, 1);
}

useSeoMeta({
  title: () => `${product.value?.name || 'Produto'} | Gaviao Frutas`,
  description: () =>
    product.value?.shortDescription ||
    `Veja detalhes do produto ${product.value?.name || ''} no catalogo da Gaviao Frutas.`,
  ogTitle: () => `${product.value?.name || 'Produto'} | Gaviao Frutas`,
  ogDescription: () =>
    product.value?.shortDescription ||
    `Veja detalhes do produto ${product.value?.name || ''} no catalogo da Gaviao Frutas.`,
  ogImage: () => product.value?.imageUrl || '/imgs/logo-desktop.webp',
});
</script>

<template>
  <div class="product-page">
    <SiteHeader
      :menu-items="menuItems"
      :cart-count="cartCount"
      :whatsapp-phone="store.phone"
      @cart-click="isCartDrawerOpen = true"
    />

    <main class="product-main">
      <section class="product-shell">
        <div class="breadcrumb">
          <NuxtLink to="/">Inicio</NuxtLink>
          <span>/</span>
          <NuxtLink to="/produtos">Produtos</NuxtLink>
          <span>/</span>
          <NuxtLink :to="`/produtos?categoria=${product?.categorySlug}`">{{ product?.categoryName }}</NuxtLink>
        </div>

        <div class="product-layout">
          <div class="product-visual">
            <img :src="product?.imageUrl || '/imgs/logo-desktop.webp'" :alt="product?.name" loading="lazy" />
          </div>

          <div class="product-copy">
            <p class="eyebrow">{{ product?.categoryName }}</p>
            <h1>{{ product?.name }}</h1>
            <p class="unit">Unidade: {{ product?.unit }}</p>
            <p class="availability">
              {{ product?.isAvailable ? 'Disponivel para retirada' : 'Disponibilidade sob consulta' }}
            </p>
            <p v-if="product?.shortDescription" class="description">{{ product.shortDescription }}</p>

            <div class="actions">
              <button type="button" class="primary" @click="addToCart">Adicionar ao carrinho</button>
              <a class="secondary" :href="whatsappHref" target="_blank" rel="noreferrer">Pedir no WhatsApp</a>
            </div>

            <div class="meta-grid">
              <div class="meta-card">
                <span>Categoria</span>
                <strong>{{ product?.categoryName }}</strong>
              </div>
              <div class="meta-card">
                <span>Slug</span>
                <strong>{{ product?.slug }}</strong>
              </div>
              <div class="meta-card">
                <span>Retirada</span>
                <strong>{{ store.cityState }}</strong>
              </div>
              <div class="meta-card">
                <span>Canal rapido</span>
                <strong>WhatsApp</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <CartDrawer v-model:open="isCartDrawerOpen" :whatsapp-phone="store.phone" />
  </div>
</template>

<style scoped>
.product-page {
  min-height: 100vh;
}

.product-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 22px 18px 30px;
}

.product-shell {
  border: 1px solid var(--border-1);
  border-radius: 24px;
  background:
    radial-gradient(circle at 82% 12%, rgba(99, 190, 73, 0.12) 0%, transparent 36%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 97%, transparent), color-mix(in srgb, var(--surface-2) 90%, transparent));
  box-shadow: var(--shadow-1);
  padding: 18px;
  display: grid;
  gap: 18px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--text-2);
  font-weight: 700;
}

.product-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: 18px;
}

.product-visual,
.product-copy {
  border: 1px solid var(--border-1);
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface-1) 92%, transparent);
}

.product-visual {
  padding: 18px;
  display: grid;
  place-items: center;
}

.product-visual img {
  width: min(100%, 380px);
  height: auto;
  object-fit: contain;
}

.product-copy {
  padding: 18px;
  display: grid;
  gap: 12px;
}

.eyebrow {
  margin: 0;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent-500) 14%, var(--surface-2));
  color: color-mix(in srgb, var(--accent-700) 78%, var(--text-1) 22%);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.product-copy h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 0.98;
}

.unit,
.availability,
.description {
  margin: 0;
}

.unit {
  color: var(--text-2);
  font-weight: 700;
}

.availability {
  color: color-mix(in srgb, var(--accent-700) 72%, var(--text-1) 28%);
  font-weight: 800;
}

.description {
  color: var(--text-2);
  line-height: 1.5;
  font-size: 1rem;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.actions .primary,
.actions .secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 16px;
  font-weight: 800;
}

.actions .primary {
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-2) 92%, transparent);
  color: var(--text-1);
}

.actions .secondary {
  background: var(--cta-gradient);
  color: #fff;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.meta-card {
  border: 1px solid var(--border-1);
  border-radius: 16px;
  background: color-mix(in srgb, var(--surface-2) 88%, transparent);
  padding: 12px;
  display: grid;
  gap: 4px;
}

.meta-card span {
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.74rem;
  font-weight: 800;
}

.meta-card strong {
  font-size: 1rem;
}

@media (max-width: 900px) {
  .product-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 780px) {
  .product-main {
    padding: 16px 14px 22px;
  }

  .product-shell,
  .product-visual,
  .product-copy {
    border-radius: 20px;
    padding: 14px;
  }
}

@media (max-width: 560px) {
  .product-main {
    padding: 12px 10px 18px;
  }

  .product-shell,
  .product-visual,
  .product-copy {
    border-radius: 16px;
    padding: 12px 10px;
  }

  .actions,
  .meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
