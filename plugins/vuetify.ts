import { createVuetify, type ThemeDefinition } from "vuetify";
import zhHans from "@/assets/locale/zh-Hans";
import colors from "vuetify/util/colors";
import "@mdi/font/css/materialdesignicons.css";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#6200EE",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    defaults,
    theme: {
      defaultTheme: LIGHT_THEME,
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.teal.darken3, // #E53935
            secondary: colors.teal.darken2, // #FFCDD2
            info: "#2196F3",
            subContent: "#f6f7f8",
            subContentInfo: twColors.white,
          },
        },
        dark,
      },
    },
    icons: {
      defaultSet: "mdi",
    },
    locale: {
      locale: "zhHans",
      fallback: "zhHans",
      messages: { zhHans },
    },
  });

  app.vueApp.use(vuetify as any);
});
