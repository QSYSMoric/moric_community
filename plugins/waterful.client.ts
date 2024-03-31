import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.component("Waterfall", Waterfall);
  nuxtapp.vueApp.component("LazyImg", LazyImg);
});
