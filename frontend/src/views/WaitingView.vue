<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLinkStore } from '@/stores/link';
import { Nullable } from '@/interfaces/common';
import LoadingScreen from '@/components/LoadingScreen.vue';

const router = useRouter();
const linkStore = useLinkStore();

let interval: Nullable<number> = null;

const checkIfLinkReady = async () => {
  if (await linkStore.isRefreshed()) {
    router.push({ path: '/dashboard' });
  }
};

onMounted(() => {
  checkIfLinkReady();
  interval = setInterval(checkIfLinkReady, 3000);
});

onUnmounted(() => {
  if (interval !== null) {
    clearInterval(interval);
  }
});
</script>

<template>
  <LoadingScreen text="We are loading your movements, please wait..." />
</template>
