<template>
  <NuxtLink to="/" class="app-logo" aria-label="Gaviao Frutas - inicio">
    <picture>
      <source media="(max-width: 560px)" srcset="/imgs/logo-mark.webp" />
      <source media="(max-width: 980px)" srcset="/imgs/logo-mobile.webp" />
      <img src="/imgs/logo-desktop.webp" alt="Logo Gaviao Frutas" />
    </picture>
  </NuxtLink>
</template>

<style scoped>
.app-logo {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.app-logo img {
  display: block;
  width: clamp(176px, 20vw, 290px);
  height: auto;
}

@media (max-width: 980px) {
  .app-logo img {
    width: clamp(150px, 33vw, 220px);
  }
}

@media (max-width: 560px) {
  .app-logo img {
    width: clamp(52px, 14vw, 70px);
  }
}
</style>
