<script setup lang="ts">
import type { OfferItem } from "~/types/home";

const props = defineProps<{
  offers: OfferItem[];
}>();
</script>

<template>
  <section id="ofertas" class="offers-section">
    <article v-for="offer in props.offers" :key="offer.id" class="offer-card">
      <div class="offer-copy">
        <h3>{{ offer.title }}</h3>
        <p>{{ offer.description }}</p>
        <a href="#produtos">{{ offer.cta }}</a>
      </div>

      <img :src="offer.image" :alt="offer.title" loading="lazy" />
    </article>
  </section>
</template>

<style scoped>
.offers-section {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.offer-card {
  border: 1px solid var(--border-1);
  border-radius: 18px;
  padding: 14px;
  background:
    radial-gradient(circle at 85% 10%, rgba(99, 190, 73, 0.22) 0%, transparent 45%),
    linear-gradient(130deg, var(--surface-1) 0%, var(--surface-2) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.offer-copy h3 {
  margin: 0;
  font-size: 1.7rem;
  line-height: 1;
}

.offer-copy p {
  margin: 8px 0 10px;
  color: var(--text-2);
}

.offer-copy a {
  display: inline-flex;
  border-radius: 999px;
  padding: 9px 14px;
  background: var(--cta-gradient);
  color: #fff;
  font-weight: 700;
}

.offer-card img {
  width: 86px;
  height: 86px;
  object-fit: contain;
}

@media (max-width: 980px) {
  .offers-section {
    grid-template-columns: 1fr;
  }
}
</style>
