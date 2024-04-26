<template>
  <v-sheet class="pa-16px">
    <v-card>
      <v-tabs v-model="tab" align-tabs="center" bg-color="primary" stacked>
        <v-tab value="tab-1" style="height: 100%">
          <v-icon>mdi-phone</v-icon>
          Recents
        </v-tab>

        <v-tab value="tab-2" style="height: 100%">
          <v-icon>mdi-heart</v-icon>
          Favorites
        </v-tab>

        <v-tab value="tab-3" style="height: 100%">
          <v-icon>mdi-account-box</v-icon>
          Nearby
        </v-tab>
      </v-tabs>
      <v-sheet class="min-h-[calc(100vh-160px)] pa-4">
        <NuxtPage />
      </v-sheet>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
const tab = ref(null);
</script>
<style lang="scss" scoped></style>
