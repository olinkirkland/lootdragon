<template>
  <div class="modal">
    <header>
      <h2>Source Bindings</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Source bindings allow you to replace links to sources with a link to a
          PDF you have stored on your computer. Clicking the source will then
          open the PDF to the correct page.
        </p>
        <p>
          <strong>
            Source bindings require local file access, which browsers prevent by
            default.
          </strong>
          <span>
            For security reasons, browsers don't allow links to local files to
            be opened. To use the source bindings feature on this site, you must
            enable the
            <a
              href="https://chrome.google.com/webstore/detail/enable-local-file-links/nikfmfgobenbhmocjaaboihbeocackld/related"
              target="_blank"
            >
              Enable Local File Links</a
            >
            Chrome extension, or the equivalent extension or setting for your
            browser.</span
          >
        </p>
      </section>
      <section class="search">
        <div class="search-box">
          <input
            type="text"
            v-model="search"
            placeholder="Search for a source..."
          />
          <i class="fas fa-search"></i>
          <button @click="search = ''" v-if="search.length > 0" class="icon">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
        <p class="muted spread">
          Showing {{ filteredSources.length }} / {{ sources.length }} sources
          ({{ Object.keys(settingsStore.sourceBindings).length }} bound)
        </p>
      </section>
      <section class="results">
        <ul>
          <li v-for="source in filteredSources" :key="source.name">
            <div class="source-info">
              <p>
                <strong>{{ source.name }}</strong>
                <span class="muted"> ({{ source.count }} items)</span>
              </p>
            </div>
            <form
              :id="source.name + '-edit-box'"
              class="edit-box"
              @submit.prevent="updateSourceBinding(source.name)"
            >
              <div class="form-group">
                <label :for="source.name + '-edit-pdf'">Path</label>
                <input
                  :id="source.name + '-edit-pdf'"
                  type="text"
                  placeholder="C:/Path/To/Source/PDF.pdf"
                  v-model="localSourceBindings[source.name].path"
                />
              </div>

              <div class="form-group">
                <label :for="source.name + '-edit-page'">Page Offset </label>
                <input
                  :id="source.name + '-edit-page'"
                  type="number"
                  placeholder="1"
                  v-model="localSourceBindings[source.name].pageOffset"
                />
              </div>
            </form>
            <div class="fill flex flex--right">
              <button
                :disabled="!settingsStore.sourceBindings[source.name]"
                @click="deleteLocalSourceBinding(source.name)"
              >
                <i class="fas fa-times"></i>
                <span>Clear</span>
              </button>
              <button
                type="submit"
                :form="source.name + '-edit-box'"
                :disabled="
                  !isEdited(source.name) ||
                  !localSourceBindings[source.name].path
                "
              >
                <i class="fas fa-save"></i>
                <span>Save</span>
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { getSourcesFilters } from '@/filter-utils';
import { useItemsStore } from '@/stores/itemsStore';
import { SourceBinding, useSettingsStore } from '@/stores/settingsStore';
import { computed, ref } from 'vue';

const settingsStore = useSettingsStore();
const items = ref(useItemsStore().items);
const sources = getSourcesFilters(items.value);
const search = ref('');

const localSourceBindings = ref(makeInitialSourceBindings());

function makeInitialSourceBindings() {
  const bindings: Record<
    string,
    SourceBinding | { path: string | null; pageOffset: number }
  > = {};
  for (const source of sources) {
    bindings[source.name] = {
      path: settingsStore.sourceBindings[source.name]?.path || null,
      pageOffset: settingsStore.sourceBindings[source.name]?.pageOffset || 0
    };
  }
  return bindings;
}

function isEdited(sourceName: string) {
  const isPathSame =
    !!localSourceBindings.value[sourceName].path ==
      !!settingsStore.sourceBindings[sourceName]?.path &&
    localSourceBindings.value[sourceName].path ==
      settingsStore.sourceBindings[sourceName]?.path;

  const isPageOffsetSame =
    !!localSourceBindings.value[sourceName].pageOffset ==
    !!settingsStore.sourceBindings[sourceName]?.pageOffset;

  return !(isPathSame && isPageOffsetSame);
}

function updateSourceBinding(sourceName: string) {
  if (!localSourceBindings.value[sourceName].path) {
    delete settingsStore.sourceBindings[sourceName];
    return;
  }

  // @ts-ignore because the if statement above ensures that the path is not null
  settingsStore.sourceBindings[sourceName] = {
    ...localSourceBindings.value[sourceName]
  };
}

function deleteLocalSourceBinding(sourceName: string) {
  localSourceBindings.value[sourceName] = {
    path: '',
    pageOffset: 0
  };

  updateSourceBinding(sourceName);
}

const filteredSources = computed(() => {
  if (search.value.length > 0) {
    const searchText = search.value.toLowerCase().trim();
    return sources.filter((source) =>
      source.name.toLowerCase().includes(searchText)
    );
  }
  return sources;
});
</script>

<style scoped lang="scss">
.modal {
  height: 100%;
}

form {
  display: flex;
  flex-direction: row;
  > .form-group:first-of-type {
    flex: 1;
  }

  > .form-group:last-of-type {
    width: 12rem;
  }
}

.search {
  background-color: var(--surface-color);
  z-index: 1;
  position: sticky;
  top: 0;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  li {
    padding: 1.2rem;
    background-color: var(--surface-color-2);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    > .source-info {
      width: 100%;
      padding-bottom: 0.8rem;
      border-bottom: 1px dashed var(--surface-color-3);
    }
  }
}

@media (max-width: 768px) {
  .search-box {
    max-width: unset;
  }

  .search-box + p {
    text-align: center;
  }

  form.edit-box {
    max-width: unset;
    width: 100%;
    flex-direction: column;
    > .form-group {
      width: 100%;
    }
  }

  ul > li {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
