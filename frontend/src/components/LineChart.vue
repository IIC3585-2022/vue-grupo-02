<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { ScatterDataPoint } from 'chart.js';

import 'chart.js/auto';

const props = withDefaults(defineProps<{
  labels: Array<string>,
  inboundLabel: string,
  inboundData: Array<{ amount: number, postDate: string }>,
  outboundLabel: string,
  outboundData: Array<{ amount: number, postDate: string }>,
  xAxisKey: string,
  yAxisKey: string,
  inboundColor?: string,
  outboundColor?: string,
}>(), {
  inboundColor: '#36a2eb',
  outboundColor: '#ffffff',
});

const options = {
  responsive: true,
  animation: {
    duration: 0,
  },
  aspectRatio: 2.5,
  parsing: {
    xAxisKey: props.xAxisKey,
    yAxisKey: props.yAxisKey,
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
  layout: {
    padding: 40,
  },
};

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: props.inboundLabel,
      data: props.inboundData as unknown as Array<ScatterDataPoint>,
      borderColor: props.inboundColor,
      borderWidth: 1,
    },
    {
      label: props.outboundLabel,
      data: props.outboundData as unknown as Array<ScatterDataPoint>,
      borderColor: props.outboundColor,
      borderWidth: 1,
    },
  ],
};
</script>

<template>
  <Line
    :chart-data="chartData"
    :chart-options="options"
    :height="500"
  />
</template>
