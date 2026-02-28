<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { AnnouncementCtaType, AnnouncementItem, AnnouncementVariant, StoreInfo } from '~/types/home';

const props = defineProps<{
  highlights: string[];
  announcements: AnnouncementItem[];
  store: StoreInfo;
}>();

const config = useRuntimeConfig();
const now = ref(new Date());
const activeIndex = ref(0);
const routeLoading = ref(false);
const routeHint = ref('');

let clockTimer: ReturnType<typeof setInterval> | null = null;
let rotationTimer: ReturnType<typeof setTimeout> | null = null;

const weekdayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const weekdayLabelPt = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

type AnnouncementDisplay = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaType: AnnouncementCtaType;
  ctaUrl?: string;
  durationMs?: number;
};

const FALLBACK_ANNOUNCEMENT: AnnouncementItem = {
  id: 'fallback',
  tag: 'Anuncio',
  title: 'Retire seus pedidos com Gaviao Frutas',
  description: 'Chame no WhatsApp ou trace a rota para retirada na loja fisica.',
  image: '/imgs/products/abacaxi.webp',
  ctaLabel: 'Tracar rota',
  ctaType: 'maps',
  isActive: true,
  priority: 1,
  weight: 1,
  durationMs: 7000,
};

function parseMinutes(time: string) {
  const [hh = '0', mm = '0'] = time.split(':');
  const hour = Number.parseInt(hh, 10);
  const minute = Number.parseInt(mm, 10);
  return (Number.isFinite(hour) ? hour : 0) * 60 + (Number.isFinite(minute) ? minute : 0);
}

function getLocalClock(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? 'Mon';
  const hour = Number.parseInt(parts.find((part) => part.type === 'hour')?.value ?? '0', 10);
  const minute = Number.parseInt(parts.find((part) => part.type === 'minute')?.value ?? '0', 10);

  return {
    day: weekdayIndex[weekday] ?? 1,
    minutes: hour * 60 + minute,
  };
}

function isAnnouncementLive(item: AnnouncementItem, date: Date) {
  if (!item.isActive) return false;

  if (item.startAt) {
    const start = new Date(item.startAt);
    if (!Number.isNaN(start.getTime()) && date < start) return false;
  }

  if (item.endAt) {
    const end = new Date(item.endAt);
    if (!Number.isNaN(end.getTime()) && date > end) return false;
  }

  return true;
}

function getStoreStatus(store: StoreInfo, date: Date) {
  const { day, minutes } = getLocalClock(date, store.timeZone);
  const today = store.hours.find((item) => item.day === day);

  if (today?.open && today?.close) {
    const openMinutes = parseMinutes(today.open);
    const closeMinutes = parseMinutes(today.close);

    const isOpen =
      closeMinutes >= openMinutes
        ? minutes >= openMinutes && minutes < closeMinutes
        : minutes >= openMinutes || minutes < closeMinutes;

    if (isOpen) {
      return {
        isOpen: true,
        text: 'Aberto agora',
        nextText: `Fecha as ${today.close}`,
      };
    }

    if (minutes < openMinutes) {
      return {
        isOpen: false,
        text: 'Fechado agora',
        nextText: `Abre hoje as ${today.open}`,
      };
    }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7;
    const nextEntry = store.hours.find((item) => item.day === nextDay);

    if (nextEntry?.open) {
      const dayLabel = offset === 1 ? 'amanha' : weekdayLabelPt[nextDay];

      return {
        isOpen: false,
        text: 'Fechado agora',
        nextText: `Abre ${dayLabel} as ${nextEntry.open}`,
      };
    }
  }

  return {
    isOpen: false,
    text: 'Fechado',
    nextText: 'Sem horario definido',
  };
}

function clearRotationTimer() {
  if (!rotationTimer) return;

  clearTimeout(rotationTimer);
  rotationTimer = null;
}

function normalizeIndex(next: number, total: number) {
  if (total <= 0) return 0;
  return (next + total) % total;
}

function clampDuration(ms?: number) {
  if (!ms || !Number.isFinite(ms)) return 7000;
  return Math.min(Math.max(ms, 3500), 15000);
}

function buildEventsUrl(apiBase: string) {
  if (!apiBase) return '/api/events';
  return `${apiBase.replace(/\/$/, '')}/api/events`;
}

async function trackEvent(eventType: string, itemId: string, source: string) {
  if (!process.client) return;

  try {
    await $fetch(buildEventsUrl(config.public.apiBase || ''), {
      method: 'POST',
      body: {
        eventType,
        itemId,
        source,
      },
      timeout: 4000,
    });
  } catch {
    // fail silent for analytics
  }
}

const status = computed(() => getStoreStatus(props.store, now.value));

const storeClockLabel = computed(() =>
  new Intl.DateTimeFormat('pt-BR', {
    timeZone: props.store.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now.value),
);

const pickupEtaText = computed(() =>
  status.value.isOpen ? 'Retirada em 20 a 35 min' : 'Retirada apos abertura da loja',
);

const activeAnnouncements = computed(() => {
  const isStoreOpen = status.value.isOpen;

  const live = props.announcements
    .filter((item) => isAnnouncementLive(item, now.value))
    .filter((item) => isStoreOpen || !item.onlyWhenOpen)
    .sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (b.weight !== a.weight) return b.weight - a.weight;
      return a.id.localeCompare(b.id);
    });

  return live.length ? live : [FALLBACK_ANNOUNCEMENT];
});

const canRotateAnnouncements = computed(() => activeAnnouncements.value.length > 1);

const currentAnnouncement = computed(() => {
  const list = activeAnnouncements.value;
  return list[normalizeIndex(activeIndex.value, list.length)] ?? FALLBACK_ANNOUNCEMENT;
});

function toDisplayAnnouncement(item: AnnouncementItem): AnnouncementDisplay {
  return {
    id: item.id,
    tag: item.tag,
    title: item.title,
    description: item.description,
    image: item.image,
    ctaLabel: item.ctaLabel,
    ctaType: item.ctaType,
    ctaUrl: item.ctaUrl,
    durationMs: item.durationMs,
  };
}

function applyVariant(base: AnnouncementDisplay, variant?: AnnouncementVariant) {
  if (!variant) return base;

  return {
    ...base,
    tag: variant.tag ?? base.tag,
    title: variant.title ?? base.title,
    description: variant.description ?? base.description,
    ctaLabel: variant.ctaLabel ?? base.ctaLabel,
    ctaType: variant.ctaType ?? base.ctaType,
    ctaUrl: variant.ctaUrl ?? base.ctaUrl,
  };
}

const currentAnnouncementDisplay = computed<AnnouncementDisplay>(() => {
  const item = currentAnnouncement.value;
  const base = toDisplayAnnouncement(item);

  if (status.value.isOpen) return base;

  if (item.closedVariant) {
    return applyVariant(base, item.closedVariant);
  }

  const immediatePickupPattern = /retire hoje|retirada rapida|retire rapido|retirar hoje/i;
  const copy = `${item.title} ${item.description}`;

  if (!immediatePickupPattern.test(copy)) return base;

  return {
    ...base,
    tag: 'Retirada agendada',
    title: 'Agende agora e retire na abertura',
    description: `${status.value.nextText}. Chame no WhatsApp e deixe seu pedido reservado.`,
    ctaLabel: 'Agendar no WhatsApp',
    ctaType: 'whatsapp',
  };
});

const googleMapsSearchUrl = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.store.mapQuery)}`,
);

const googleDirectionsFallbackUrl = computed(
  () =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${props.store.latitude},${props.store.longitude}`)}&travelmode=driving`,
);

const whatsappUrl = computed(() => {
  const text = 'Ola! Quero fazer um pedido e retirar na loja.';
  return `https://wa.me/${props.store.phone}?text=${encodeURIComponent(text)}`;
});

function getAnnouncementCtaUrl(announcement: AnnouncementDisplay) {
  switch (announcement.ctaType) {
    case 'maps':
      return googleDirectionsFallbackUrl.value;
    case 'whatsapp':
      return whatsappUrl.value;
    case 'catalog':
      return '#produtos';
    case 'custom':
      return announcement.ctaUrl || '#';
    default:
      return '#';
  }
}

function scheduleRotation() {
  clearRotationTimer();

  if (!process.client || !canRotateAnnouncements.value) return;

  const wait = clampDuration(currentAnnouncement.value.durationMs);

  rotationTimer = setTimeout(() => {
    const total = activeAnnouncements.value.length;
    activeIndex.value = normalizeIndex(activeIndex.value + 1, total);
    trackEvent('announcement_rotate', currentAnnouncement.value.id, 'auto');
  }, wait);
}

function goToAnnouncement(index: number) {
  const total = activeAnnouncements.value.length;
  activeIndex.value = normalizeIndex(index, total);
  trackEvent('announcement_rotate', currentAnnouncement.value.id, 'dot');
}

function nextAnnouncement() {
  const total = activeAnnouncements.value.length;
  activeIndex.value = normalizeIndex(activeIndex.value + 1, total);
  trackEvent('announcement_rotate', currentAnnouncement.value.id, 'next');
}

function prevAnnouncement() {
  const total = activeAnnouncements.value.length;
  activeIndex.value = normalizeIndex(activeIndex.value - 1, total);
  trackEvent('announcement_rotate', currentAnnouncement.value.id, 'prev');
}

function openAnnouncementCta(announcement: AnnouncementDisplay) {
  const url = getAnnouncementCtaUrl(announcement);
  trackEvent('announcement_click', announcement.id, announcement.ctaType);

  if (!process.client) return;

  if (url.startsWith('#')) {
    const element = document.querySelector(url);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const isExternal = /^https?:\/\//.test(url);

  if (isExternal) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.href = url;
}

function openExternal(url: string) {
  if (!process.client) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function openDirections() {
  if (!process.client) return;

  routeLoading.value = true;
  routeHint.value = '';
  trackEvent('click_maps_route', 'store', 'hub');

  const destination = `${props.store.latitude},${props.store.longitude}`;
  const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  const popup = window.open('about:blank', '_blank', 'noopener,noreferrer');

  if (!popup) {
    window.location.href = fallbackUrl;
    routeLoading.value = false;
    return;
  }

  if (!('geolocation' in navigator)) {
    popup.location.href = fallbackUrl;
    routeHint.value = 'Abrimos o mapa direto para sua rota.';
    routeLoading.value = false;
    return;
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000,
      });
    });

    const origin = `${position.coords.latitude},${position.coords.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;

    popup.location.href = url;
  } catch {
    popup.location.href = fallbackUrl;
    routeHint.value = 'Nao foi possivel obter sua localizacao. Mapa aberto com destino direto.';
  } finally {
    routeLoading.value = false;
  }
}

const primaryHubActionLabel = computed(() => {
  if (status.value.isOpen) {
    return routeLoading.value ? 'Calculando rota...' : 'Tracar rota agora';
  }

  return 'Agendar no WhatsApp';
});

async function runPrimaryHubAction() {
  if (status.value.isOpen) {
    await openDirections();
    return;
  }

  trackEvent('click_whatsapp_schedule', 'store', 'hub');
  openExternal(whatsappUrl.value);
}

watch(
  () => activeAnnouncements.value.length,
  (total) => {
    if (activeIndex.value >= total) activeIndex.value = 0;
  },
);

watch(
  () => currentAnnouncement.value.id,
  (announcementId) => {
    trackEvent('announcement_impression', announcementId, 'hero');
    scheduleRotation();
  },
  { immediate: true },
);

onMounted(() => {
  clockTimer = setInterval(() => {
    now.value = new Date();
  }, 60_000);

  scheduleRotation();
});

onUnmounted(() => {
  clearRotationTimer();

  if (!clockTimer) return;

  clearInterval(clockTimer);
  clockTimer = null;
});
</script>

<template>
  <section class="hero-section">
    <div class="hero-copy">
      <h1>
        O Mercadinho
        <span>da sua Regiao</span>
      </h1>

      <p class="subtitle">Qualidade e preco baixo voce encontra aqui, Gaviao Frutas.</p>

      <ul class="highlights">
        <li v-for="item in props.highlights" :key="item">
          <span class="check">✓</span>
          {{ item }}
        </li>
      </ul>

      <div class="hero-cta">
        <a class="cta-main" :href="whatsappUrl" target="_blank" rel="noreferrer">Pedir no WhatsApp</a>
        <a class="cta-secondary" href="#produtos">Ver Produtos</a>
      </div>
    </div>

    <div class="hero-visual">
      <article class="hero-media" aria-label="Anuncios automaticos">
        <div class="announcement-copy">
          <p class="announcement-tag">
            <svg class="ui-icon mini" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3l7 3v5c0 4.3-2.8 8.1-7 10-4.2-1.9-7-5.7-7-10V6l7-3Z" />
              <path d="M9.4 12.2l1.8 1.8 3.4-3.4" />
            </svg>
            {{ currentAnnouncementDisplay.tag }}
          </p>

          <h3>{{ currentAnnouncementDisplay.title }}</h3>
          <p>{{ currentAnnouncementDisplay.description }}</p>

          <p class="announcement-meta">
            <span :class="['announcement-status', { open: status.isOpen }]">{{ status.text }}</span>
            <span>{{ status.nextText }}</span>
          </p>

          <button
            type="button"
            class="announcement-cta"
            @click="openAnnouncementCta(currentAnnouncementDisplay)"
          >
            {{ currentAnnouncementDisplay.ctaLabel }}
          </button>
        </div>

        <img
          class="announcement-image"
          :src="currentAnnouncementDisplay.image"
          :alt="currentAnnouncementDisplay.title"
          loading="lazy"
        />

        <div v-if="canRotateAnnouncements" class="announcement-nav">
          <button type="button" class="nav-arrow" aria-label="Anuncio anterior" @click="prevAnnouncement">
            <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m14 7-5 5 5 5" />
            </svg>
          </button>

          <div class="nav-dots" role="tablist" aria-label="Anuncios">
            <button
              v-for="(announcement, index) in activeAnnouncements"
              :key="announcement.id"
              type="button"
              class="nav-dot"
              :class="{ active: index === activeIndex }"
              :aria-label="`Ir para anuncio ${index + 1}`"
              @click="goToAnnouncement(index)"
            />
          </div>

          <button type="button" class="nav-arrow" aria-label="Proximo anuncio" @click="nextAnnouncement">
            <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m10 7 5 5-5 5" />
            </svg>
          </button>
        </div>
      </article>

      <article class="pickup-hub" id="frigorifico" aria-label="Hub de retirada inteligente">
        <header class="hub-header">
          <div class="hub-title">
            <p class="hub-kicker">Hub de retirada inteligente</p>
            <h3>{{ props.store.name }}</h3>
          </div>
          <span :class="['status-chip', { open: status.isOpen }]">{{ status.text }}</span>
        </header>

        <p class="store-location">{{ props.store.cityState }}</p>
        <p class="store-address">{{ props.store.address }}</p>

        <div class="hub-grid">
          <article class="hub-item">
            <span class="hub-stat-label">
              <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 9 16l10-10" /></svg>
              Disponibilidade
            </span>
            <strong>{{ status.nextText }}</strong>
          </article>

          <article class="hub-item">
            <span class="hub-stat-label">
              <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></svg>
              Previsao
            </span>
            <strong>{{ pickupEtaText }}</strong>
          </article>

          <article class="hub-item">
            <span class="hub-stat-label">
              <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Horario local
            </span>
            <strong>{{ storeClockLabel }} (AL)</strong>
          </article>

          <article class="hub-item">
            <span class="hub-stat-label">
              <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v10H8l-4 4V5Z" /></svg>
              Canal rapido
            </span>
            <strong>WhatsApp</strong>
          </article>
        </div>

        <div class="hub-actions">
          <button
            type="button"
            class="route-btn"
            :disabled="status.isOpen && routeLoading"
            @click="runPrimaryHubAction"
          >
            <svg v-if="status.isOpen" class="ui-icon btn-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m3 11 18-8-8 18-2-7-8-3Z" />
            </svg>
            <svg v-else class="ui-icon btn-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 11.6A8.3 8.3 0 0 1 7.8 19l-3.8 1 1-3.7A8.3 8.3 0 1 1 20 11.6Z" />
              <path d="M9.3 8.9c.2-.3.4-.3.6-.3h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2.1.4 0 .6l-.3.5c-.1.1-.2.3-.1.5.2.4.7 1.1 1.5 1.7.9.7 1.6.9 2 .9.2 0 .3-.1.5-.2l.5-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.3.3.3.5v.5c0 .3 0 .5-.3.6-.4.3-.9.4-1.4.4-.8 0-1.9-.2-3.4-1.1-2.5-1.4-4.1-4.3-4.1-5 0-.4.1-.8.4-1.1Z" />
            </svg>
            <span>{{ primaryHubActionLabel }}</span>
          </button>

          <div class="hub-links">
            <a
              class="hub-link"
              :href="googleMapsSearchUrl"
              target="_blank"
              rel="noreferrer"
              @click="trackEvent('click_maps_link', 'store', 'hub')"
            >
              <svg class="ui-icon btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Abrir no Google Maps
            </a>
            <a
              class="hub-link ghost"
              :href="whatsappUrl"
              target="_blank"
              rel="noreferrer"
              @click="trackEvent('click_whatsapp_link', 'store', 'hub')"
            >
              <svg class="ui-icon btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 11.6A8.3 8.3 0 0 1 7.8 19l-3.8 1 1-3.7A8.3 8.3 0 1 1 20 11.6Z" />
                <path d="M9.3 8.9c.2-.3.4-.3.6-.3h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2.1.4 0 .6l-.3.5c-.1.1-.2.3-.1.5.2.4.7 1.1 1.5 1.7.9.7 1.6.9 2 .9.2 0 .3-.1.5-.2l.5-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.3.3.3.5v.5c0 .3 0 .5-.3.6-.4.3-.9.4-1.4.4-.8 0-1.9-.2-3.4-1.1-2.5-1.4-4.1-4.3-4.1-5 0-.4.1-.8.4-1.1Z" />
              </svg>
              Pedir no WhatsApp
            </a>
          </div>
        </div>

        <p v-if="routeHint" class="route-hint">{{ routeHint }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  --hub-bg: color-mix(in srgb, var(--surface-1) 96%, transparent);
  --hub-border: var(--border-1);
  --hub-item-bg: var(--surface-2);
  --hub-item-border: var(--border-1);
  --hub-label-color: var(--text-3);
  --hub-chip-bg: var(--surface-2);
  --hub-chip-border: var(--border-1);
  --hub-chip-text: var(--text-2);
  --hub-chip-dot: color-mix(in srgb, var(--text-3) 70%, transparent);
  --hub-open-glow: color-mix(in srgb, var(--accent-600) 45%, transparent);
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: clamp(16px, 2.6vw, 34px);
  align-items: start;
}

:global(:root[data-theme='dark']) .hero-section {
  --hub-bg: color-mix(in srgb, #101a26 86%, var(--surface-1) 14%);
  --hub-border: color-mix(in srgb, var(--accent-600) 24%, var(--border-1));
  --hub-item-bg: color-mix(in srgb, #112130 82%, var(--surface-2) 18%);
  --hub-item-border: color-mix(in srgb, var(--accent-600) 18%, var(--border-1));
  --hub-label-color: color-mix(in srgb, #adc0db 76%, var(--text-3));
  --hub-chip-bg: color-mix(in srgb, #1a2a3a 76%, var(--surface-2));
  --hub-chip-border: color-mix(in srgb, #3b546d 60%, var(--border-1));
  --hub-chip-text: #d9e8fa;
  --hub-chip-dot: color-mix(in srgb, #b8cbe2 68%, transparent);
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
  display: grid;
  align-items: end;
  gap: 14px;
}

.hero-media {
  --hero-bg-url: url('/imgs/hero-dark-bg.webp');
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border-1);
  background: linear-gradient(
      160deg,
      color-mix(in srgb, #081116 64%, transparent) 0%,
      color-mix(in srgb, #0b1820 38%, transparent) 45%,
      color-mix(in srgb, #0b2029 22%, transparent) 100%
    ),
    var(--hero-bg-url) center / cover no-repeat;
  box-shadow: var(--shadow-1);
  min-height: clamp(340px, 40vw, 520px);
  padding: 22px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: end;
  gap: 12px;
}

.announcement-copy {
  background: color-mix(in srgb, var(--surface-1) 78%, transparent);
  backdrop-filter: blur(2px);
  border: 1px solid color-mix(in srgb, var(--accent-600) 20%, var(--border-1));
  border-radius: 16px;
  box-shadow: var(--shadow-2);
  padding: 14px 14px 12px;
  display: grid;
  gap: 10px;
}

.announcement-tag {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  font-weight: 800;
}

.announcement-copy h3 {
  margin: 0;
  font-size: clamp(1.25rem, 2.6vw, 2rem);
  line-height: 1.08;
}

.announcement-copy p {
  margin: 0;
  color: var(--text-2);
  font-size: 1rem;
  line-height: 1.35;
}

.announcement-meta {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.82rem;
}

.announcement-status {
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--text-3) 30%, transparent);
  background: color-mix(in srgb, var(--surface-2) 84%, transparent);
  color: var(--text-2);
  font-weight: 700;
  padding: 4px 9px;
}

.announcement-status.open {
  border-color: color-mix(in srgb, var(--accent-600) 35%, transparent);
  background: color-mix(in srgb, var(--accent-500) 18%, transparent);
  color: color-mix(in srgb, var(--accent-700) 82%, #fff 18%);
}

.announcement-cta {
  margin-top: 4px;
  width: fit-content;
  border: 0;
  border-radius: 999px;
  padding: 10px 18px;
  background: var(--cta-gradient);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

.announcement-image {
  width: min(340px, 100%);
  justify-self: end;
  align-self: end;
  object-fit: contain;
  filter: drop-shadow(0 22px 30px rgba(12, 19, 29, 0.35));
}

.announcement-nav {
  grid-column: 1 / -1;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.nav-arrow {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-1) 82%, transparent);
  color: var(--text-1);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.nav-dots {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.nav-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  border: 0;
  background: color-mix(in srgb, var(--text-3) 40%, transparent);
  cursor: pointer;
}

.nav-dot.active {
  width: 28px;
  background: var(--accent-600);
}

.pickup-hub {
  width: 100%;
  border-radius: 18px;
  border: 1px solid var(--hub-border);
  background: var(--hub-bg);
  box-shadow: var(--shadow-1);
  padding: 14px 14px 12px;
  display: grid;
  gap: 10px;
}

.hub-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.hub-title h3 {
  margin: 0;
  font-size: clamp(1.14rem, 1.7vw, 1.32rem);
}

.hub-kicker {
  margin: 0 0 3px;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--accent-700) 58%, var(--text-3) 42%);
  font-weight: 700;
}

.status-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--hub-chip-border);
  background: var(--hub-chip-bg);
  color: var(--hub-chip-text);
  font-size: 0.78rem;
  font-weight: 800;
  padding: 6px 11px;
  white-space: nowrap;
  gap: 6px;
}

.status-chip::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--hub-chip-dot);
}

.status-chip.open::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  border: 1px solid var(--hub-open-glow);
  animation: statusPulse 2.4s ease-out infinite;
}

.status-chip.open {
  border-color: color-mix(in srgb, var(--accent-600) 40%, transparent);
  background: color-mix(in srgb, var(--accent-500) 24%, transparent);
  color: color-mix(in srgb, var(--accent-700) 82%, #fff 18%);
}

.status-chip.open::before {
  background: color-mix(in srgb, var(--accent-700) 82%, #fff 18%);
}

.store-location {
  margin: 0;
  font-weight: 700;
  color: var(--text-1);
}

.store-address {
  margin: 0;
  color: var(--text-2);
  font-size: 0.9rem;
}

.hub-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

.hub-item {
  border: 1px solid var(--hub-item-border);
  border-radius: 10px;
  background: var(--hub-item-bg);
  padding: 8px 10px;
  display: grid;
  gap: 3px;
}

.hub-stat-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--hub-label-color);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hub-item strong {
  color: var(--text-1);
  font-weight: 700;
  font-size: 0.92rem;
  line-height: 1.2;
}

.hub-actions {
  display: grid;
  gap: 8px;
}

.route-btn {
  width: 100%;
  border: 0;
  border-radius: 999px;
  padding: 12px 14px;
  background: var(--cta-gradient);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.route-btn:disabled {
  opacity: 0.78;
  cursor: not-allowed;
}

.hub-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.hub-link {
  border-radius: 999px;
  padding: 9px 12px;
  border: 1px solid color-mix(in srgb, var(--accent-600) 30%, var(--border-1));
  background: color-mix(in srgb, var(--accent-500) 14%, var(--surface-1));
  color: color-mix(in srgb, var(--accent-700) 72%, var(--text-1) 28%);
  text-align: center;
  font-size: 0.87rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

.hub-link.ghost {
  border-color: var(--border-1);
  background: var(--surface-2);
  color: var(--text-1);
}

.route-hint {
  margin: 0;
  font-size: 0.82rem;
  color: var(--text-3);
}

.ui-icon {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex: none;
}

.ui-icon.mini {
  width: 12px;
  height: 12px;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

@keyframes statusPulse {
  0% {
    transform: scale(0.98);
    opacity: 0.55;
  }

  75% {
    transform: scale(1.08);
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .status-chip.open::after {
    animation: none;
    opacity: 0.2;
  }
}

@media (max-width: 1100px) {
  .hero-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 980px) {
  .hero-media {
    --hero-bg-url: url('/imgs/hero-dark-bg-mobile.webp');
    grid-template-columns: 1fr;
    min-height: 420px;
  }

  .announcement-copy {
    align-self: start;
    max-width: 380px;
  }

  .announcement-image {
    width: min(280px, 78%);
    justify-self: center;
  }
}

@media (max-width: 640px) {
  .hero-copy {
    border-radius: 18px;
    padding: 18px;
  }

  .hero-media {
    border-radius: 16px;
    min-height: 380px;
    padding: 12px;
  }

  .announcement-copy {
    max-width: 100%;
    padding: 10px;
  }

  .announcement-copy h3 {
    font-size: 1.45rem;
  }

  .announcement-copy p {
    font-size: 0.95rem;
  }

  .announcement-image {
    width: min(220px, 66%);
  }

  .announcement-nav {
    margin-top: 2px;
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

  .hub-header {
    flex-wrap: wrap;
  }

  .hub-grid,
  .hub-links {
    grid-template-columns: 1fr;
  }
}
</style>
