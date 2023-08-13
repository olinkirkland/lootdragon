import mixpanel from 'mixpanel-browser';
import { createApp } from 'vue';
import App from './App.vue';
import Card from './components/card.vue';
import TestModal from './components/modals/test-modal.vue';
import router from './router';

// Create the app
const app = createApp(App);

// Register global components
app.component('Card', Card);

// Register modal components
app.component('TestModal', TestModal);

// Register plugins
app.use(router);

// Mount the app
app.mount('#app');

// Initialize Mixpanel
// if it's running from localhost, don't initialize mixpanel
if (window.location.hostname !== 'localhost') {
  console.warn('Mixpanel is enabled; this is not a drill!');
  mixpanel.init('c270f1816c518d251d2b2414daf17d84');
  mixpanel.track('Page load');
} else {
  console.warn('Accessing from localhost; Mixpanel is disabled.');
}
