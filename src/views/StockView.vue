<script setup>
  import {onMounted, ref, watch} from "vue";
  import {stocksSocket} from "@/service/gateway";
  import StockCard from "@/components/Stock/StockCard.vue";
  import store from "@/store";

  const stocks = ref({});
  const selectedStockName = ref(undefined);
  const selectedStock = ref(undefined);
  const historicalData = ref({})

  stocksSocket.on('updateStock', (response) =>{
    response.forEach( elem => {
      stocks.value[elem.ticker] = elem
    })
  })

  stocksSocket.on('historicalData', (response) => {
    response.forEach( elem =>
      historicalData.value[elem.ticker] = elem.data.map(data => ({date: data.Date, price: data.Open}))
    )
  })

  stocksSocket.on('trading', (response) => {
    store.commit('setTradingList', JSON.parse(response))
  })

  watch(selectedStockName, () => {
    selectedStock.value = getStockByName(selectedStockName.value);
    fill(5);
  });

  function getStockByName(name) {
    return stocks.value[name];
  }

  onMounted(() => {
    stocksSocket.emit('getHistoricalData')
    fill(5);
  });

  const quantitySt = ref(0)

  watch(stocks, () => {
    selectedStock.value = getStockByName(selectedStockName.value);
  }, { deep: true });

  function buy() {
    if (selectedStock.value == null) {
      return;
    }
    if (store.state.broker.id == null) {
      return;
    }

    stocksSocket.emit('buy', {
      brokerId: store.state.broker.id,
      id: selectedStock.value.id,
      quantity: 1,
    });

  }

  function sell() {
    if (selectedStock.value == null) {
      return;
    }
    if (store.state.broker.id == null) {
      return;
    }

    stocksSocket.emit('sell', {
      brokerId: store.state.broker.id,
      id: selectedStock.value.id,
      quantity: 1,
    });
  }

  function fill(delay) {
    setTimeout(() => {
      stocksSocket.emit('findAllStock');
    }, delay);
  }
</script>

<template>
  <div>
    <p v-if="stocks.length === 0">No stocks to display</p>
    <div v-else class="card-wrapper">
      <v-select v-model="selectedStockName" :items="store.state.tradingList" label="Select Stock"></v-select>
      <stock-card v-if="selectedStock != null" :stock="selectedStock" :historical="historicalData[selectedStock.ticker]"></stock-card>
      <p v-else>Stock not found</p>
      <div v-if="selectedStock != null">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="quantitySt" label="Quantity" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn @click="buy">Buy</v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn @click="sell">Sell</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css"></style>
