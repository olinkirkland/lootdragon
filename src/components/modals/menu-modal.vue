<template>
  <div class="modal">
    <header>
      <!-- <h2>Menu</h2> -->
      <div class="button-bar">
        <button @click="router.push('/')">
          <i class="fas fa-home"></i>
        </button>
        <button @click="router.push('/items')">
          <i class="fas fa-box-open"></i>
        </button>
        <!-- <button @click="router.push('/collections')">
          <i class="fas fa-boxes"></i>
        </button> -->
      </div>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section class="account" v-if="!!user">
        <h3>Account</h3>
        <p>
          Welcome,
          <span class="primary"> {{ capitalize(user?.username) }} </span>!
        </p>

        <div class="flex">
          <button @click="ModalController.open(AccountModal)">
            <i class="fas fa-user-circle"></i>
            <span>My Account</span>
          </button>
          <button @click="logoutUser">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </section>
      <section v-else>
        <h3>Account</h3>
        <p>You are not logged in.</p>
        <div class="flex">
          <button @click="ModalController.open(RegisterModal)">
            <span>Sign up</span>
          </button>
          <button @click="ModalController.open(LoginModal)">
            <i class="fas fa-sign-in-alt"></i>
            <span>Log in</span>
          </button>
        </div>
      </section>
      <section>
        <h3>Change Settings</h3>
        <p>Customize the appearance or behavior of the app.</p>
        <button @click="ModalController.open(SettingsModal)">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </button>
      </section>
      <section>
        <h3>Attributions</h3>
        <ul>
          <li>
            <p>
              Logo and icons are provided by
              <a href="https://fontawesome.com/license/free" target="_blank"
                >FontAwesome.com</a
              >
            </p>
          </li>
          <li>
            <p>
              The
              <a
                href="https://icons8.com/icon/xjR5QLocktta/european-dragon"
                target="_blank"
                >logo</a
              >
              and coin icons use vector graphics from
              <a href="https://icons8.com/" target="_blank">Icons8.com</a>
            </p>
          </li>
          <li>
            <p>
              The logo's font is
              <a href="https://fonts.google.com/specimen/Croissant+One"
                >Croissant One</a
              >
              by Eduardo Tunni, provided by Google Fonts.
            </p>
          </li>
          <li>
            <p>
              <a href="https://www.midjourney.com/">Midjourney</a> is used for
              various pieces of art like the navigation buttons on the home
              page.
            </p>
          </li>
        </ul>
      </section>
      <section>
        <h3>License</h3>
        <p>
          I do not claim ownership of any data gathered from third-party
          sources. All data from Archives of Nethys is used under the
          <a href="https://2e.aonprd.com/Licenses.aspx" target="_blank"
            >Open Game License</a
          >
          and in accordance with their respective terms of use.
        </p>
        <p>
          Because a copy of the Open Game License must accompany derivative
          works, I have included it below.
        </p>
        <button @click="ModalController.open(LicenseModal)">
          <i class="fas fa-file-alt"></i>
          <span>Read the Open Game License</span>
        </button>
      </section>
      <section>
        <p class="version">Loot Dragon · Version {{ version }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logout } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import AccountModal from './account-modal.vue';
import ConfirmModal from './confirm-modal.vue';
import LicenseModal from './license-modal.vue';
import LoginModal from './login-modal.vue';
import RegisterModal from './register-modal.vue';
import SettingsModal from './settings-modal.vue';
import versionJson from '@/data/version.json';
import { capitalize } from '@/utils';
import router from '@/router';

const user = useUserStore().user;
const version = versionJson.version;

function logoutUser() {
  ModalController.open(ConfirmModal, {
    title: 'Logout',
    text: 'Are you sure you want to log out?',
    confirmText: 'Logout',
    confirmCallback: () => {
      logout();
      ModalController.close();
    }
  });
}
</script>

<style scoped lang="scss">
.version {
  text-align: center;
  color: var(--text-color-3);
}
section.account {
  position: relative;
  z-index: 0;
  &::before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    z-index: -1;
    background-color: var(--primary-color);
    pointer-events: none;
  }
}

p {
  line-height: 2rem;
  a {
    color: var(--primary-color);
  }
}

ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  > li {
    display: flex;
    padding: 0.8rem;
    background-color: var(--surface-color-2);
  }
}
</style>
