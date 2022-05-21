<script setup lang="ts">
import { useHerokuSleepingDyno } from './composables/herokuSleepingDyno';

const { ready } = useHerokuSleepingDyno();
</script>

<template>
  <v-app class="height-full overflow-auto">
    <v-main>
      <router-view v-if="ready" />
      <template v-else>
        Loading...
      </template>
    </v-main>
  </v-app>
</template>
