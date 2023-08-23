<template>
  <div class="modal">
    <header>
      <h2>{{ item.name.text }}</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section class="actions">
        <copy-text label="Direct Link" :text="directLink" :link="true" />
        <copy-text label="Archives of Nethys" :text="nethysLink" :link="true" />
      </section>
      <section>
        <div class="spread">
          <p>
            <strong>Name:</strong>
            <span>{{ item.name.text }}</span>
          </p>
          <price-display v-if="!!item.price" :value="item.price" />
        </div>
        <div class="spread">
          <p><strong>Level:</strong>{{ item.level }}</p>
          <p>
            <span :class="'rarity rarity--' + item.rarity.toLowerCase()">{{
              item.rarity
            }}</span>
          </p>
        </div>
        <p v-if="!!item.description">{{ item.description }}</p>
      </section>
      <section>
        <div class="detail-group">
          <p><strong>Sources:</strong></p>
          <ul class="text">
            <li v-for="source in item.source" :key="source.text">
              <a :href="'https://2e.aonprd.com' + source.url" target="_blank">{{
                source.text
              }}</a>
              <span> (Page {{ source.page }})</span>
            </li>
          </ul>
        </div>

        <div class="detail-group">
          <p><strong>Traits:</strong></p>
          <ul class="text">
            <li v-for="trait in item.trait">
              <a :href="'https://2e.aonprd.com' + trait.url" target="_blank">{{
                trait.text
              }}</a>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <p v-if="!!item.itemCategory">
          <strong>Category:</strong>{{ item.itemCategory }}
        </p>
        <p v-if="!!item.itemSubcategory">
          <strong>Subcategory:</strong>{{ item.itemSubcategory }}
        </p>
        <p>
          <strong>Bulk:</strong>
          <span>{{
            item.bulk.toString() === '0' ? 'Negligible' : item.bulk
          }}</span>
        </p>
      </section>
      <section>
        <div class="spread">
          <button @click="reportItem" :disabled="isItemReported" v-if="!!user">
            <i class="fas fa-bug"></i>
            <span>Report</span>
          </button>
          <button @click="copyJSON">
            <i class="fas fa-copy"></i>
            <span>Copy JSON</span>
          </button>
          <!-- <button v-if="!!user" @click="favoriteItem">
            <i :class="isItemFavorited ? 'fas' : 'far' + ' fa-heart'"></i>
            <span>Favorite</span>
          </button> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { Item } from '@/types';
import mixpanel from 'mixpanel-browser';
import { PropType, computed, ref } from 'vue';
import CopyText from '../copy-text.vue';
import PriceDisplay from '../price-display.vue';
import ReportModal from './report-modal.vue';
import { useUserStore } from '@/stores/userStore';

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  }
});

const user = computed(() => {
  return useUserStore().user || null;
});

const item = props.item;
const directLink = computed(() => {
  return window.location.origin + '/items?i=' + item.id;
});

const nethysLink = computed(() => {
  return 'https://2e.aonprd.com' + item.name.url;
});

function copyJSON() {
  navigator.clipboard.writeText(JSON.stringify(item, null, 2));
}

const reportedItems = ref<string[]>(
  JSON.parse(localStorage.getItem('reportedItems') || '[]') as string[]
);

const isItemReported = computed(() => reportedItems.value.includes(item.id));

function reportItem() {
  // Report the item to Mixpanel
  mixpanel.track('Item Reported', {
    item: item.name.text,
    id: item.id,
    username: user.value?.username
  });

  reportedItems.value.push(item.id);
  localStorage.setItem('reportedItems', JSON.stringify(reportedItems.value));

  ModalController.open(ReportModal, { item });
}

// const isItemFavorited = false;

// function favoriteItem() {}
</script>

<style scoped lang="scss">
.modal {
  width: 80%;
  max-width: 64rem;
  max-height: 80%;

  section {
    .detail-group:not(:last-child) {
      margin-bottom: 0.8rem;
    }

    p {
      display: flex;
      width: fit-content;
      > i {
        align-self: center;
        margin-right: 0.4rem;
      }

      > strong {
        margin-right: 0.4rem;
      }
    }
    ul.text {
      display: inline-flex;
      flex-wrap: wrap;

      li:not(:last-child)::after {
        content: ', ';
        margin-right: 0.2rem;
      }
    }
  }

  span.rarity {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 5px;
    text-transform: capitalize;
    color: var(--surface-color);

    &--common {
      background-color: var(--common-color);
      color: var(--dark);
    }

    &--uncommon {
      background-color: var(--uncommon-color);
    }

    &--rare {
      background-color: var(--rare-color);
    }

    &--unique {
      background-color: var(--unique-color);
    }
  }
}

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
