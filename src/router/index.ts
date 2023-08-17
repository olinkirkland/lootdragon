import LoadingModal from '@/components/modals/loading-modal.vue';
import { ModalController } from '@/controllers/modal-controller';
import Home from '@/pages/the-home-page.vue';
import Library from '@/pages/the-library-page.vue';
import Login from '@/pages/the-login-page.vue';
import Lost from '@/pages/the-lost-page.vue';
import Register from '@/pages/the-register-page.vue';
import { useItemsStore } from '@/stores/itemsStore';
import { createRouter, createWebHistory } from 'vue-router';

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
    path: '/login',
    components: {
      app: Login
    },
    name: 'login'
  },
  {
    path: '/register',
    components: {
      app: Register
    },
    name: 'register'
  },
  // {
  //   path: '/games',
  //   components: {
  //     app: Games,
  //   },
  //   name: 'games'
  // },
  // {
  //   path: '/games/:id',
  //   components: {
  //     app: Game,
  //   },
  //   name: 'game'
  // },
  {
    path: '/items',
    components: {
      app: Library
    },
    name: 'items'
  },
  { path: '/library', redirect: '/item-browser' },
  { path: '/item-browser', redirect: '/items' },
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

  console.log('from', from.name, 'to', to.name);
  if (useItemsStore().items.length === 0) {
    // Load the items
    ModalController.open(LoadingModal);
    await fetch('/assets/items.json')
      .then((response) => response.json())
      .then((data) => {
        useItemsStore().items = data;
        ModalController.close();
      });
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
