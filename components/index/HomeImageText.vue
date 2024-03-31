<template>
  <v-container fluid class="img-text">
    <Waterfall :list="list" :crossOrigin="false" :hasAroundGutter="false" align="left" :gutter="20">
      <template #item="{ item }">
        <div class="card">
          <LazyImg :url="item.url" />
          <p class="text">这是具体内容</p>
        </div>
      </template>
    </Waterfall>
  </v-container>
</template>

<script setup lang="ts">
const list = [
  {
    url: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
  },
  {
    url: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
  },
];
</script>
<style lang="scss">
.img-text {
  width: 100%;
  min-height: 100vh;
}
</style>
