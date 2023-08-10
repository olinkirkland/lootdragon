import Card from './components/card.vue';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mixpanel from 'mixpanel-browser';

// Create the app
const app = createApp(App);

// Register global components
app.component('Card', Card);

// Register plugins
app.use(router);

// Mount the app
app.mount('#app');

// Initialize Mixpanel
mixpanel.init('c270f1816c518d251d2b2414daf17d84');
mixpanel.track('initial-load');