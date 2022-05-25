<script setup lang="ts">
import { onMounted } from 'vue';
import { useMovementsStore } from '@/stores/movements';
import LoadingScreen from '@/components/LoadingScreen.vue';

const movementsStore = useMovementsStore();

onMounted(() => {
  movementsStore.loadMovements();
});
</script>

<template>
  <template v-if="movementsStore.loading">
    <LoadingScreen text="We are loading your movements, please wait..." />
  </template>
  <template v-else>
    <p>Total in: {{ movementsStore.totalInbound }}</p>
    <p>Total out: {{ movementsStore.totalOutbound }}</p>
  </template>
</template>
