import { useDisplay, useTheme } from "vuetify";

export const useMedia = () => {
  return useDisplay();
};

export const useThemeDisplay = () => {
  return useTheme();
};
