<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { menuItems } from '~/data/site';
import { useCartStore } from '~/stores/cart';
import type { CategoriesApiResponse, ProductsApiResponse, StoreStatusApiResponse } from '~/types/api';
import type { CategoryItem, ProductItem, StoreInfo, StoreStatus } from '~/types/home';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalItems);
const isCartDrawerOpen = ref(false);

const selectedCategorySlug = computed(() =>
  typeof route.query.categoria === 'string' && route.query.categoria.trim()
    ? route.query.categoria.trim()
    : null,
);

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

const fallbackStatus: StoreStatus = {
  isOpen: false,
  text: 'Status indisponivel',
  nextText: '',
};

const { data, refresh } = await useAsyncData(
  () => `catalog-page:${selectedCategorySlug.value || 'all'}`,
  async () => {
    const [categoriesResponse, productsResponse, storeResponse] = await Promise.all([
      $fetch<CategoriesApiResponse>('/api/categories', { timeout: 5000 }),
      $fetch<ProductsApiResponse>('/api/products', {
        timeout: 5000,
        query: selectedCategorySlug.value ? { category: selectedCategorySlug.value } : undefined,
      }),
      $fetch<StoreStatusApiResponse>('/api/store/status', { timeout: 5000 }),
    ]);

    return {
      categories: categoriesResponse.items,
      products: productsResponse.items,
      store: storeResponse.store,
      storeStatus: storeResponse.storeStatus,
      storeClockLabel: storeResponse.storeClockLabel,
    };
  },
);

watch(selectedCategorySlug, () => {
  void refresh();
});

const categories = computed<CategoryItem[]>(() => data.value?.categories ?? []);
const products = computed<ProductItem[]>(() => data.value?.products ?? []);
const store = computed<StoreInfo>(() => data.value?.store ?? fallbackStore);
const storeStatus = computed<StoreStatus>(() => data.value?.storeStatus ?? fallbackStatus);

const selectedCategory = computed(() =>
  categories.value.find((category) => category.slug === selectedCategorySlug.value) ?? null,
);

function handleCategorySelect(categoryId: number) {
  const category = categories.value.find((item) => item.id === categoryId) ?? null;

  if (!category) return;

  if (selectedCategorySlug.value === category.slug) {
    void router.push('/produtos');
    return;
  }

  void router.push({
    path: '/produtos',
    query: { categoria: category.slug },
  });
}

function clearCategoryFilter() {
  void router.push('/produtos');
}

useSeoMeta({
  title: () =>
    selectedCategory.value
      ? `${selectedCategory.value.name} | Catalogo Gaviao Frutas`
      : 'Produtos | Catalogo Gaviao Frutas',
  description: () =>
    selectedCategory.value
      ? `Veja os produtos da categoria ${selectedCategory.value.name} no catalogo publico da Gaviao Frutas.`
      : 'Catalogo publico da Gaviao Frutas com categorias e produtos disponiveis para retirada na loja.',
});
</script>

<template>
  <div class="catalog-page">
    <SiteHeader
      :menu-items="menuItems"
      :cart-count="cartCount"
      :whatsapp-phone="store.phone"
      @cart-click="isCartDrawerOpen = true"
    />

    <main class="catalog-main">
      <section class="catalog-hero">
        <p class="eyebrow">Catalogo publico</p>
        <div class="catalog-hero-copy">
          <h1>Todos os produtos da loja</h1>
          <p>
            Navegue por categorias e consulte os itens disponiveis para retirada no Gaviao Frutas.
          </p>
        </div>
        <div class="catalog-meta">
          <span>{{ products.length }} produtos visiveis</span>
          <span>{{ storeStatus.text }}</span>
          <button v-if="selectedCategory" type="button" class="clear-filter" @click="clearCategoryFilter">
            Ver todas as categorias
          </button>
        </div>
      </section>

      <section class="catalog-shell">
        <CategoriesSection
          :categories="categories"
          :active-category-id="selectedCategory?.id ?? null"
          embedded
          @select="handleCategorySelect"
        />

        <ProductShowcase
          :products="products"
          :title="'Catalogo da loja'"
          :active-category-name="selectedCategory?.name ?? null"
          :hide-more-link="true"
          :empty-state-text="'Nenhum produto disponivel para esta categoria no momento.'"
          :whatsapp-phone="store.phone"
          embedded
        />
      </section>
    </main>

    <CartDrawer v-model:open="isCartDrawerOpen" :whatsapp-phone="store.phone" />
  </div>
</template>

<style scoped>
.catalog-page {
  min-height: 100vh;
}

.catalog-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 22px 18px 30px;
  display: grid;
  gap: 18px;
}

.catalog-hero,
.catalog-shell {
  border: 1px solid var(--border-1);
  border-radius: 24px;
  background:
    radial-gradient(circle at 80% 12%, rgba(99, 190, 73, 0.12) 0%, transparent 34%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 96%, transparent), color-mix(in srgb, var(--surface-2) 90%, transparent));
  box-shadow: var(--shadow-1);
}

.catalog-hero {
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

.catalog-hero-copy h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 0.98;
}

.catalog-hero-copy p {
  margin: 10px 0 0;
  max-width: 760px;
  color: var(--text-2);
  font-size: 1.02rem;
}

.catalog-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-2);
  font-weight: 700;
}

.clear-filter {
  border-radius: 999px;
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-1) 92%, transparent);
  color: var(--text-1);
  padding: 10px 16px;
  font-weight: 800;
}

.catalog-shell {
  padding: 18px;
  display: grid;
  gap: 16px;
}

@media (max-width: 780px) {
  .catalog-main {
    padding: 16px 14px 22px;
  }

  .catalog-hero,
  .catalog-shell {
    border-radius: 20px;
    padding: 14px;
  }

  .clear-filter {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .catalog-main {
    padding: 12px 10px 18px;
  }

  .catalog-hero,
  .catalog-shell {
    border-radius: 16px;
    padding: 12px 10px;
  }
}
</style>
