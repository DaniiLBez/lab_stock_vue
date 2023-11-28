<script setup>
import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  LineElement,
  PointElement, TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from 'vue-chartjs';
import {ref, watch} from "vue";
import 'chartjs-adapter-date-fns';

ChartJs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

const payload = defineProps(['stock', 'date', 'historical'])
const data = ref({})
const options = ref({})

async function updateOptions() {
  options.value = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: payload.stock.ticker,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }
}

async function updateData() {
  const maxDateTime = new Date(payload.date).getTime();
  const minDateTime = new Date("11-14-2022").getTime();

  const filteredPairs = payload.historical
    .filter((pair) => {
        const dateTime = new Date(pair.date).getTime();
        return minDateTime <= dateTime && dateTime <= maxDateTime;
      }
    );

  const dates = [];
  const prices = [];

  filteredPairs.forEach((pair) => {
    dates.push(pair.date);
    prices.push(Number(pair.price.split('$')[1]));
  });

  data.value = {
    labels: dates.reverse(),
    datasets: [
      {
        label: payload.stock.ticker,
        data: prices.reverse(),
        fill: false,
        backgroundColor: 'rgb(246,246,246)',
        borderColor: 'rgba(9,28,204,0.5)',
      },
    ],
  };
}

watch(() => payload.stock.date, async () => {
  await updateData();
});
watch(() => payload.stock, async () => {
  await updateOptions();
  await updateData();
});

updateOptions();
updateData();
</script>

<template>
    <Line class="chart" :data="data" :options="options"/>
</template>

<style scoped lang="css">

</style>
