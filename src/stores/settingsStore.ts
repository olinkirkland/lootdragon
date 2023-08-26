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
    tableMode: false,
    largeNumberAbbreviation: true,
    obviousRarity: false,
    sourceBindings: {} as { [key: string]: SourceBinding }
  }),
  actions: {
    setDarkTheme(darkTheme: boolean) {
      this.darkTheme = darkTheme;
    },
    setLanguage(language: string) {
      this.language = language;
    },
    setTableMode(tableMode: boolean) {
      this.tableMode = tableMode;
    },
    setLargeNumberAbbreviation(largeNumberAbbreviation: boolean) {
      this.largeNumberAbbreviation = largeNumberAbbreviation;
    },
    setObviousRarity(obviousRarity: boolean) {
      this.obviousRarity = obviousRarity;
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
        this.tableMode = parsedSettings.tableMode;
        this.largeNumberAbbreviation = parsedSettings.largeNumberAbbreviation;
        this.obviousRarity = parsedSettings.obviousRarity;
        this.sourceBindings = parsedSettings.sourceBindings || {};
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('settings', JSON.stringify(this.$state));
    }
  }
});
