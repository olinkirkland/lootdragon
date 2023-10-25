<template>
  <div class="modal">
    <header>
      <h2>{{ item.name.text }}</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <div class="overview">
          <price-display :value="item.price || 0" />
          <p>
            <span :class="'rarity rarity--' + item.rarity.toLowerCase()">{{
              item.rarity
            }}</span>
          </p>
          <p>Level {{ item.level }}</p>
          <p>
            <span v-if="item.bulk === 'N/A'">N/A</span>
            <span v-if="+item.bulk === 0">
              <i class="muted fas fa-feather-alt"></i>
              Negligible
            </span>
            <span v-else>
              <i class="muted fas fa-balance-scale"></i>
              {{ item.bulk }}
            </span>
          </p>
        </div>
      </section>

      <section>
        <div class="category-card-container">
          <div v-if="!!item.itemCategory" class="category-card">
            <p>Category</p>
            <p>{{ item.itemCategory }}</p>
          </div>

          <div v-if="!!item.itemSubcategory" class="category-card">
            <p>Subcategory</p>
            <p>{{ item.itemSubcategory }}</p>
          </div>
        </div>

        <p class="usage" v-if="!!item.usage">
          {{ item.usage }}
        </p>
      </section>

      <section>
        <p v-if="!!item.description">
          <read-more :text="item.description" :limit="64" />
        </p>
      </section>

      <section class="collection" v-if="!!user && false">
        <h4>Add to collection</h4>
        <div class="flex">
          <drop-down v-model="selectedCollection" class="flex-1">
            <button v-for="collection in user?.collections" :key="collection">
              <span>{{ collection }}</span>
            </button>
          </drop-down>
          <button>
            <i class="fas fa-plus"></i>
            <span>Add</span>
          </button>
        </div>
      </section>

      <section>
        <div class="detail-group detail-group--traits">
          <h4>Traits</h4>
          <ul>
            <li v-for="trait in item.traits">
              <p>
                <span class="trait-badge">
                  {{ trait.text }}
                </span>
                <read-more
                  :text="useItemsStore().traits[trait.slug]?.description || ''"
                />
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div class="detail-group">
          <h4>Sources</h4>
          <ul class="text">
            <li
              v-for="source in item.source"
              :key="source.text"
              :class="{
                'source-binding':
                  !!useSettingsStore().sourceBindings[source.text]
              }"
            >
              <a :href="getSourceUrl(source)" target="_blank">{{
                source.text
              }}</a>
              <span> (Page {{ source.page }})</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div class="spread">
          <button @click="reportItem" :disabled="isItemReported" v-if="!!user">
            <span>Report</span>
          </button>

          <div class="flex">
            <button @click="copyJSON">
              <i class="fas fa-copy"></i>
              <span>Copy JSON</span>
            </button>
            <button
              v-if="!!user"
              @click="favoriteItemAndWait"
              :disabled="isBusyFavoriting"
            >
              <i
                :class="
                  (isItemFavorited ? 'favorite fas' : 'far') + ' fa-heart'
                "
              ></i>
            </button>
          </div>
        </div>
      </section>
      <section>
        <a :href="nethysLink" target="_blank"
          >{{ item.name.text }} on Archives of Nethys</a
        >
        <a :href="directLink" target="_blank">Direct link</a>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { favoriteItem } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useItemsStore } from '@/stores/itemsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useUserStore } from '@/stores/userStore';
import { Item, Source } from '@/types';
import mixpanel from 'mixpanel-browser';
import { PropType, computed, onMounted, ref } from 'vue';
import PriceDisplay from '../price-display.vue';
import ReadMore from '../read-more.vue';
import ReportModal from './report-modal.vue';

const settingsStore = useSettingsStore();
const selectedCollection = ref(null as string | null);

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  }
});

onMounted(() => {
  // if (!!useUserStore().user)
  //   selectedCollection.value = useUserStore().user?.collections[0];
});

const user = computed(() => {
  return useUserStore().user || null;
});

const item = props.item;
console.log(item.traits);
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

const isBusyFavoriting = ref(false);

async function favoriteItemAndWait() {
  isBusyFavoriting.value = true;
  await favoriteItem(item.id);
  isBusyFavoriting.value = false;
}

const isItemFavorited = computed(() => {
  return useUserStore().isFavorite(item.id);
});

function getSourceUrl(source: Source) {
  const binding = settingsStore.sourceBindings[source.text];
  if (binding)
    return binding.path + '#page=' + (source.page! + binding.pageOffset);
  return 'https://2e.aonprd.com' + source.url;
}
</script>

<style scoped lang="scss">
@mixin alternating-shade() {
  &:nth-child(odd)::after {
    content: '';
    width: 100%;
    position: absolute;
    background-color: var(--shadow);
    opacity: 0.1;
    height: 100%;
    pointer-events: none;
  }
}
.modal {
  width: 80%;
  max-width: 64rem;
  max-height: 80%;

  section {
    h4 {
      text-align: center;
      font-size: 1.2rem;
      letter-spacing: 1px;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      color: var(--text-color-3);
    }

    .detail-group {
      &:not(:last-child) {
        margin-bottom: 0.8rem;
      }

      &--traits {
        > ul {
          background-color: var(--surface-color);
          display: flex;
          flex-direction: column;
          gap: 2rem;

          p {
            display: block;
            .trait-badge {
              background-color: var(--text-color-3);
              margin-right: 0.6rem;
              padding: 0.2rem 0.4rem;

              text-transform: capitalize;
              color: var(--surface-color);
            }
          }
        }
      }
    }

    p.usage {
      font-style: italic;
      margin: 0 auto;
    }

    .overview {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2.4rem;
    }

    p {
      display: flex;
      width: fit-content;
      > i {
        align-self: center;
        margin-right: 0.6rem;
      }

      > strong {
        margin-right: 0.4rem;
      }
    }
    ul.text {
      display: inline-flex;
      flex-wrap: wrap;
      text-transform: capitalize;

      li:not(:last-child)::after {
        content: ', ';
        margin-right: 0.2rem;
      }
    }
  }

  span.rarity {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    text-transform: capitalize;
    color: var(--light-color);

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

.favorite {
  color: var(--red);
}

.source-binding {
  > * {
    color: var(--primary-color);
  }

  i {
    font-size: 1.6rem;
    margin-right: 0.4rem;
  }
}

.category-card-container {
  display: flex;
  gap: 0.4rem;
  margin: 0 auto;
  > .category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border: 1px solid var(--surface-color-2);

    > p:first-child {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 1.2rem;
      // color: var(--surface-color);
      background-color: transparent;
    }

    > p {
      width: 100%;
      display: block;
      text-align: center;
      padding: 0.4rem 1.2rem;
      background-color: var(--surface-color-2);
      color: var(--text-color-3);
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

  .overview {
    row-gap: 1.2rem !important;
  }
}
</style>
