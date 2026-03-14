<script setup lang="ts">
import type { BenefitItem } from "~/types/home";

const props = defineProps<{
  benefits: BenefitItem[];
  compact?: boolean;
}>();
</script>

<template>
  <section id="sobre" :class="['benefits-row', { compact: props.compact }]">
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
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.benefits-row article {
  border: 1px solid var(--border-1);
  border-radius: 16px;
  background:
    radial-gradient(circle at 84% 16%, rgba(99, 190, 73, 0.09) 0%, transparent 30%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 98%, transparent), color-mix(in srgb, var(--surface-2) 94%, transparent));
  padding: 14px;
  min-height: 118px;
}

.benefits-row.compact article {
  min-height: 106px;
}

.benefits-row h3 {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.02;
}

.benefits-row.compact h3 {
  font-size: clamp(1.15rem, 1.7vw, 1.35rem);
}

.benefits-row p {
  margin: 8px 0 0;
  color: var(--text-2);
  line-height: 1.2;
}

.benefits-row.compact p {
  font-size: 0.98rem;
}

@media (max-width: 980px) {
  .benefits-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .benefits-row {
    grid-template-columns: 1fr;
  }
}
</style>
