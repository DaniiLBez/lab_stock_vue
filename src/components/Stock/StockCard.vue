<script setup>
import {ref, watch} from "vue";
  import {stocksSocket} from "@/service/gateway";
import StockChart from "@/components/Stock/StockChart.vue";
import StockSummary from "@/components/Stock/StockSummary.vue";

  const dateRef = ref('2022-11-14')
  const props = defineProps(['stock', 'historical']);
  const stockRef = ref({
    ticker: props.stock.ticker,
    quantity: props.stock.quantity,
    price: props.stock.price,
  })

  watch(() => props.stock, () => {
    stockRef.value = {
      ticker: props.stock.ticker,
      price: props.stock.price,
      quantity: props.stock.quantity,
    };
    dateRef.value = props.stock.date
  }, {deep: true});

  stocksSocket.on('updateStock', async(response) => {
    if(response){
      const ticker = response.find(elem => elem.id === props.stock.id)
      dateRef.value = ticker.date
      stockRef.value = { ticker: ticker.ticker, price: ticker.price, quantity: props.stock.quantity }
    }
  })
</script>

<template>

  <stock-chart class="chart" :stock="stockRef" :date="dateRef" :historical="historical"/>
  <stock-summary :stock="stockRef"/>

</template>

<style scoped lang="css">

</style>
