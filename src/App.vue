<template>
  <v-app>
    <v-navigation-drawer v-if="showNavigation" app expand-on-hover rail>
      <v-list>
        <v-list-item>
          <template #title>
            {{ store.state.broker.name }}
          </template>
        </v-list-item>
        <v-list-item link to="/" prepend-icon="mdi-home" title="На стартовую"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="Акции" link to="/stock"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Брокеры" link to="/broker"></v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import {computed, ref} from 'vue';
  import { useRoute } from 'vue-router';
import store from "./store";

  const drawer = ref(false);
  const route = useRoute();
  const showNavigation = computed(() => route.path !== '/');
</script>

<style>

</style>
