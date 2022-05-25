<script setup lang="ts">
import {
  computed, onMounted, ref, watch,
} from 'vue';
import { useMovementsStore } from '@/stores/movements';
import { Nullable } from '@/interfaces/common';
import LoadingScreen from '@/components/LoadingScreen.vue';
import LineChart from '@/components/LineChart.vue';

const movementsStore = useMovementsStore();

const chartRef = ref<Nullable<InstanceType<typeof LineChart>>>(null);

const inboundMovements = computed(() => movementsStore.orderedInbound.map((mov) => ({
  amount: mov.amount,
  postDate: mov.postDate,
})));

const outboundMovements = computed(() => movementsStore.orderedOutbound.map((mov) => ({
  amount: mov.amount,
  postDate: mov.postDate,
})));

onMounted(() => {
  movementsStore.loadMovements();
});

watch(() => movementsStore.search, () => {
  movementsStore.searchOutbound();
});
</script>

<template>
  <template v-if="movementsStore.loading">
    <LoadingScreen text="We are loading your movements, please wait..." />
  </template>
  <v-container
    v-else
    class="h-100 d-flex flex-column justify-space-around"
  >
    <div class="d-flex justify-space-around">
      <div class="w-100 d-flex flex-column">
        <LineChart
          ref="chartRef"
          :key="movementsStore.search"
          :labels="movementsStore.dates"
          inbound-label="Inbound"
          :inbound-data="inboundMovements"
          outbound-label="Outbound"
          :outbound-data="outboundMovements"
          x-axis-key="postDate"
          y-axis-key="amount"
        />
        <v-text-field
          v-model="movementsStore.search"
          label="Search purchases"
        />
      </div>
    </div>
  </v-container>
</template>
