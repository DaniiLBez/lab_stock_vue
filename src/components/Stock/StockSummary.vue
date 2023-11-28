<script setup>
  const payload = defineProps(['stock']);
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <p>Price: <span id="stockPrice">{{ payload.stock.price || 'None' }}</span></p>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="css">

</style>
