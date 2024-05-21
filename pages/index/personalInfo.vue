<template>
  <v-container class="w-100% min-h-[calc(100vh-90px)] max-w-100%!" fluid>
    <v-row class="gap-16px pa-4">
      <v-avatar :size="200" rounded="0" class="rounded-lg">
        <v-img :src="getFileUrl(userInfo?.avatart)" cover></v-img>
      </v-avatar>
      <v-col cols="12" class="py-2 bg-[rgba(var(--v-theme-surface))]! rounded-lg" md="9">
        <p class="text-h3">{{ userInfo?.username }}</p>
        <v-sheet class="m-t-2 d-flex">
          <span class="text-caption d-flex align-center"> 账号：{{ userInfo?.email }} </span>
          <div class="w-1px m-x-8px bg-black"></div>
          <v-chip size="small" class="ma-0" :color="getGender.color" :prepend-icon="getGender.icon">
            {{ getGender.text }}
          </v-chip>
        </v-sheet>
        <v-sheet>
          <v-chip
            size="small"
            class="mt-4"
            color="red-darken-1"
            prepend-icon="mdi-cake-variant-outline"
          >
            {{ userInfo?.birthday ? userInfo.birthday : "保密" }}
          </v-chip>
        </v-sheet>
        <v-card variant="text" class="m-t-2">
          <v-card-title class="pa-0 text-subtitle-1 font-normal!"> 擅长领域 </v-card-title>
          <v-card-text class="px-0 d-flex gap-2 py-2">
            <v-chip size="small" v-for="item of userInfo?.excels" :key="item.id">
              {{ item.title }}
            </v-chip>
          </v-card-text>
        </v-card>
        <v-sheet class="m-t-2">
          <div>个人说明</div>
          <v-card variant="tonal" max-width="600" class="my-2">
            <v-card-text class="px-2 py-2">
              <p class="text-body-2">
                {{ userInfo?.introduction ? userInfo?.introduction : "这家伙很懒，什么都没写" }}
              </p>
            </v-card-text>
          </v-card>
        </v-sheet>
        <!-- <v-sheet class="flex! gap-16px!">
          <span class="text-caption"> 0 关注 </span>
          <span class="text-caption"> 32 粉丝 </span>
          <span class="text-caption"> 908 获赞与收藏 </span>
        </v-sheet> -->
      </v-col>
    </v-row>
    <v-row class="m-t-0 p-t-0">
      <v-col class="pt-0">
        <v-card variant="text">
          <v-card-title class="px-0"> 个人详细介绍 </v-card-title>
          <v-card-text class="px-1">
            <ClientOnly>
              <Editor
                class="outline-none"
                v-model="text"
                :placeholder="userInfo?.explain ? userInfo?.explain : '暂无内容'"
                ref="ediotrRead"
                :api-key="editorConfig.apiKey"
                :init="editorConfig.readInit"
              />
            </ClientOnly>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="px-4">
      <v-col class="pa-0">
        <v-card class="w-100%" variant="text">
          <v-card-title class="pa-0">
            <v-btn-toggle v-model="select" size="small" color="primary" mandatory rounded="1" group>
              <v-btn size="small" rounded="1" value="0">
                <v-icon icon="mdi-draw-pen"></v-icon>
                文章
              </v-btn>
              <v-btn size="small" rounded="1" value="1">
                <v-icon icon="mdi-message-text-fast-outline"></v-icon>
                动态
              </v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-window v-model="select">
              <v-window-item key="0">
                <v-card variant="text" class="mt-4 pa-0">
                  <v-card-text class="pa-0" v-if="userInfo">
                    <PersonArtic :articList="userInfo.articles" />
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item key="1">
                <v-card variant="text" class="pa-1" v-if="userInfo">
                  <PersonTrend :list="userInfo.trends" />
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getUserInfo } from "@/api/index";
import type { UserInfo } from "@/type/index";
const route = useRoute();
const userInfo = ref<UserInfo>();
const { userId } = route.query;
const select = ref(0);
const text = ref<string>();
/**
 * @descripttion: 响应式策略对象
 * @return {*}
 */
const getGender = computed<{
  icon: string;
  color: string;
  text: string;
}>(() => {
  /**
   * @descripttion:策略对象
   * @return {*}
   */
  const gender: {
    [key: string]: {
      icon: string;
      color: string;
      text: string;
    };
  } = {
    confidential: {
      icon: "mdi-lock-outline",
      color: "#9E9E9E",
      text: "保密",
    },
    female: {
      icon: "mdi-gender-female",
      color: "#2196F3",
      text: "男",
    },
    male: {
      icon: "mdi-gender-male",
      color: "#E91E63",
      text: "女",
    },
  };
  if (userInfo.value) {
    return gender[userInfo.value.sex];
  } else {
    return gender["confidential"];
  }
});

getUserInfo(userId as unknown as number).then((data) => {
  userInfo.value = data;
  text.value = data.explain;
});
</script>
<style lang="scss">
.moric-tab {
  &__button {
    height: 100%;
  }
}
</style>
