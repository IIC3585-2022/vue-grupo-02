<script setup lang="ts">
import LoadingScreen from '@/components/LoadingScreen.vue';
import { useHerokuSleepingDyno } from './composables/herokuSleepingDyno';

const { ready } = useHerokuSleepingDyno();
</script>

<template>
  <v-app class="height-full overflow-auto">
    <v-main>
      <router-view v-if="ready" />
      <template v-else>
        <LoadingScreen text="Waiting for the server to start..." />
      </template>
    </v-main>
  </v-app>
</template>
