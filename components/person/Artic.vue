<template>
  <Waterfall
    :list="list"
    class="bg-[--v-theme-surface-light]! pa-0"
    :hasAroundGutter="false"
    :crossOrigin="false"
    :breakpoints="{
      1920: { rowPerView: 4 },
      1200: { rowPerView: 3 },
      960: { rowPerView: 2 },
      600: { rowPerView: 1 },
    }"
    align="left"
    :gutter="16"
  >
    <template #item="{ item }">
      <v-card class="card" hover>
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img cover>
          <LazyImg :url="getFileUrl(item.cover)" />
        </v-img>

        <v-card-item>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-actions class="pa-0">
            <v-avatar :size="26">
              <v-img :src="getFileUrl(item.publisher.avatart)"> </v-img>
            </v-avatar>
            <span class="ml-2">{{ item.publisher.username }}</span>
            <v-spacer></v-spacer>
            <v-icon color="error" icon="mdi-fire-circle" :size="24"></v-icon>
          </v-card-actions>
        </v-card-item>

        <v-card-text>
          <!-- <v-row align="center" class="mx-0">
            <v-rating :model-value="5" color="primary" density="compact" size="small" half-increments
              readonly></v-rating>

            <div class="text-grey ms-4">5 (五星好评！)</div>
          </v-row> -->

          <v-card-subtitle class="pa-0">简介：</v-card-subtitle>

          <div class="ml-4">
            {{ item.introduction }}
          </div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-actions>
          <v-btn color="primary" text="阅读" @click="goAttributesInfo(item.id)" block border />
        </v-card-actions>
      </v-card>
    </template>
  </Waterfall>
</template>

<script setup lang="ts">
import type { ArticleHomeList, FileObj } from "~/type/index";
/**
 * @descripttion: 文章列表
 * @return {*}
 */
interface ArticeList {
  id: number;
  title: string;
  content: string;
  introduction: string;
  publisher: {
    id: number;
    username: string;
    avatart: FileObj;
  };
  cover: FileObj;
}

const router = useRouter();
const props = defineProps<{
  articList?: ArticeList[];
}>();
const { articList } = props;
const list = ref<ArticeList[]>(articList ? articList : []);

console.log(props);

/**
 * @descripttion:前往文章详情页
 * @return {*}
 */
function goAttributesInfo(articleId: number): void {
  router.push({
    path: `/${articleId}`,
  });
}
</script>
<style lang="scss" scoped></style>
