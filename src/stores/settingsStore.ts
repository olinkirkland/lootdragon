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
    sourceBindings: {} as { [key: string]: SourceBinding },
    filterSortings: {
      rarity: 'numeric',
      sources: 'alpha',
      traits: 'groups',
      category: 'alpha'
    } as { [key: string]: string } // alpha, numeric, groups
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
    setFilterSortings(filterSortings: { [key: string]: 'alpha' | 'numeric' }) {
      this.filterSortings = filterSortings;
    },
    loadFromLocalStorage() {
      const settings = localStorage.getItem('settings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        this.theme = parsedSettings.theme || 'pathfinder';
        this.language = parsedSettings.language;
        this.largeNumberAbbreviation = parsedSettings.largeNumberAbbreviation;
        this.filterSortings = parsedSettings.filterSortings || {
          rarity: 'numeric',
          sources: 'alpha',
          traits: 'alpha',
          category: 'alpha'
        };
        this.sourceBindings = parsedSettings.sourceBindings || {};
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('settings', JSON.stringify(this.$state));
    }
  }
});
