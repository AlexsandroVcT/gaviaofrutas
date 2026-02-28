<script setup lang="ts">
const homeData = await useHomeData();
</script>

<template>
  <div class="home-page">
    <SiteHeader :menu-items="homeData.menuItems" :cart-count="2" />

    <main class="main-content">
      <HeroSection :highlights="homeData.heroHighlights" />
      <CategoriesSection :categories="homeData.categories" />
      <ProductShowcase :products="homeData.products" />
      <BenefitsSection :benefits="homeData.benefits" />
      <OffersSection :offers="homeData.offers" />
    </main>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 18px 28px;
  display: grid;
  gap: 0;
}

@media (max-width: 980px) {
  .main-content {
    padding-top: 16px;
  }
}

@media (max-width: 640px) {
  .main-content {
    padding: 12px 10px 20px;
  }
}
</style>
