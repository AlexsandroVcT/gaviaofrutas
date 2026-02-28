<script setup lang="ts">
import type { BenefitItem } from "~/types/home";

const props = defineProps<{
  benefits: BenefitItem[];
}>();
</script>

<template>
  <section id="sobre" class="benefits-row">
    <article
      v-for="benefit in props.benefits"
      :id="benefit.id === 'suporte' ? 'contatos' : undefined"
      :key="benefit.id"
    >
      <h3>{{ benefit.title }}</h3>
      <p>{{ benefit.description }}</p>
    </article>
  </section>
</template>

<style scoped>
.benefits-row {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.benefits-row article {
  border: 1px solid var(--border-1);
  border-radius: 16px;
  background: var(--surface-1);
  padding: 14px;
}

.benefits-row h3 {
  margin: 0;
  font-size: 1.55rem;
}

.benefits-row p {
  margin: 8px 0 0;
  color: var(--text-2);
}

@media (max-width: 980px) {
  .benefits-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .benefits-row {
    grid-template-columns: 1fr;
  }
}
</style>
