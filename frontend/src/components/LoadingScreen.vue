<script setup lang="ts">
import CoinLoader from '@/components/CoinLoader.vue';

const props = defineProps<{ text: string }>();
</script>

<template>
  <v-container class="h-100 w-100 d-flex flex-column justify-space-around">
    <div class="d-flex justify-space-around">
      <div class="d-flex flex-column align-center">
        <CoinLoader :size="150" />
        <p class="text-overline">
          {{ props.text }}
        </p>
      </div>
    </div>
  </v-container>
</template>
