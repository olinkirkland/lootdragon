import { defineStore } from 'pinia';

export type SourceBinding = {
  path: string;
  pageOffset: number;
};

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    darkTheme: true,
    language: 'en',
    largeNumberAbbreviation: true,
    sourceBindings: {} as { [key: string]: SourceBinding }
  }),
  actions: {
    setDarkTheme(darkTheme: boolean) {
      this.darkTheme = darkTheme;
    },
    setLanguage(language: string) {
      this.language = language;
    },
    setLargeNumberAbbreviation(largeNumberAbbreviation: boolean) {
      this.largeNumberAbbreviation = largeNumberAbbreviation;
    },
    setSourceBindings(sourceBindings: { [key: string]: SourceBinding }) {
      this.sourceBindings = sourceBindings;
    },
    loadFromLocalStorage() {
      const settings = localStorage.getItem('settings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        this.darkTheme = parsedSettings.darkTheme;
        this.language = parsedSettings.language;
        this.largeNumberAbbreviation = parsedSettings.largeNumberAbbreviation;
        this.sourceBindings = parsedSettings.sourceBindings || {};
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('settings', JSON.stringify(this.$state));
    }
  }
});
