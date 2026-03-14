<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "~/stores/cart";
import { formatPrice } from "~/utils/format";

const props = defineProps<{
  whatsappPhone?: string;
}>();

const cart = useCartStore();
const phone = computed(() => props.whatsappPhone || "5582998763021");
const hasItems = computed(() => cart.totalItems > 0);
const whatsappUrl = computed(() => cart.buildWhatsappUrl(phone.value));
</script>

<template>
  <div class="cart-content">
    <header class="cart-head">
      <div>
        <p class="eyebrow">Carrinho</p>
        <h3>Itens selecionados</h3>
      </div>
      <span class="pill">{{ cart.totalItems }} itens</span>
    </header>

    <ul v-if="cart.items.length" class="cart-list">
      <li v-for="item in cart.items" :key="item.id" class="cart-line">
        <img :src="item.image" :alt="item.name" loading="lazy" />

        <div class="line-body">
          <div class="line-top">
            <strong>{{ item.name }}</strong>
            <button class="remove-btn" type="button" aria-label="Remover item" @click="cart.remove(item.id)">
              x
            </button>
          </div>

          <p class="line-meta">{{ item.qty }} x {{ formatPrice(item.price) }}</p>

          <div class="qty-row">
            <button class="qty-btn ghost" type="button" aria-label="Diminuir quantidade" @click="cart.decrement(item.id)">
              -
            </button>
            <span class="qty-value">{{ item.qty }}</span>
            <button class="qty-btn" type="button" aria-label="Aumentar quantidade" @click="cart.increment(item.id)">
              +
            </button>
            <strong class="line-total">{{ formatPrice(item.price * item.qty) }}</strong>
          </div>
        </div>
      </li>
    </ul>

    <p v-else class="empty">Seu carrinho esta vazio. Adicione itens para montar o pedido.</p>

    <div class="cart-total">
      <span>Total</span>
      <strong>{{ formatPrice(cart.totalPrice) }}</strong>
    </div>

    <div class="cart-actions">
      <button class="ghost full" type="button" :disabled="!hasItems" @click="cart.clear()">Limpar carrinho</button>
      <a
        class="primary full"
        :class="{ disabled: !hasItems }"
        :href="hasItems ? whatsappUrl : '#'"
        target="_blank"
        rel="noreferrer"
      >
        Pedir pelo WhatsApp
      </a>
    </div>

    <div class="contact-card" aria-label="Fale conosco">
      <div class="contact-row">
        <div class="icon-bubble" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M20 11.6A8.3 8.3 0 0 1 7.8 19l-3.8 1 1-3.7A8.3 8.3 0 1 1 20 11.6Z" />
            <path d="M9.3 8.9c.2-.3.4-.3.6-.3h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2.1.4 0 .6l-.3.5c-.1.1-.2.3-.1.5.2.4.7 1.1 1.5 1.7.9.7 1.6.9 2 .9.2 0 .3-.1.5-.2l.5-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.3.3.3.5v.5c0 .3 0 .5-.3.6-.4.3-.9.4-1.4.4-.8 0-1.9-.2-3.4-1.1-2.5-1.4-4.1-4.3-4.1-5 0-.4.1-.8.4-1.1Z" />
          </svg>
        </div>
        <div>
          <p class="eyebrow">Fale conosco</p>
          <strong>WhatsApp</strong>
        </div>
      </div>

      <a class="ghost full" :href="whatsappUrl" target="_blank" rel="noreferrer">Chamar agora</a>
    </div>
  </div>
</template>

<style scoped>
.cart-content {
  display: grid;
  gap: 12px;
}

.cart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 800;
  font-size: 0.72rem;
  color: color-mix(in srgb, var(--accent-700) 70%, var(--text-2));
}

.cart-head h3 {
  margin: 2px 0 0;
  font-size: 1.2rem;
}

.pill {
  border-radius: 999px;
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-2) 84%, transparent);
  padding: 6px 12px;
  font-weight: 700;
  white-space: nowrap;
}

.cart-list {
  list-style: none;
  padding: 0 4px 0 0;
  margin: 0;
  display: grid;
  gap: 10px;
  max-height: min(50vh, 520px);
  overflow: auto;
}

.cart-line {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 10px;
  border: 1px solid var(--border-1);
  border-radius: 14px;
  padding: 10px;
  background: color-mix(in srgb, var(--surface-2) 92%, transparent);
}

.cart-line img {
  width: 58px;
  height: 58px;
  object-fit: contain;
  border-radius: 10px;
  background: color-mix(in srgb, var(--surface-1) 88%, transparent);
}

.line-body {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.line-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.line-top strong {
  font-size: 1rem;
  line-height: 1.05;
}

.line-meta {
  margin: 0;
  color: var(--text-3);
  font-weight: 600;
}

.qty-row {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 12px;
  padding: 0;
  background: var(--cta-gradient);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

.qty-btn.ghost {
  background: color-mix(in srgb, var(--surface-1) 94%, transparent);
  border: 1px solid var(--border-1);
  color: var(--text-1);
}

.qty-value {
  min-width: 18px;
  font-weight: 800;
  text-align: center;
}

.line-total {
  justify-self: end;
  font-size: 1rem;
}

.remove-btn {
  border: 0;
  background: transparent;
  color: var(--text-3);
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
}

.empty {
  margin: 0;
  color: var(--text-3);
  border: 1px dashed var(--border-1);
  border-radius: 14px;
  padding: 14px;
  background: color-mix(in srgb, var(--surface-2) 84%, transparent);
}

.cart-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-1);
  padding-top: 10px;
  font-size: 1.05rem;
}

.cart-total strong {
  font-size: 1.35rem;
}

.cart-actions {
  display: grid;
  gap: 8px;
}

.primary,
.ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 14px;
  font-weight: 800;
  text-align: center;
  line-height: 1.08;
}

.primary {
  border: 0;
  background: var(--cta-gradient);
  color: #fff;
}

.primary.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.ghost {
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-1) 94%, transparent);
  color: var(--text-1);
}

.ghost:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.full {
  width: 100%;
}

.contact-card {
  border: 1px solid var(--border-1);
  border-radius: 16px;
  padding: 10px;
  background: color-mix(in srgb, var(--surface-2) 92%, transparent);
  display: grid;
  gap: 10px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-bubble {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--accent-500) 20%, var(--surface-1));
  color: var(--accent-700);
}

.icon-bubble svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 780px) {
  .cart-list {
    max-height: none;
  }
}

@media (max-width: 420px) {
  .qty-row {
    grid-template-columns: auto auto auto 1fr;
    gap: 6px;
  }

  .qty-btn {
    width: 34px;
    height: 34px;
  }
}
</style>
