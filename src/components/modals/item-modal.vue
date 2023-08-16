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
        <a :href="'https://2e.aonprd.com' + item.name.url" target="_blank">
          <i class="fas fa-external-link-alt"></i>
          <span>{{ 'https://2e.aonprd.com' + item.name.url }}</span>
        </a>
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
        <div class="flex">
          <button class="text" @click="copyJSON">
            <i class="fas fa-copy"></i>
            <span>Copy JSON</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { Item } from '@/types';
import { PropType } from 'vue';
import PriceDisplay from '../price-display.vue';

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  }
});

const item = props.item;

function copyJSON() {
  navigator.clipboard.writeText(JSON.stringify(item, null, 2));
}
</script>

<style scoped lang="scss">
.modal {
  width: 80%;
  max-width: 64rem;
  max-height: 80%;

  .modal__content {
    overflow-y: auto;
    flex: 1;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;

    .detail-group:not(:last-child) {
      margin-bottom: 0.8rem;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #222;
    }

    &.actions {
      flex-direction: row;
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
    color: white;

    &--common {
      background-color: var(--common-color);
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

    section.actions {
      flex-direction: column;
    }
  }
}
</style>
