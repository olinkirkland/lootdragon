import LoadingModal from '@/components/modals/loading-modal.vue';
import {
  PROD_BASE_URL,
  fetchAccessToken,
  fetchMe,
  login
} from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import Home from '@/pages/the-home-page.vue';
import ItemsPage from '@/pages/the-items-page.vue';
import Lost from '@/pages/the-lost-page.vue';
import { useItemsStore } from '@/stores/itemsStore';
import { useNavStore } from '@/stores/navStore';
import { useUserStore } from '@/stores/userStore';
import { createRouter, createWebHistory } from 'vue-router';
import CollectionPage from '../pages/the-collection-page.vue';
import CollectionsPage from '../pages/the-collections-page.vue';
import GamePage from '../pages/the-game-page.vue';
import GamesPage from '../pages/the-games-page.vue';
import TreasuresPage from '../pages/the-treasures-page.vue';

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
  {
    path: '/treasures',
    components: {
      app: TreasuresPage
    },
    name: 'treasures'
  },
  {
    path: '/collections',
    components: {
      app: CollectionsPage
    },
    name: 'collections'
  },
  {
    path: '/collection/:id',
    components: {
      app: CollectionPage
    },
    name: 'collection'
  },
  {
    path: '/games',
    components: {
      app: GamesPage
    },
    name: 'games'
  },
  {
    path: '/game/:id',
    components: {
      app: GamePage
    },
    name: 'game'
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

    if (await fetchAccessToken()) await fetchMe();
    ModalController.close();
  }

  next();
});

export default router;
