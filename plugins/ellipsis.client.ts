import ellipsis from "vue3-text-clamp";
export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.component("Ellipsis", ellipsis);
});
