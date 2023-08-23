import mixpanel from 'mixpanel-browser';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import Card from './components/card.vue';
import TestModal from './components/modals/test-modal.vue';
import router from './router';
import { useItemsStore } from './stores/itemsStore';
import { useSettingsStore } from './stores/settingsStore';
import { fetchMe } from './controllers/connection';

// Create the app
const app = createApp(App);

// Register global components
app.component('Card', Card);

// Register modal components
app.component('TestModal', TestModal);

// Setup stores
app.use(createPinia());

const settingsStore = useSettingsStore();
settingsStore.loadFromLocalStorage();
settingsStore.$subscribe(() => {
  settingsStore.saveToLocalStorage();
});

useItemsStore();

console.log('Pinia initialized');

// Setup router
app.use(router);

// Mount the app
app.mount('#app');

// Initialize Mixpanel
// if it's running from localhost, don't track the page load
mixpanel.init('c270f1816c518d251d2b2414daf17d84');
if (window.location.hostname !== 'localhost') {
  console.warn('Mixpanel tracked the page load!');
  mixpanel.track('Page load');
} else {
  console.warn('Accessing from localhost; Mixpanel is disabled.');
}

// Try to log in with the refresh token

await fetchMe();
