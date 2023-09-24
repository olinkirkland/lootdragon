<template>
  <div class="modal">
    <header>
      <h2>Collection Settings</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          <span>Configure the settings for </span
          ><span class="primary">
            {{ collection.name }}
          </span>
          <span>.</span>
        </p>
      </section>
      <section>
        <p class="muted">Choose a new name.</p>
        <button @click="tryRenameCollection()">
          <i class="fas fa-edit"></i>
          <span>Change Name</span>
        </button>
        <p>
          <span class="muted">This is a </span>
          <span class="primary">{{
            collection?.isPublic ? 'public' : 'private'
          }}</span>
          <span class="muted"> collection. </span>
          <span class="primary">{{
            collection?.isPublic ? 'Anyone' : 'Only you'
          }}</span>
          <span class="muted"> can view it.</span>
        </p>
        <button @click="changeIsPublic">
          <span>{{
            collection.isPublic ? 'Make Private' : 'Make Public'
          }}</span>
        </button>

        <p class="muted">
          <span>Delete this collection. This action is irreversible.</span>
        </p>
        <button @click="tryDeleteCollection()">
          <i class="fas fa-trash"></i>
          <span>Delete</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import server, { deleteCollection } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import router from '@/router';
import { Collection } from '@/types';
import ConfirmModal from './confirm-modal.vue';
import InputModal from './input-modal.vue';

const props = defineProps<{
  collection: Collection;
}>();

function changeIsPublic() {
  server
    .put('/collection/' + props.collection.collectionId + '/public', {
      isPublic: !props.collection.isPublic
    })
    .then((response) => {
      props.collection.isPublic = response.data.isPublic;
    });
}

async function tryRenameCollection() {
  ModalController.open(InputModal, {
    text: 'Enter a new name for the collection:',
    placeholder: props.collection.name,
    confirmCallback: (newName: string) => {
      server
        .put('/collection/' + props.collection.collectionId + '/name', {
          name: newName
        })
        .then((response) => {
          props.collection.name = response.data.name;
        });
      ModalController.close();
    }
  });
}

async function tryDeleteCollection() {
  ModalController.open(ConfirmModal, {
    title: 'Delete Collection',
    message: 'Are you sure you want to delete this collection?',
    confirmText: 'Yes, delete it',
    confirmCallback: async () => {
      ModalController.close();
      await deleteCollection(props.collection.collectionId!);
      router.push({ name: 'collections' });
    }
  });
}
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
