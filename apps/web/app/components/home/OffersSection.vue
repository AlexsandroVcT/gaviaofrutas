<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import type { OfferItem } from "~/types/home";

const props = defineProps<{
  offers: OfferItem[];
}>();

const scroller = ref<HTMLElement | null>(null);
const activePage = ref(0);
const cardsPerView = ref(1);
const isHovering = ref(false);
const isDesktopAutoplay = ref(false);

let autoplayTimer: ReturnType<typeof setInterval> | null = null;
let scrollFrame: number | null = null;

const maxPageIndex = computed(() => Math.max(0, props.offers.length - cardsPerView.value));
const pageCount = computed(() => maxPageIndex.value + 1);
const hasMultiplePages = computed(() => props.offers.length > cardsPerView.value);

function resolveOfferHref(offer: OfferItem) {
  return offer.href || "#produtos";
}

function updateResponsiveState() {
  if (!process.client) return;

  const desiredCardsPerView = window.innerWidth >= 1180 ? 3 : window.innerWidth >= 720 ? 2 : 1;

  cardsPerView.value = Math.min(Math.max(props.offers.length, 1), desiredCardsPerView);
  isDesktopAutoplay.value =
    window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearAutoplayTimer() {
  if (!autoplayTimer) return;

  clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function clampPage(index: number) {
  return Math.min(Math.max(index, 0), maxPageIndex.value);
}

function getScrollStep() {
  const element = scroller.value;
  const firstCard = element?.querySelector<HTMLElement>(".offer-card");

  if (!element || !firstCard) return 0;

  const gap = Number.parseFloat(getComputedStyle(element).columnGap || "0");
  return firstCard.offsetWidth + gap;
}

function scrollToPage(index: number, behavior: ScrollBehavior = "smooth") {
  const element = scroller.value;
  const step = getScrollStep();
  const nextPage = clampPage(index);

  activePage.value = nextPage;

  if (!element || !step) return;

  element.scrollTo({
    left: step * nextPage,
    behavior,
  });
}

function syncActivePageFromScroll() {
  const element = scroller.value;
  const step = getScrollStep();

  if (!element || !step) return;

  activePage.value = clampPage(Math.round(element.scrollLeft / step));
}

function queueScrollSync() {
  if (!process.client) return;

  if (scrollFrame !== null) {
    window.cancelAnimationFrame(scrollFrame);
  }

  scrollFrame = window.requestAnimationFrame(() => {
    syncActivePageFromScroll();
    scrollFrame = null;
  });
}

function goToPage(index: number) {
  scrollToPage(index);
}

function advancePage() {
  scrollToPage(activePage.value >= maxPageIndex.value ? 0 : activePage.value + 1);
}

function startAutoplay() {
  clearAutoplayTimer();

  if (!process.client || !isDesktopAutoplay.value || !hasMultiplePages.value || isHovering.value) {
    return;
  }

  autoplayTimer = setInterval(() => {
    advancePage();
  }, 4200);
}

async function syncLayout() {
  updateResponsiveState();
  await nextTick();
  scrollToPage(clampPage(activePage.value), "auto");
  startAutoplay();
}

function handleResize() {
  void syncLayout();
}

function handleVisibilityChange() {
  if (document.hidden) {
    clearAutoplayTimer();
    return;
  }

  startAutoplay();
}

onMounted(() => {
  void syncLayout();

  window.addEventListener("resize", handleResize);
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
  clearAutoplayTimer();

  if (scrollFrame !== null && process.client) {
    window.cancelAnimationFrame(scrollFrame);
  }

  window.removeEventListener("resize", handleResize);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<template>
  <section id="ofertas" class="offers-section" aria-label="Ofertas do dia">
    <header class="offers-head">
      <div class="eyebrow">Ofertas do dia</div>
      <div class="title-group">
        <h2>Prioridade para quem quer retirar hoje</h2>
        <p>Selecao rapida das ofertas em estoque e ja prontas para separacao.</p>
      </div>
      <a class="all-offers" href="#produtos">Ver todos os produtos</a>
    </header>

    <div
      ref="scroller"
      class="offers-carousel"
      :style="{ '--offers-per-view': String(cardsPerView) }"
      @mouseenter="isHovering = true; startAutoplay()"
      @mouseleave="isHovering = false; startAutoplay()"
      @scroll.passive="queueScrollSync"
    >
      <article
        v-for="offer in props.offers"
        :key="offer.id"
        class="offer-card"
      >
        <div class="offer-copy">
          <p class="offer-tag">{{ offer.title }}</p>
          <h3>{{ offer.description }}</h3>
          <a class="offer-cta" :href="resolveOfferHref(offer)">{{ offer.cta }}</a>
        </div>

        <img v-if="offer.image" :src="offer.image" :alt="offer.title" loading="lazy" />
      </article>
    </div>

    <div v-if="pageCount > 1" class="offers-nav" aria-label="Navegacao das ofertas">
      <button
        v-for="index in pageCount"
        :key="`offer-page-${index}`"
        type="button"
        :class="['nav-dot', { active: activePage === index - 1 }]"
        :aria-label="`Ir para grupo ${index}`"
        :aria-pressed="activePage === index - 1"
        @click="goToPage(index - 1)"
      />
    </div>
  </section>
</template>

<style scoped>
.offers-section {
  border: 1px solid var(--border-1);
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface-1) 92%, transparent);
  box-shadow: var(--shadow-1);
  padding: 16px 16px 14px;
  display: grid;
  gap: 12px;
}

.offers-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px 14px;
  row-gap: 6px;
  align-items: center;
}

.eyebrow {
  padding: 8px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent-500) 14%, var(--surface-2));
  color: color-mix(in srgb, var(--accent-700) 78%, var(--text-1) 22%);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.title-group h2 {
  margin: 0;
  font-size: clamp(1.85rem, 3vw, 2.55rem);
  line-height: 1.05;
}

.title-group p {
  margin: 6px 0 0;
  color: var(--text-2);
}

.all-offers {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--border-1);
  padding: 11px 18px;
  font-weight: 700;
  color: var(--text-1);
  background: var(--surface-2);
  line-height: 1.05;
  justify-self: end;
}

.offers-carousel {
  --offers-gap: 12px;
  --offers-per-view: 1;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - var(--offers-gap) * (var(--offers-per-view) - 1)) / var(--offers-per-view));
  gap: var(--offers-gap);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.offers-carousel::-webkit-scrollbar {
  display: none;
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
  gap: 12px;
  min-height: 198px;
  min-width: 0;
  scroll-snap-align: start;
}

.offer-copy {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.offer-tag {
  margin: 0;
  color: color-mix(in srgb, var(--accent-700) 70%, var(--text-2));
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.offer-copy h3 {
  margin: 0;
  font-size: clamp(1.25rem, 2.2vw, 1.55rem);
  line-height: 1.1;
}

.offer-copy p {
  margin: 6px 0 10px;
  color: var(--text-2);
}

.offer-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 11px 16px;
  background: var(--cta-gradient);
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.01em;
  margin-top: 4px;
  min-width: 134px;
  line-height: 1.05;
}

.offer-media {
  width: 86px;
  height: 86px;
  flex: 0 0 auto;
}

.offer-card img {
  width: 86px;
  height: 86px;
  object-fit: contain;
}

.offers-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.nav-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background: color-mix(in srgb, var(--text-3) 40%, transparent);
  cursor: pointer;
  transition: width 0.18s ease, background-color 0.18s ease;
}

.nav-dot.active {
  width: 28px;
  background: var(--accent-600);
}

@media (max-width: 1200px) {
  .offers-head {
    grid-template-columns: 1fr auto;
    align-items: flex-start;
  }

  .all-offers {
    justify-self: start;
  }
}

@media (max-width: 900px) {
  .offers-section {
    padding: 14px 12px;
  }

  .offers-head {
    grid-template-columns: 1fr;
  }

  .all-offers {
    width: 100%;
    text-align: center;
    margin-top: 4px;
  }

  .offer-card {
    gap: 12px;
  }
}

@media (max-width: 620px) {
  .offers-section {
    padding: 12px 10px;
    border-radius: 16px;
  }

  .offers-carousel {
    --offers-gap: 10px;
  }

  .offer-card {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 10px;
  }

  .offer-cta {
    width: 100%;
    justify-content: center;
    min-width: unset;
  }

  .offer-card img {
    width: 72px;
    height: 72px;
  }

  .offer-media {
    width: 72px;
    height: 72px;
  }

  .gift-box {
    right: 0;
    width: 34px;
    height: 25px;
  }

  .gift-lid {
    width: 38px;
  }
}

@media (hover: none) {
  .offers-carousel {
    scroll-snap-type: x proximity;
  }
}
</style>
