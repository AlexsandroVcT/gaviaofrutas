const isProduction = process.env.NODE_ENV === 'production';
const defaultCatalogApiBase = isProduction ? 'https://gaviaofrutas.com.br' : 'http://127.0.0.1:3001';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  modules: ['@pinia/nuxt', '@nuxtjs/robots', '@nuxtjs/sitemap'],
  site: {
    name: 'Gaviao Frutas',
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gaviaofrutas.com.br'
  },
  runtimeConfig: {
    catalogApiBase:
      process.env.NUXT_CATALOG_API_BASE ||
      process.env.NUXT_API_BASE ||
      process.env.API_BASE ||
      defaultCatalogApiBase,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gaviaofrutas.com.br'
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'Gaviao Frutas',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Gaviao Frutas e Alimentos - produtos frescos com retirada na loja em Santa Luzia do Norte.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/imgs/favicon-48.webp' }
      ]
    }
  },
  robots: {
    sitemap: ['/sitemap.xml']
  },
  sitemap: {
    autoLastmod: true,
    sources: ['/api/__sitemap__/urls']
  }
})
