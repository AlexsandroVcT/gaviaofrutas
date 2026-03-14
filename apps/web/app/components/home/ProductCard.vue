<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useCartStore } from "~/stores/cart";
import type { ProductItem } from "~/types/home";
import { formatPrice } from "~/utils/format";

type ProductCardAction = {
  label: string;
  href?: string;
  target?: "_blank" | "_self";
  rel?: string;
  icon?: "cart" | "instagram" | "none";
  tone?: "secondary" | "primary";
};

const props = withDefaults(
  defineProps<{
    product: ProductItem;
    whatsappPhone?: string;
    showRating?: boolean;
    badgeLabel?: string;
    infoLabel?: string;
    emphasis?: "default" | "fresh";
    layout?: "default" | "compact";
    primaryAction?: ProductCardAction;
    secondaryAction?: ProductCardAction;
  }>(),
  {
    showRating: true,
    emphasis: "default",
    layout: "default",
  },
);

const slots = useSlots();
const cart = useCartStore();

const defaultPrimaryAction = computed<ProductCardAction>(() => ({
  label: "Adicionar",
  icon: "cart",
  tone: "secondary",
}));

const defaultSecondaryAction = computed<ProductCardAction>(() => ({
  label: "Pedir no WhatsApp",
  href: buildWhatsAppLink(props.product),
  target: "_blank",
  rel: "noreferrer",
  icon: "none",
  tone: "primary",
}));

const resolvedPrimaryAction = computed(() => normalizeAction(props.primaryAction ?? defaultPrimaryAction.value, "secondary"));
const resolvedSecondaryAction = computed(() => normalizeAction(props.secondaryAction ?? defaultSecondaryAction.value, "primary"));

function buildWhatsAppLink(product: ProductItem) {
  const message = `Ola! Quero pedir ${product.name} (${product.unit}).`;
  const phone = props.whatsappPhone || "5582998763021";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function normalizeAction(action: ProductCardAction, defaultTone: "secondary" | "primary"): ProductCardAction {
  const href = action.href;
  const isExternal = Boolean(href && /^https?:\/\//.test(href));

  return {
    ...action,
    icon: action.icon ?? "none",
    tone: action.tone ?? defaultTone,
    target: href ? action.target ?? (isExternal ? "_blank" : "_self") : undefined,
    rel: href && (action.target === "_blank" || (!action.target && isExternal)) ? action.rel ?? "noreferrer" : action.rel,
  };
}

function addToCart(product: ProductItem) {
  cart.add(product, 1);
}

function handleAction(action: ProductCardAction) {
  if (action.href) return;
  addToCart(props.product);
}
</script>

<template>
  <article
    :class="[
      'product-card',
      `is-${props.emphasis}`,
      `layout-${props.layout}`,
      { 'has-badge': props.badgeLabel, 'has-header': slots.header },
    ]"
  >
    <span v-if="props.badgeLabel" class="card-badge">
      <span class="badge-dot" aria-hidden="true" />
      {{ props.badgeLabel }}
    </span>

    <div v-if="slots.header" class="card-header">
      <slot name="header" />
    </div>

    <img :src="props.product.image" :alt="props.product.name" loading="lazy" />

    <div class="product-body">
      <h3>
        {{ props.product.name }}
        <span>({{ props.product.unit }})</span>
      </h3>

      <p v-if="props.showRating" class="rating">{{ "★".repeat(props.product.rating) }}</p>

      <strong>{{ formatPrice(props.product.price) }}</strong>

      <p v-if="props.infoLabel" class="fresh-note">
        <span class="fresh-note-icon" aria-hidden="true" />
        {{ props.infoLabel }}
      </p>
    </div>

    <div class="card-actions">
      <component
        :is="resolvedPrimaryAction.href ? 'a' : 'button'"
        class="card-action"
        :class="resolvedPrimaryAction.tone"
        :href="resolvedPrimaryAction.href"
        :target="resolvedPrimaryAction.href ? resolvedPrimaryAction.target : undefined"
        :rel="resolvedPrimaryAction.href ? resolvedPrimaryAction.rel : undefined"
        :type="resolvedPrimaryAction.href ? undefined : 'button'"
        @click="handleAction(resolvedPrimaryAction)"
      >
        <svg v-if="resolvedPrimaryAction.icon === 'cart'" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6h15l-1.2 6H8.2" />
          <circle cx="9" cy="19" r="1.4" />
          <circle cx="18" cy="19" r="1.4" />
          <path d="M6 6 5 3H2" />
        </svg>
        <svg v-else-if="resolvedPrimaryAction.icon === 'instagram'" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
        {{ resolvedPrimaryAction.label }}
      </component>

      <component
        :is="resolvedSecondaryAction.href ? 'a' : 'button'"
        class="card-action"
        :class="resolvedSecondaryAction.tone"
        :href="resolvedSecondaryAction.href"
        :target="resolvedSecondaryAction.href ? resolvedSecondaryAction.target : undefined"
        :rel="resolvedSecondaryAction.href ? resolvedSecondaryAction.rel : undefined"
        :type="resolvedSecondaryAction.href ? undefined : 'button'"
        @click="handleAction(resolvedSecondaryAction)"
      >
        <svg v-if="resolvedSecondaryAction.icon === 'cart'" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6h15l-1.2 6H8.2" />
          <circle cx="9" cy="19" r="1.4" />
          <circle cx="18" cy="19" r="1.4" />
          <path d="M6 6 5 3H2" />
        </svg>
        <svg v-else-if="resolvedSecondaryAction.icon === 'instagram'" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
        {{ resolvedSecondaryAction.label }}
      </component>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  position: relative;
  border: 1px solid var(--border-1);
  border-radius: 18px;
  background:
    radial-gradient(circle at 76% 10%, rgba(99, 190, 73, 0.11) 0%, transparent 36%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 98%, transparent), color-mix(in srgb, var(--surface-2) 94%, transparent));
  box-shadow: var(--shadow-2);
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100%;
}

.product-card.has-badge {
  padding-top: 42px;
}

.product-card.has-header .card-header {
  margin-bottom: 8px;
}

.product-card.is-fresh {
  background:
    radial-gradient(circle at 78% 8%, rgba(99, 190, 73, 0.2) 0%, transparent 36%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 98%, transparent), color-mix(in srgb, #eef8ec 62%, var(--surface-2) 38%));
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent-600) 34%, var(--border-1));
  background: color-mix(in srgb, var(--surface-1) 90%, transparent);
  padding: 6px 10px;
  color: color-mix(in srgb, var(--accent-700) 82%, var(--text-1) 18%);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--accent-600);
  box-shadow: 0 0 0 0 rgba(61, 159, 52, 0.35);
  animation: freshPulse 1.8s ease-out infinite;
}

.product-card img {
  width: 100%;
  height: 116px;
  object-fit: contain;
}

.product-body {
  margin-top: 8px;
  display: grid;
  gap: 4px;
}

.product-card h3 {
  margin: 0;
  line-height: 1.08;
  font-size: clamp(1.08rem, 1.4vw, 1.32rem);
  overflow-wrap: anywhere;
}

.product-card h3 span {
  color: var(--text-3);
  font-size: 0.92rem;
  font-weight: 600;
}

.rating {
  margin: 2px 0 0;
  color: #ffc62f;
  letter-spacing: 1.5px;
  font-size: 0.98rem;
}

.product-card strong {
  font-size: 1.08rem;
}

.fresh-note {
  margin: 2px 0 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--text-2);
  font-size: 0.84rem;
  font-weight: 600;
}

.fresh-note-icon {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent-500) 82%, white 18%);
  flex: none;
}

.card-actions {
  margin-top: auto;
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.card-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 11px 12px;
  font-weight: 800;
  width: 100%;
  border: 1px solid transparent;
  line-height: 1.08;
}

.card-action.secondary {
  border-color: var(--border-1);
  background: color-mix(in srgb, var(--surface-2) 92%, transparent);
  color: var(--text-1);
  box-shadow: var(--shadow-2);
}

.card-action svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.card-action.primary {
  background: var(--cta-gradient);
  color: #fff;
  text-align: center;
}

.product-card.layout-compact {
  border-radius: 16px;
  padding: 10px;
}

.product-card.layout-compact.has-badge {
  padding-top: 38px;
}

.product-card.layout-compact img {
  height: 92px;
}

.product-card.layout-compact .card-header {
  padding-right: 80px;
  margin-bottom: 6px;
}

.product-card.layout-compact h3 {
  font-size: 1.02rem;
}

.product-card.layout-compact strong {
  font-size: 1rem;
}

.product-card.layout-compact .fresh-note {
  font-size: 0.78rem;
}

.product-card.layout-compact .card-actions {
  padding-top: 10px;
  gap: 7px;
}

.product-card.layout-compact .card-action {
  padding: 10px;
  font-size: 0.92rem;
}

@keyframes freshPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(61, 159, 52, 0.32);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(61, 159, 52, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(61, 159, 52, 0);
  }
}

@media (max-width: 640px) {
  .product-card img {
    height: 106px;
  }
}

@media (max-width: 520px) {
  .product-card h3 {
    font-size: 1.3rem;
  }
}
</style>
