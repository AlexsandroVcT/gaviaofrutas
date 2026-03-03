<script setup lang="ts">
import type { CategoryItem } from "~/types/home";

const props = defineProps<{
  categories: CategoryItem[];
}>();
</script>

<template>
  <section class="categories-wrap" aria-label="Categorias de produtos">
    <h2>O que voce procura hoje?</h2>

    <div class="categories-row">
      <article v-for="category in props.categories" :key="category.id" class="category-card">
        <img :src="category.image" :alt="category.name" loading="lazy" />
        <h3>{{ category.name }}</h3>
      </article>
    </div>
  </section>
</template>

<style scoped>
.categories-wrap {
  margin-top: 26px;
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-1) 92%, transparent);
  border-radius: 22px;
  padding: 18px;
  overflow: hidden;
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
  border: 1px solid var(--border-1);
  border-radius: 16px;
  background: var(--surface-1);
  box-shadow: var(--shadow-2);
  min-height: 146px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

@media (max-width: 980px) {
  .categories-row {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: minmax(152px, 72%);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    padding-bottom: 6px;
  }

  .category-card {
    scroll-snap-align: start;
  }
}

@media (max-width: 640px) {
  .categories-wrap {
    margin-top: 18px;
    border-radius: 16px;
    padding: 12px;
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
}

@media (max-width: 420px) {
  .categories-wrap {
    padding: 10px;
  }

  .categories-wrap h2 {
    font-size: clamp(1.9rem, 10vw, 2.25rem);
  }

  .categories-row {
    gap: 10px;
    grid-auto-columns: minmax(138px, 78%);
  }

  .category-card {
    min-height: 126px;
    padding: 10px;
  }
}
</style>
