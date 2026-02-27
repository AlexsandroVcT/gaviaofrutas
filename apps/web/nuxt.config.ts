// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/robots', '@nuxtjs/sitemap'],
  site: {
    name: 'Gaviao Frutas',
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gaviaofrutas.com.br'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://gaviaofrutas.com.br',
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
      ]
    }
  },
  robots: {
    sitemap: ['/sitemap.xml']
  },
  sitemap: {
    autoLastmod: true
  }
})
