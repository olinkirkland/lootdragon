import LoadingModal from '@/components/modals/loading-modal.vue';
import {
  PROD_BASE_URL,
  fetchAccessToken,
  fetchMe,
  login
} from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import ItemsPage from '@/pages/the-items-page.vue';
import Lost from '@/pages/the-lost-page.vue';
import { useItemsStore } from '@/stores/itemsStore';
import { useNavStore } from '@/stores/navStore';
import { useUserStore } from '@/stores/userStore';
import { createRouter, createWebHistory } from 'vue-router';

export const BASE_URL =
  window.location.hostname === 'localhost' ? './lootdragon/' : './';

const routes = [
  // {
  //   path: '/',
  //   components: {
  //     app: Home
  //   },
  //   name: 'home'
  // },
  {
    path: '/lootdragon/',
    components: {
      app: ItemsPage
    },
    name: 'items'
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
    useNavStore().loadingText = 'Loading items';
    ModalController.open(LoadingModal);
    try {
      const response = await fetch(BASE_URL + 'assets/equipment.json');
      const data = await response.json();
      useItemsStore().items = data;
      useNavStore().loadingText = null;
      ModalController.close();
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  if (Object.keys(useItemsStore().traits).length === 0) {
    useNavStore().loadingText = 'Loading traits';
    ModalController.open(LoadingModal);
    try {
      const response = await fetch(BASE_URL + 'assets/traits.json');
      const data = await response.json();
      useItemsStore().traits = data;
      useNavStore().loadingText = null;
      ModalController.close();
    } catch (error) {
      console.error('Error loading traits:', error);
    }
  }

  if (useUserStore().user === null && !!localStorage.getItem('refreshToken')) {
    useNavStore().loadingText = 'Logging in';
    ModalController.open(LoadingModal);

    // Login with the saved credentials if in development mode
    if (
      localStorage.getItem('baseUrl') !== PROD_BASE_URL &&
      !!localStorage.getItem('login')
    ) {
      const { username, password } = JSON.parse(
        localStorage.getItem('login') as string
      ) as {
        username: string;
        password: string;
      };

      await login(username, password);
    }

    useNavStore().loadingText = 'Loading profile';
    if ((await fetchAccessToken()) && useUserStore().user === null)
      await fetchMe();
    useNavStore().loadingText = null;
    ModalController.close();
  }

  next();
});

export default router;
