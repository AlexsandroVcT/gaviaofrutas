<template>
  <NuxtLink to="/" class="app-logo" aria-label="Gaviao Frutas - inicio">
    <picture>
      <source media="(max-width: 460px)" srcset="/imgs/logo-mobile.webp" />
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
    width: clamp(138px, 30vw, 196px);
  }
}

@media (max-width: 640px) {
  .app-logo img {
    width: clamp(126px, 36vw, 170px);
  }
}

@media (max-width: 420px) {
  .app-logo img {
    width: clamp(112px, 38vw, 148px);
  }
}
</style>
