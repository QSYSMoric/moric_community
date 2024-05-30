import vuetify from "vite-plugin-vuetify";
import { presetUno } from "unocss";
// PWA Config
const title = "Vuetify 3 + Nuxt 3 Starter";
const shortTitle = "Vuetify 3 + Nuxt 3 Starter";
const description = "Template to get you up and running with Nuxt 3 & Vuetify 3";
const image = "https://vuetify3nuxt3starter.behonbaker.com/starter.png";
const url = "https://vuetify3nuxt3starter.behonbaker.com/";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss"],
  devtools: { enabled: false },
  // enable takeover mode
  typescript: { shim: true },
  build: { transpile: ["vuetify"] },
  modules: [
    "@kevinmarrec/nuxt-pwa",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify());
      });
    },
    "nuxt3-notifications",
    "@nuxtjs/svg-sprite",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `defineStore()`
          "defineStore",
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
    "dayjs-nuxt",
    "@unocss/nuxt",
    "@hypernym/nuxt-gsap",
    "@formkit/auto-animate/nuxt",
  ],
  runtimeConfig: {
    public: {
      api_url: process.env.API_ORGIN,
      file_url: process.env.File_ORGIN,
      editor_key: process.env.Editor_key,
    },
  },
  unocss: {
    presets: [presetUno()],
  },
  // imports: {
  //   presets: [
  //     {
  //       from: "useNotification",
  //       imports: ["notify"],
  //     },
  //   ],
  // },
  app: {
    head: {
      title: "小青社",
      titleTemplate: "%s | 社区管理系统",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
        //Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
      ],
    },
  },
  extends: ["@nuxtjs"],
  pwa: {
    meta: {
      name: shortTitle,
      author: "Behon Baker",
      theme_color: "#4f46e5",
      description: description,
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "#4f46e5",
      description: description,
    },
  },
  // nitro: {
  //   devProxy: {
  //     "/api": {
  //       target: "http://localhost:1337/api",
  //       changeOrigin: true,
  //       prependPath: true,
  //     },
  //   },
  //   // 该配置用于服务端请求转发
  //   routeRules: {
  //     "/api/**": {
  //       proxy: "http://localhost:1337/api",
  //     },
  //   },
  // },
});
