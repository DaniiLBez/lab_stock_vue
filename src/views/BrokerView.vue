<script setup>
  import BrokerCard from "@/components/Broker/BrokerCard.vue";
  import {onMounted, ref} from "vue";
  import axios from "axios";
  import {BASE_URL} from "@/service/http";
  import {stocksSocket} from "@/service/gateway";

  const brokersRef = ref([]);
  const stockPricesRef = ref({});

  axios.get(`${BASE_URL}/broker/all`)
    .then(response => (brokersRef.value = response.data)
  );

  stocksSocket.on('updateStock', (resp) => {
    resp.forEach(elem => stockPricesRef.value[elem.id] = elem);
    axios.get(`${BASE_URL}/broker/all`)
      .then(response => (brokersRef.value = response.data)
      );
  })

  onMounted(() => {
    stocksSocket.emit('findAllStock')
    console.log()
  })
</script>

<template>
  <v-container>
    <v-row class="brokers-view">
      <v-col v-for="broker in brokersRef" :key="`broker-${broker.name}`">
        <broker-card :broker="broker" :stock-prices="stockPricesRef" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="css">

</style>
