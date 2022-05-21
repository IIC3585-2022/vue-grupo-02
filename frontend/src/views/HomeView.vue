<script setup lang="ts">
import { ref } from 'vue';
import { useFintocWidget } from '@/composables/fintocWidget';
import { useLinkStore } from '@/stores/link';
import type { LinkSnaked } from '@/interfaces/entities/link';

const linkStore = useLinkStore();

const connecting = ref(false);

const connect = async () => {
  connecting.value = true;
  const widget = await useFintocWidget({
    onExit: () => {
      connecting.value = false;
    },
    onSuccess: (snakedLink: LinkSnaked) => {
      linkStore.loadLink(snakedLink);
    },
  });
  widget?.open();
};
</script>

<template>
  <v-container class="h-100 d-flex flex-column justify-space-around">
    <div class="d-flex justify-space-around">
      <v-btn
        size="large"
        :disabled="connecting"
        @click="connect"
      >
        Connect your account!
      </v-btn>
    </div>
  </v-container>
</template>
