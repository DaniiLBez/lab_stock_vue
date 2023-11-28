<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { BROKER_URL } from '@/service/http'
  import store from '../store'

  const brokers = ref([]);
  const selectedBroker = ref(null);
  const brokerRef = ref(null)
  const brokersDetailed = ref([])
  const router = useRouter()

  onMounted(() => {
    axios
      .get(`${BROKER_URL}/all`)
      .then((response) => {
        brokersDetailed.value = response.data
        brokers.value.push(...response.data.map(elem=>({title: elem.name, value: elem.id})))
      })
      .catch((error) =>
        console.error(
          `[WelcomeComponent] Error during fetching brokers: ${error.message}`,
        ),
      )
  })

  const login = () => {
    if (selectedBroker.value) {
      for(let elem of brokersDetailed.value){
        if (elem.id === selectedBroker.value){
          brokerRef.value = elem
          store.commit('setBroker', brokerRef)
          break
        }
      }
      router.push({ path: `/stock` })
    }
  }

</script>

<template>
  <v-container class="LoginComponent">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="LoginText">Log in</v-card-title>
          <v-card-text class="card-text">
            <v-img src="@/assets/logo.svg" alt="image" class="logo" width="180" height="200"></v-img>
            <v-autocomplete
              v-model="selectedBroker"
              :items="brokers"
              label="Select Broker"
              class="input-field"
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions class="card-action">
            <v-btn :disabled="!selectedBroker" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="css" scoped>
.LoginComponent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.LoginText {
  text-align: center;
}

.card-text{
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
}

.input-field{
  width: 100%;
}

.card-action{
  display: flex;
  justify-content: center;
}
</style>
