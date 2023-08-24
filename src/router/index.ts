import LoadingModal from '@/components/modals/loading-modal.vue';
import { fetchAccessToken, fetchMe } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import Home from '@/pages/the-home-page.vue';
import ItemsPage from '@/pages/the-items-page.vue';
import Lost from '@/pages/the-lost-page.vue';
import { useItemsStore } from '@/stores/itemsStore';
import { useUserStore } from '@/stores/userStore';
import { createRouter, createWebHistory } from 'vue-router';
import ShopsPage from '../pages/the-shops-page.vue';
import { useNavStore } from '@/stores/navStore';

const routes = [
  {
    path: '/',
    components: {
      app: Home
    },
    name: 'home'
  },
  {
    path: '/items',
    components: {
      app: ItemsPage
    },
    name: 'items'
  },
  { path: '/library', redirect: '/item-browser' },
  { path: '/item-browser', redirect: '/items' },
  {
    path: '/shops',
    components: {
      app: ShopsPage
    },
    name: 'shops'
  },

  {
    path: '/:pathMatch(.*)*',
    components: {
      app: Lost
    },
    name: 'lost'
  }
];

const router = createRouter({
  history: createWebHistory(),
  //@ts-ignore
  routes
});

router.beforeEach(async (to, from, next) => {
  // Ensure that the modal is closed
  ModalController.close();

  useNavStore().nav = to.name as string;

  console.log('Page routed from', from.name, '➡️', to.name);
  if (useItemsStore().items.length === 0) {
    console.log('Loading items JSON ...');

    ModalController.open(LoadingModal);
    try {
      const response = await fetch('/assets/items.json');
      const data = await response.json();
      useItemsStore().items = data;
      ModalController.close();
      console.log('Items loaded successfully');
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  if (useUserStore().user === null && !!localStorage.getItem('refreshToken')) {
    ModalController.open(LoadingModal);
    if (await fetchAccessToken()) await fetchMe();
    ModalController.close();
  }

  next();
});

export default router;
