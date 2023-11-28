<script setup>
  const props = defineProps(["broker", "stockPrices"]);

  const IDS = {
    "AAPL": 0,
    "AMD": 1,
    "AMZN": 2,
    "CSCO": 3,
    "MSFT": 4,
    "QCOM": 5,
    "SBUX": 6,
    "TSLA": 7,
  }

  const getPrice = (id) => {
    return props.stockPrices[id].price === undefined ? "?" : props.stockPrices[id].price;
  };

  const getProfit = (priceBought, quantity, id) => {
    const profit =  priceBought - props.stockPrices[id].price * quantity;
    return profit > 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2);
  };
</script>

<template>
  <v-card class="broker-card">
    <v-card-title>{{ broker.name }}</v-card-title>

    <v-row>
      <v-col>
        <v-card-subtitle>Money: <span class="money">{{ broker.balance.toFixed(2) }}</span>$</v-card-subtitle>
      </v-col>
    </v-row>

    <v-row v-if="broker.stocks.length === 0">
      <v-col>
        <v-card-subtitle>Stocks: None</v-card-subtitle>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-card-subtitle v-for="[actives, data] in Object.entries(broker.stocks)" :key="IDS[actives]">
          {{ actives }}: {{ data.quantity }} x {{ getPrice(IDS[actives]) }} ->
          {{ getProfit(data.purchasePrice, data.quantity, IDS[actives]) }}
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped lang="css">

</style>
