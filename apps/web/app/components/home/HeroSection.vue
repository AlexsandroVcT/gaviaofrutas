<script setup lang="ts">
const props = defineProps<{
  highlights: string[];
}>();
</script>

<template>
  <section class="hero-section">
    <div class="hero-copy">
      <h1>
        O Mercadinho
        <span>da sua Regiao</span>
      </h1>

      <p class="subtitle">Qualidade, variedade e retirada rapida na loja.</p>

      <ul class="highlights">
        <li v-for="item in props.highlights" :key="item">
          <span class="check">✓</span>
          {{ item }}
        </li>
      </ul>

      <div class="hero-cta">
        <a class="cta-main" href="https://wa.me/5582999999999" target="_blank" rel="noreferrer">
          Pedir no WhatsApp
        </a>
        <a class="cta-secondary" href="#produtos">Ver Produtos</a>
      </div>
    </div>

    <div class="hero-visual">
      <div class="hero-media">
        <img src="/imgs/hero-woman.webp" alt="Cliente com cesta de frutas" />
      </div>

      <article class="store-card" id="frigorifico" aria-label="Informacoes da loja">
        <img src="/imgs/backgroundAbout.webp" alt="Loja Gaviao Frutas" loading="lazy" />

        <div class="store-content">
          <h3>Gaviao Frutas</h3>
          <p>Santa Luzia do Norte - AL</p>
          <small>Retirada no local via Instagram ou WhatsApp.</small>

          <a href="https://maps.google.com" target="_blank" rel="noreferrer">Ver no Google Maps</a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: clamp(16px, 2.6vw, 34px);
  align-items: start;
}

.hero-copy {
  background: var(--surface-1);
  border: 1px solid var(--border-1);
  border-radius: 28px;
  padding: clamp(20px, 2.8vw, 38px);
  box-shadow: var(--shadow-1);
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(2.05rem, 4vw, 4.3rem);
  line-height: 0.94;
  font-weight: 900;
}

.hero-copy h1 span {
  color: var(--accent-700);
}

.subtitle {
  margin: 18px 0 0;
  font-size: clamp(1.06rem, 1.8vw, 1.8rem);
  color: var(--text-2);
  font-weight: 600;
}

.highlights {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.highlights li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  border: 1px solid var(--border-1);
  background: var(--surface-2);
  padding: 8px 13px;
  color: var(--text-1);
  font-weight: 700;
}

.check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--accent-500) 28%, transparent);
  color: var(--accent-700);
  font-size: 0.86rem;
}

.hero-cta {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.cta-main,
.cta-secondary {
  border-radius: 999px;
  padding: 14px 22px;
  font-size: 1.02rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta-main {
  background: var(--cta-gradient);
  color: #fff;
  box-shadow: 0 14px 30px rgba(37, 123, 47, 0.32);
}

.cta-secondary {
  border: 1px solid var(--border-1);
  background: var(--surface-2);
  color: var(--text-1);
}

.hero-visual {
  position: relative;
}

.hero-media {
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid var(--border-1);
  background:
    linear-gradient(110deg, color-mix(in srgb, var(--surface-1) 80%, transparent) 0%, transparent 62%),
    url('/imgs/contacts.webp') center / cover no-repeat;
  box-shadow: var(--shadow-1);
  min-height: clamp(350px, 42vw, 610px);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.hero-media img {
  width: min(470px, 92%);
  height: auto;
  display: block;
  object-fit: contain;
}

.store-card {
  position: absolute;
  right: 16px;
  bottom: -46px;
  width: min(330px, calc(100% - 32px));
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border-1);
  background: var(--surface-1);
  box-shadow: var(--shadow-1);
}

.store-card img {
  width: 100%;
  height: 110px;
  object-fit: cover;
}

.store-content {
  padding: 14px;
}

.store-content h3 {
  margin: 0;
  font-size: 1.55rem;
}

.store-content p {
  margin: 4px 0;
  color: var(--text-2);
  font-weight: 600;
}

.store-content small {
  display: block;
  color: var(--text-3);
  margin-bottom: 10px;
}

.store-content a {
  display: inline-flex;
  border-radius: 999px;
  padding: 10px 14px;
  background: var(--cta-gradient);
  color: #fff;
  font-weight: 800;
}

@media (max-width: 1100px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .store-card {
    position: static;
    width: 100%;
    margin-top: 12px;
  }
}

@media (max-width: 640px) {
  .hero-copy {
    border-radius: 18px;
    padding: 18px;
  }

  .hero-media {
    border-radius: 18px;
    min-height: 330px;
  }

  .hero-media img {
    width: min(320px, 94%);
  }

  .store-card {
    border-radius: 16px;
  }

  .highlights {
    gap: 8px;
  }

  .highlights li {
    width: 100%;
    justify-content: flex-start;
  }

  .cta-main,
  .cta-secondary {
    width: 100%;
  }
}
</style>
