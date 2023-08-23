<template>
  <div class="modal">
    <header>
      <h2>Menu</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section v-if="!!user">
        <p><strong>Account</strong></p>
        <p>
          Welcome, <strong class="my-name">{{ user?.username }}</strong
          >!
        </p>

        <div class="flex">
          <button>
            <i class="fas fa-user"></i>
            <span>Account</span>
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
        <p><strong>Attributions</strong></p>
        <ul>
          <li>
            <p>
              The background image "Brown Rock Formation" is a photograph by
              <a href="https://unsplash.com/@bradleycdunn">Bradley Dunn</a> and
              sourced from
              <a href="https://unsplash.com/photos/rtOD6PdRAlU">Unsplash.com</a>
            </p>
          </li>
          <li>
            <p>
              The logo was created using an artist-agnostic prompt using
              <a href="https://www.midjourney.com/home/">Midjourney</a>, an AI
              art generator
            </p>
          </li>
          <li>
            <p>
              Icons are provided by
              <a href="https://fontawesome.com/license/free">FontAwesome.com</a>
            </p>
          </li>
          <li>
            <p>
              The coin icons were created using vector graphics from
              <a href="https://icons8.com/">Icons8.com</a>
            </p>
          </li>
        </ul>
      </section>
      <section>
        <p><strong>Message from the Developer</strong></p>
        <p>
          Hi! I'm the developer of this site, Olin. You can find me online at
          <a href="https://olinkirk.land">olinkirk.land</a>
        </p>
        <p>
          My thanks go out to the folks at
          <a href="https://paizo.com/">Paizo</a> and
          <a href="https://2e.aonprd.com/">Archives of Nethys</a> who create and
          maintain the huge troves of content I scrape and parse.
        </p>
        <p>
          Development is a work in progress, and I'm always looking for ways to
          improve it: Your feedback is super appreciated! You can reach me at
          <a href="mailto:me@olinkirk.land">me@olinkirk.land</a>
        </p>
        <p>
          I hope this tool helps you on your journey from Otari to Absalom and
          beyond, whether you're a player or a GM.
        </p>
      </section>
      <section>
        <p><strong>License</strong></p>
        <p>
          I do not claim ownership of any data gathered from third-party
          sources. All data from Archives of Nethys is used under the
          <a href="https://2e.aonprd.com/Licenses.aspx">Open Game License</a>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { User } from '@/types';
import { ref } from 'vue';
import LicenseModal from './license-modal.vue';
import SettingsModal from './settings-modal.vue';
import LoginModal from './login-modal.vue';
import RegisterModal from './register-modal.vue';
import { logout } from '@/controllers/connection';
import ConfirmModal from './confirm-modal.vue';

const user = ref<null | User>(useUserStore().user);

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
.my-name {
  color: var(--primary-color);
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
    background-color: var(--surface-color);
  }
}
</style>
