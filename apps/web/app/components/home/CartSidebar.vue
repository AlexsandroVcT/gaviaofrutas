<script setup lang="ts">
const props = defineProps<{
  whatsappPhone?: string;
}>();
</script>

<template>
  <aside id="carrinho" class="cart-panel" aria-label="Carrinho">
    <CartPanelContent :whatsapp-phone="props.whatsappPhone" />
  </aside>
</template>

<style scoped>
.cart-panel {
  border: 1px solid var(--border-1);
  border-radius: 20px;
  background:
    radial-gradient(circle at 84% 12%, rgba(99, 190, 73, 0.12) 0%, transparent 34%),
    linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 96%, transparent), color-mix(in srgb, var(--surface-2) 92%, transparent));
  box-shadow: var(--shadow-1);
  padding: 14px;
  display: grid;
  gap: 12px;
  align-self: start;
  position: sticky;
  top: 96px;
}
</style>
