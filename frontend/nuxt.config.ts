// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  devServer: {
    port: 3002,
  },
  css: ["vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/variables.sass" as *' + "\n",
        },
      },
    },
  },
  components: true,
  runtimeConfig: {
    baseUrl: process.env.BASE_URL_SERVER,
    public: {
      baseUrl: process.env.BASE_URL_CLIENT,
    },
  },
});
