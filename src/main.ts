import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Create the app
const app = createApp(App);

// Register global components
// app.component('');

// Register plugins
app.use(router);

// Mount the app
app.mount('#app');
