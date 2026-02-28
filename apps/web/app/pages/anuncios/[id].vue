<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();
const homeData = await useHomeData();

const announcement = computed(() =>
  homeData.announcements.find((item) => item.id === String(route.params.id)) || null,
);

const mapsUrl = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(homeData.store.mapQuery)}`,
);

const whatsappUrl = computed(() => {
  const text = 'Ola! Quero atendimento de Gaviao Frutas e retirar na loja.';
  return `https://wa.me/${homeData.store.phone}?text=${encodeURIComponent(text)}`;
});

useSeoMeta({
  title: () =>
    announcement.value
      ? `${announcement.value.title} | Gaviao Frutas`
      : 'Anuncio | Gaviao Frutas',
  description: () =>
    announcement.value
      ? `${announcement.value.description} - visite Gaviao Frutas em Santa Luzia do Norte.`
      : 'Anuncio de Gaviao Frutas para retirada na loja.',
});
</script>

<template>
  <main class="announcement-page">
    <section class="shell">
      <NuxtLink to="/" class="back-link">Voltar para inicio</NuxtLink>

      <article v-if="announcement" class="card">
        <p class="tag">{{ announcement.tag }}</p>
        <h1>{{ announcement.title }}</h1>
        <p class="description">{{ announcement.description }}</p>

        <img :src="announcement.image" :alt="announcement.title" loading="lazy" />

        <div class="actions">
          <a :href="mapsUrl" target="_blank" rel="noreferrer">Tracar rota</a>
          <a :href="whatsappUrl" target="_blank" rel="noreferrer">Pedir no WhatsApp</a>
        </div>
      </article>

      <article v-else class="card">
        <h1>Anuncio nao encontrado</h1>
        <p class="description">Esse conteudo pode ter sido desativado.</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.announcement-page {
  min-height: 100vh;
  padding: 22px 14px;
}

.shell {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 12px;
}

.back-link {
  width: fit-content;
  border-radius: 999px;
  border: 1px solid var(--border-1);
  background: var(--surface-1);
  padding: 8px 14px;
  font-weight: 700;
}

.card {
  border-radius: 20px;
  border: 1px solid var(--border-1);
  background: var(--surface-1);
  box-shadow: var(--shadow-1);
  padding: 18px;
  display: grid;
  gap: 12px;
}

.tag {
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--text-3);
  font-weight: 800;
}

h1 {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.6rem);
}

.description {
  margin: 0;
  color: var(--text-2);
  font-size: 1rem;
}

img {
  width: min(360px, 100%);
  justify-self: center;
  object-fit: contain;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.actions a {
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
}

.actions a:first-child {
  background: var(--cta-gradient);
  color: #fff;
}

.actions a:last-child {
  border: 1px solid var(--border-1);
  background: var(--surface-2);
}
</style>
