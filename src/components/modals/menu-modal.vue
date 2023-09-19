<template>
  <div class="modal">
    <header>
      <h2>Menu</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section class="account" v-if="!!user">
        <p><strong>Account</strong></p>
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
        <p><strong>Account</strong></p>
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
        <p><strong>Change Settings</strong></p>
        <p>Customize the appearance or behavior of the app.</p>
        <button @click="ModalController.open(SettingsModal)">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </button>
      </section>
      <section>
        <p><strong>Message from the Developer</strong></p>
        <p>
          Hi! I'm the developer of this site, Olin. You can find me online at
          <a href="https://olinkirk.land" target="_blank">olinkirk.land</a>
        </p>
        <p>
          My thanks go out to the folks at
          <a href="https://paizo.com/" target="_blank">Paizo</a> and
          <a href="https://2e.aonprd.com/" target="_blank"
            >Archives of Nethys</a
          >
          who create and maintain the troves of content that I scrape and parse.
        </p>
        <p>
          Development is a work in progress, and I'm always looking for ways to
          improve it: Your feedback is super appreciated! You can reach me at
          <a href="mailto:me@olinkirk.land" target="_blank">me@olinkirk.land</a>
        </p>
        <p>
          I hope this tool helps you on your journey from Otari to Absalom and
          beyond, whether you're a player or a GM.
        </p>
      </section>
      <section>
        <p><strong>Attributions</strong></p>
        <ul>
          <li>
            <p>
              The background image "Brown Rock Formation" is a photograph by
              <a href="https://unsplash.com/@bradleycdunn" target="_blank"
                >Bradley Dunn</a
              >
              and sourced from
              <a href="https://unsplash.com/photos/rtOD6PdRAlU" target="_blank"
                >Unsplash.com</a
              >
            </p>
          </li>
          <li>
            <p>
              The logo was created using an artist-agnostic prompt using
              <a href="https://www.midjourney.com/home/" target="_blank"
                >Midjourney</a
              >, an AI art generator. If you want to make an original logo for
              the site, this attribution space could be yours!
            </p>
          </li>
          <li>
            <p>
              Icons are provided by
              <a href="https://fontawesome.com/license/free" target="_blank"
                >FontAwesome.com</a
              >
            </p>
          </li>
          <li>
            <p>
              The coin icons were created using vector graphics from
              <a href="https://icons8.com/" target="_blank">Icons8.com</a>
            </p>
          </li>
          <li>
            <p>
              The Aloevera font was created by Salamahtype and is available for
              purchase from
              <a href="https://salamahtype.com/product/aloevera/">
                Salamahtype.com
              </a>
            </p>
          </li>
        </ul>
      </section>
      <section>
        <p><strong>License</strong></p>
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
        <p class="version">Loot Dragon 🐉 Version {{ version }}</p>
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
  font-size: 1.4rem;
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
