import Editor from "@tinymce/tinymce-vue";

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.component("Editor", Editor);
});
