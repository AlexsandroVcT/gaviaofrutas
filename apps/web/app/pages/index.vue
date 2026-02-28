<script setup lang="ts">
const homeData = await useHomeData();
const config = useRuntimeConfig();
const siteUrl = (config.public.siteUrl || "https://gaviaofrutas.com.br").replace(/\/$/, "");

const weekdaySchema = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const openingHoursSpecification = homeData.store.hours
  .filter((item) => item.open && item.close)
  .map((item) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${weekdaySchema[item.day]}`,
    opens: item.open,
    closes: item.close,
  }));

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: homeData.store.name,
  image: `${siteUrl}/imgs/logo-desktop.webp`,
  url: siteUrl,
  telephone: `+${homeData.store.phone}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: homeData.store.address,
    addressLocality: "Santa Luzia do Norte",
    addressRegion: "AL",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: homeData.store.latitude,
    longitude: homeData.store.longitude,
  },
  openingHoursSpecification,
  sameAs: [
    "https://www.instagram.com/gaviao_fr",
    `https://wa.me/${homeData.store.phone}`,
  ],
};

const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gaviao Frutas",
  url: siteUrl,
  inLanguage: "pt-BR",
};

useSeoMeta({
  title: "Gaviao Frutas | Hortifruti em Santa Luzia do Norte",
  description:
    "Gaviao Frutas: hortifruti com retirada na loja em Santa Luzia do Norte. Chame no WhatsApp ou trace sua rota no Google Maps.",
  ogTitle: "Gaviao Frutas",
  ogDescription:
    "Retirada rapida na loja fisica, atendimento via WhatsApp e localizacao direta no Google Maps.",
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/imgs/hero-dark-bg.webp`,
  twitterCard: "summary_large_image",
});

useHead({
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(webSiteLd) },
    { type: "application/ld+json", innerHTML: JSON.stringify(localBusinessLd) },
  ],
});
</script>

<template>
  <div class="home-page">
    <SiteHeader :menu-items="homeData.menuItems" :cart-count="2" />

    <main class="main-content">
      <HeroSection
        :highlights="homeData.heroHighlights"
        :announcements="homeData.announcements"
        :store="homeData.store"
      />
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
