<template>
  <ClientOnly>
    <v-navigation-drawer :elevation="0" floating :fixed="true" expand-on-hover>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          subtitle="183957330@qq.com"
          title="Admin"
          class="cursor-pointer"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" color="primary" nav v-model:selected="selected">
        <v-list-item
          prepend-icon="mdi-podium-gold"
          title="发现"
          color="primary"
          value="myfiles"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-draw"
          title="发布"
          color="primary"
          value="shared"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-creation"
          title="收藏"
          color="primary"
          value="starred"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </ClientOnly>
  <VAppBar :elevation="0" :order="0" border :floating="true" position="sticky">
    <template #prepend>
      <v-app-bar-nav-icon>
        <!-- <VAvatar :size="32">
          <SvgIcon name="community_icon"> </SvgIcon>
        </VAvatar> -->
        <VAvatar color="teal-darken-4"> 青 </VAvatar>
      </v-app-bar-nav-icon>
    </template>
    <v-app-bar-title v-if="!smAndUp">小青社</v-app-bar-title>
    <template #append>
      <v-btn icon="mdi-heart" color="primary" class="d-md-none d-lg-none"></v-btn>
      <v-btn icon="mdi-magnify" color="primary" class="d-md-none d-lg-none"></v-btn>
      <v-btn icon="mdi-dots-vertical" color="primary" class="d-md-none d-lg-none"></v-btn>
      <v-menu transition="slide-y-transition" class="shrink">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-chevron-down"
            color="primary"
            class="d-none d-md-flex d-xl-flex"
            title="更多"
            v-bind="props"
          ></v-btn>
        </template>
        <v-expand-transition>
          <v-list class="mx-auto bg-secondary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title>
                <v-btn color="secondary" style="width: 100px">
                  {{ item.title }}
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expand-transition>
      </v-menu>
    </template>
    <VContainer id="input-usage" fluid>
      <v-row justify="center" class="d-none d-md-flex d-xl-flex">
        <v-col cols="6">
          <VRow align="end" class="clear-init">
            <v-text-field
              clearable
              prepend-icon="mdi-magnify"
              label="发现"
              variant="underlined"
            ></v-text-field>
          </VRow>
        </v-col>
      </v-row>
    </VContainer>
  </VAppBar>
  <VContainer class="community-main" :fluid="true">
    <v-row justify="center">
      <VCol :cols="24">
        <VCard>
          <v-tabs v-model="tab" align-tabs="end" color="secondary" show-arrows grow>
            <v-tab :value="1">全部</v-tab>
            <v-tab :value="2">文章</v-tab>
            <v-tab :value="3">图文</v-tab>
            <v-tab :value="4">欸嘿</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item v-for="n in 3" :key="n" :value="n">
              <v-container fluid>
                <v-row>
                  <v-col v-for="i in 6" :key="i" cols="12" md="4">
                    <v-img
                      :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                      :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                      aspect-ratio="1"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
            <v-window-item :key="4" :value="4">
              <v-container fluid style="height: 100vh"> dd </v-container>
            </v-window-item>
          </v-window>
        </VCard>
      </VCol>
    </v-row>
  </VContainer>
  <v-footer name="footer" app>
    <v-btn class="mx-auto" variant="text" color="primary"> Get data </v-btn>
  </v-footer>
</template>

<script setup lang="ts">
const media = useMedia();
const { smAndUp } = media;
const selected = ref<string[]>(["myfiles"]);
const tab = ref<string>();
const items = ref([
  {
    title: "选择",
    value: "1",
  },
  {
    title: "选择",
    value: "1",
  },
  {
    title: "选择",
    value: "1",
  },
  {
    title: "选择",
    value: "1",
  },
]);
</script>
<style lang="scss">
.clear-init {
  .v-input__details {
    display: none;
  }
}
.community-main {
  min-height: 800px;
  padding: 20px;
}
</style>
