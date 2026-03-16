<script setup lang="ts">
import type { CategoryItem } from "~/types/home";

const props = defineProps<{
  categories: CategoryItem[];
  activeCategoryId?: number | null;
  embedded?: boolean;
}>();

const emit = defineEmits<{
  select: [categoryId: number];
}>();
</script>

<template>
  <section :class="['categories-wrap', { embedded: props.embedded }]" aria-label="Categorias de produtos">
    <h2>O que voce procura hoje?</h2>

    <div class="categories-row">
      <button
        v-for="category in props.categories"
        :key="category.id"
        type="button"
        :class="['category-card', { active: props.activeCategoryId === category.id }]"
        :aria-pressed="props.activeCategoryId === category.id"
        @click="emit('select', category.id)"
      >
        <img :src="category.imageUrl || '/imgs/logo-desktop.webp'" :alt="category.name" loading="lazy" />
        <h3>{{ category.name }}</h3>
      </button>
    </div>
  </section>
</template>

<style scoped>
.categories-wrap {
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-1) 92%, transparent);
  border-radius: 22px;
  padding: 18px;
  overflow: hidden;
}

.categories-wrap.embedded {
  border: 0;
  background: transparent;
  border-radius: 0;
  padding: 0;
}

.categories-wrap h2 {
  margin: 0 0 12px;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  line-height: 1.05;
}

.categories-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  min-width: 0;
}

.category-card {
  appearance: none;
  width: 100%;
  border: 1px solid var(--border-1);
  border-radius: 16px;
  background:
    radial-gradient(circle at 82% 18%, rgba(99, 190, 73, 0.12) 0%, transparent 36%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 98%, transparent), color-mix(in srgb, var(--surface-2) 92%, transparent));
  box-shadow: var(--shadow-2);
  min-height: 146px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition:
    border-color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.category-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--brand-1) 45%, var(--border-1));
}

.category-card.active {
  border-color: color-mix(in srgb, var(--brand-1) 62%, var(--border-1));
  background:
    radial-gradient(circle at 82% 18%, rgba(99, 190, 73, 0.22) 0%, transparent 36%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 96%, transparent), color-mix(in srgb, var(--surface-2) 88%, transparent));
  box-shadow: 0 0 0 1px rgba(99, 190, 73, 0.18), var(--shadow-2);
}

.category-card:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--brand-1) 72%, white);
  outline-offset: 2px;
}

.category-card img {
  align-self: center;
  height: 82px;
  object-fit: contain;
}

.category-card h3 {
  margin: 6px 0 0;
  font-size: clamp(1.2rem, 1.8vw, 1.8rem);
  text-align: center;
}

@media (max-width: 900px) {
  .categories-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .categories-wrap {
    border-radius: 16px;
    padding: 12px;
  }

  .categories-wrap.embedded {
    padding: 0;
  }

  .categories-wrap h2 {
    margin-bottom: 10px;
  }

  .category-card {
    min-height: 132px;
  }

  .category-card img {
    height: 68px;
  }

  .category-card h3 {
    font-size: 1.32rem;
  }
}

@media (max-width: 420px) {
  .categories-wrap {
    padding: 10px;
  }

  .categories-wrap.embedded {
    padding: 0;
  }

  .categories-wrap h2 {
    font-size: clamp(1.9rem, 10vw, 2.25rem);
  }

  .categories-row {
    gap: 10px;
  }

  .category-card {
    min-height: 122px;
    padding: 10px;
  }

  .category-card img {
    height: 58px;
  }

  .category-card h3 {
    font-size: 1.15rem;
  }
}
</style>
