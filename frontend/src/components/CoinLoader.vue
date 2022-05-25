<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  size?: number,
  color?: string,
}>(), {
  size: 64,
  color: '#fff',
});

const size = computed(() => `${props.size}px`);
</script>

<template>
  <div class="loader">
    <div />
  </div>
</template>

<style scoped>
.loader {
  display: inline-block;
  transform: translateZ(1px);
}
.loader > div {
  display: inline-block;
  width: v-bind(size);
  height: v-bind(size);
  margin: 8px;
  border-radius: 50%;
  background: v-bind('props.color');
  animation: loader 4.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes loader {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
