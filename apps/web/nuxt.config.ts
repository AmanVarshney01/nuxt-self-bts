import "@my-better-t-app-3/env/web";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "latest",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  devServer: {
    port: 3001,
  },
  ssr: true,
  runtimeConfig: {
    public: {
      serverUrl: process.env.NUXT_PUBLIC_SERVER_URL,
    },
  },
});
