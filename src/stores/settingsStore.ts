// settingsStore.js
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    theme: 'light',
    language: 'en',
    tableMode: true,
    largeNumberAbbreviation: true
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setLanguage(language: string) {
      this.language = language;
    },
    setTableMode(tableMode: boolean) {
      this.tableMode = tableMode;
    },
    setLargeNumberAbbreviation(largeNumberAbbreviation: boolean) {
      this.largeNumberAbbreviation = largeNumberAbbreviation;
    }
  }
});
