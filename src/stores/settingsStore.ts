import { defineStore } from 'pinia';

export type SourceBinding = {
  path: string;
  pageOffset: number;
};

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    theme: 'pathfinder',
    language: 'en',
    largeNumberAbbreviation: true,
    sourceBindings: {} as { [key: string]: SourceBinding }
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
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
        this.theme = parsedSettings.theme || 'pathfinder';
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
