<template>
  <div class="modal" :class="{ busy: isBusy }">
    <header>
      <h2>Saved Searches</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section v-if="!!useUserStore().user">
        <p>Save the current filters and sort order.</p>
        <div class="flex">
          <input
            type="text"
            placeholder="Saved Search Name"
            v-model="savedSearchName"
          />
          <button @click="tryAddSavedSearch">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </div>
      </section>
      <section v-else>
        <div>
          <p>You must be logged in to save searches.</p>
          <p>
            <button class="text" @click="ModalController.open(LoginModal)">
              Login
            </button>
            or
            <button class="text" @click="ModalController.open(RegisterModal)">
              Register
            </button>
          </p>
        </div>
      </section>
      <section
        class="searches-container"
        v-if="
          !!useUserStore().user && useUserStore()?.user?.savedSearches?.length
        "
      >
        <ul class="searches" v-if="!!useUserStore().user">
          <li v-for="savedSearch in useUserStore()?.user?.savedSearches">
            <p>{{ savedSearch.name }}</p>
            <div class="flex">
              <button
                class="text"
                @click="tryApplyFromSavedSearchObject(savedSearch.filters)"
              >
                <span>Apply</span>
              </button>
              <button
                class="text"
                @click="tryRemoveSavedSearch(savedSearch.id)"
              >
                <span>Remove</span>
              </button>
            </div>
          </li>
        </ul>
        <!-- <pre>{{ useUserStore()?.user?.savedSearches }}</pre> -->
      </section>
      <section v-else>
        <p class="no-searches-found">
          <i class="fas fa-exclamation-circle"></i>
          <span>No saved searches</span>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addSavedSearch, removeSavedSearch } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import LoginModal from './login-modal.vue';
import RegisterModal from './register-modal.vue';

const savedSearchName = ref('');
const isBusy = ref(false);

const props = defineProps<{
  filters: any;
  applyFromSavedSearchObject: Function;
}>();

async function tryAddSavedSearch() {
  isBusy.value = true;
  await addSavedSearch(savedSearchName.value, 'file', props.filters);
  savedSearchName.value = '';
  isBusy.value = false;
}

async function tryRemoveSavedSearch(id: string) {
  isBusy.value = true;
  await removeSavedSearch(id);
  isBusy.value = false;
}

async function tryApplyFromSavedSearchObject(filters: any) {
  props.applyFromSavedSearchObject(filters);
  ModalController.close();
}
</script>

<style scoped lang="scss">
.no-searches-found {
  width: 100%;
  height: 100%;
  gap: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal > .modal__content {
  display: flex;
  flex-direction: column;
}

section.searches-container {
  flex: 1;
  overflow-y: auto;
}

ul.searches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 0.4rem;
  > li {
    padding: 1.2rem 1.6rem;
    background-color: var(--surface-color-2);
    border: 1px solid var(--surface-color-3);
    border-radius: 5px;

    > p {
    }
  }
}
</style>
