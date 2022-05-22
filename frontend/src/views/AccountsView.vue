<script setup lang="ts">
import { computed } from 'vue';
import { useLinkStore } from '@/stores/link';

const linkStore = useLinkStore();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const accounts = computed(() => linkStore.link!.accounts!.map((acc) => ({
  text: '', // Vuetify has the wrong type declarations for the v-select item
  title: `${acc.name} ${acc.number}`,
  value: `${acc.name} ${acc.number}`,
  return: acc.id,
})));

const saveAccounts = () => {
  console.log('Moving to the next window...');
};
</script>

<template>
  <v-container class="h-100 d-flex flex-column justify-space-around">
    <div class="d-flex justify-space-around">
      <div class="w-100 d-flex flex-column">
        <h2>Select the account receives money</h2>
        <v-select
          label="Account receives money"
          :items="accounts"
        />
        <h2>Select the account spends money</h2>
        <v-select
          label="Account spends money"
          :items="accounts"
        />
        <v-btn
          size="large"
          @click="saveAccounts"
        >
          To the dashboard!
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
