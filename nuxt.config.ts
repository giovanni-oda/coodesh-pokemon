// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },

  app: {
    head: {
      title: 'Coodesh Pokemon Challenge',
      link: [
        {
          href: 'https://fonts.gstatic.com',
          rel: 'preconnect'
        },
        {
          href: 'https://fonts.googleapis.com',
          rel: 'preconnect'
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap',
          rel: 'stylesheet'
        }
      ]
    }
  },

  css: ['~/assets/style.css'],

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    }
  },

  nitro: {
    prerender: {
      // routes: ['/']
    }
  },

  routeRules: {
    '/': { ssr: true },
    '/pokemon/**': { ssr: true }
  }
})
