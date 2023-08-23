import LoadingModal from '@/components/modals/loading-modal.vue';
import { fetchMe } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import Home from '@/pages/the-home-page.vue';
import ItemsPage from '@/pages/the-items-page.vue';
import Lost from '@/pages/the-lost-page.vue';
import { useItemsStore } from '@/stores/itemsStore';
import { useUserStore } from '@/stores/userStore';
import { createRouter, createWebHistory } from 'vue-router';
import ShopsPage from '../pages/the-shops-page.vue';

console.log('Router');

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

  console.log('Page routed from', from.name, '➡️', to.name);
  if (useItemsStore().items.length === 0) {
    console.log('Loading items JSON ...');
    // Load the items
    ModalController.open(LoadingModal);
    await fetch('/assets/items.json')
      .then((response) => response.json())
      .then((data) => {
        useItemsStore().items = data;
        ModalController.close();
      });
    console.log('Items loaded');
  }

  console.log('Page loaded');
  if (useUserStore().user === null) {
    ModalController.open(LoadingModal);
    await fetchMe();
    ModalController.close();
  }

  next();
});

//   // If the user is coming from another route, we don't need to check
//   if (from.name !== undefined) return next();

//   // Coming from undefined (new tab, refresh, etc.)
//   // If there's a refresh token in local storage, copy it to session storage
//   if (useConfig().rememberMe)
//     setRefreshToken(localStorage.getItem('refreshToken')!);

//   ModalDispatcher.open({
//     type: ModalType.LOADING
//   });

//   const refreshToken = useAuthStore().refreshToken;
//   if (!refreshToken) {
//     ModalDispatcher.close(ModalType.LOADING);
//     return to.name === 'login' ? next() : next('/login');
//   }

//   if (to.name === 'login') {
//     ModalDispatcher.close(ModalType.LOADING);
//     return next('/dashboard');
//   }

//   if (!(await fetchAccessToken())) {
//     ModalDispatcher.close(ModalType.LOADING);
//     return next('/login');
//   }

//   if (!(await fetchAll())) {
//     ModalDispatcher.close(ModalType.LOADING);
//     return next('/login');
//   }

//   ModalDispatcher.close(ModalType.LOADING);
//   return next();
// });

export default router;
