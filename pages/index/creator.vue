<template>
  <v-sheet class="pa-2">
    <v-card subtitle="上传你的作品" class="creator" title="发布中心">
      <v-tabs v-model="tab" color="primary" class="px-2">
        <v-tab value="one">发动态</v-tab>
        <v-tab value="two">写文章</v-tab>
      </v-tabs>

      <v-card-text class="pa-0">
        <v-window v-model="tab" class="creator-window">
          <v-window-item value="one">
            <CreatorUpText />
          </v-window-item>
          <v-window-item value="two">
            <CreatorUpArticle />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
const tab = ref();
</script>
<style lang="scss">
.creator {
  min-height: calc(100vh - 134px);
}
</style>
