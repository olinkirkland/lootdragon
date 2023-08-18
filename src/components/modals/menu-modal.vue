<template>
  <div class="modal">
    <header>
      <h2>Menu</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
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
        <p><strong>Credits</strong></p>
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
          This app was made for my friends and players. If it helps you in your
          journey from Otari to Absalom and beyond, that's just the cherry on
          top.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import SettingsModal from './settings-modal.vue';
</script>

<style scoped lang="scss">
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
    background-color: var(--dark-translucent);
  }
}
</style>
