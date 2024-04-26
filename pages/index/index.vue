<template>
  <VContainer class="community-main" :fluid="true">
    <v-row justify="center">
      <VCol :cols="12">
        <VCard border="0">
          <v-tabs v-model="tab" align-tabs="end" color="secondary" class="pb-1" show-arrows grow>
            <v-tab :value="1">文章</v-tab>
            <v-tab :value="2">动态</v-tab>
            <!-- <v-tab :value="3">发现朋友</v-tab> -->
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="1">
              <IndexHomeImageText />
            </v-window-item>
            <v-window-item :value="2">
              <IndexHomeTrends />
            </v-window-item>
            <v-window-item :key="3" :value="3">
              <v-container fluid style="height: 100vh"> dd </v-container>
            </v-window-item>
          </v-window>
        </VCard>
      </VCol>
    </v-row>
  </VContainer>
  <NuxtPage />
</template>

<script setup lang="ts">
const tab = ref<string>();
</script>
<style lang="scss" scoped></style>
