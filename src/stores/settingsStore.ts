import { defineStore } from 'pinia';

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    theme: 'light',
    language: 'en',
    tableMode: true,
    largeNumberAbbreviation: true,
    saveFilterChoices: true
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
    },
    setSaveFilterChoices(saveFilterChoices: boolean) {
      this.saveFilterChoices = saveFilterChoices;
    },
    loadFromLocalStorage() {
      const settings = localStorage.getItem('settings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        this.theme = parsedSettings.theme;
        this.language = parsedSettings.language;
        this.tableMode = parsedSettings.tableMode;
        this.largeNumberAbbreviation = parsedSettings.largeNumberAbbreviation;
        this.saveFilterChoices = parsedSettings.saveFilterChoices;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('settings', JSON.stringify(this.$state));
    }
  }
});
