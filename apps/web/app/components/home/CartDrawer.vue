<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from "vue";

const props = defineProps<{
  open: boolean;
  whatsappPhone?: string;
}>();

const emit = defineEmits<{
  (event: "update:open", value: boolean): void;
}>();

function closeDrawer() {
  emit("update:open", false);
}

function syncBodyScroll(open: boolean) {
  if (!process.client) return;
  document.body.style.overflow = open ? "hidden" : "";
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && props.open) {
    closeDrawer();
  }
}

function handleResize() {
  if (window.innerWidth >= 1024 && props.open) {
    closeDrawer();
  }
}

watch(
  () => props.open,
  (open) => {
    syncBodyScroll(open);
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  syncBodyScroll(false);
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <Teleport to="body">
    <transition name="cart-drawer">
      <div v-if="props.open" class="cart-drawer-root">
        <button class="cart-drawer-backdrop" type="button" aria-label="Fechar carrinho" @click="closeDrawer" />

        <aside class="cart-drawer-panel" aria-label="Carrinho" role="dialog" aria-modal="true">
          <button class="close-btn" type="button" aria-label="Fechar carrinho" @click="closeDrawer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <CartPanelContent :whatsapp-phone="props.whatsappPhone" />
        </aside>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.cart-drawer-root {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  justify-content: flex-end;
}

.cart-drawer-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(11, 16, 24, 0.5);
  backdrop-filter: blur(3px);
  cursor: pointer;
}

.cart-drawer-panel {
  position: relative;
  z-index: 1;
  width: min(420px, 100%);
  height: 100%;
  overflow: auto;
  border-left: 1px solid var(--border-1);
  background:
    radial-gradient(circle at 84% 12%, rgba(99, 190, 73, 0.12) 0%, transparent 34%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 96%, transparent), color-mix(in srgb, var(--surface-2) 92%, transparent));
  box-shadow: var(--shadow-1);
  padding: 58px 14px 18px;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--border-1);
  background: color-mix(in srgb, var(--surface-1) 94%, transparent);
  color: var(--text-1);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.close-btn svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cart-drawer-enter-active,
.cart-drawer-leave-active {
  transition: opacity 0.2s ease;
}

.cart-drawer-enter-active .cart-drawer-panel,
.cart-drawer-leave-active .cart-drawer-panel {
  transition: transform 0.24s ease;
}

.cart-drawer-enter-from,
.cart-drawer-leave-to {
  opacity: 0;
}

.cart-drawer-enter-from .cart-drawer-panel,
.cart-drawer-leave-to .cart-drawer-panel {
  transform: translateX(100%);
}

@media (min-width: 1024px) {
  .cart-drawer-root {
    display: none;
  }
}

@media (max-width: 560px) {
  .cart-drawer-panel {
    width: 100%;
    padding: 54px 12px 16px;
  }

  .close-btn {
    top: 10px;
    right: 10px;
  }
}
</style>
