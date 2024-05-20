<template>
  <v-container fluid class="img-text">
    <v-sheet class="pa-2 d-flex flex-wrap">
      <v-chip
        class="ma-2"
        v-for="item of items"
        :key="item.id"
        :color="clolor(item)"
        :value="item.id"
        @click="switchClassification(item)"
        link
      >
        <v-icon icon="mdi-tag-multiple" start></v-icon>
        {{ item.attributes.title }}
      </v-chip>
    </v-sheet>
    <Waterfall
      :list="list"
      class="bg-[--v-theme-surface-light]!"
      :crossOrigin="false"
      :hasAroundGutter="true"
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
            <LazyImg :url="getFileUrl(item.attributes.cover.data?.attributes)" />
          </v-img>

          <v-card-item>
            <v-card-title>{{ item.attributes.title }}</v-card-title>
            <v-card-actions class="pa-0">
              <v-avatar :size="26">
                <v-img
                  :src="
                    getFileUrl(item.attributes.publisher.data.attributes.avatart.data?.attributes)
                  "
                >
                </v-img>
              </v-avatar>
              <span class="ml-2">{{ item.attributes.publisher.data.attributes.username }}</span>
              <v-spacer></v-spacer>
              <v-icon color="error" icon="mdi-fire-circle" :size="24"></v-icon>
            </v-card-actions>
          </v-card-item>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :model-value="5"
                color="primary"
                density="compact"
                size="small"
                half-increments
                readonly
              ></v-rating>

              <div class="text-grey ms-4">5 (五星好评！)</div>
            </v-row>

            <v-card-subtitle class="my-4 pa-0">简介：</v-card-subtitle>

            <div class="ml-4">
              {{ item.attributes.introduction }}
            </div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-actions>
            <v-btn color="primary" text="阅读" @click="goAttributesInfo(item.id)" block border />
          </v-card-actions>
        </v-card>
      </template>
    </Waterfall>
  </v-container>
</template>

<script setup lang="ts">
import { getHomeArticlesList } from "@/api/index";
import type { ArticleHomeList, Classification } from "@/type/index";
const route = useRoute();
const router = useRouter();
//搜索内容
const { keyWord } = toRefs<{
  keyWord?: string;
}>(route.query);

const items = ref<Classification[]>([
  {
    id: -1,
    attributes: {
      title: "全部",
    },
  },
]);
const classification = useConfigstore();
classification.getClassification().then((data: Classification[]) => {
  items.value = data;
});

//选项
const select = ref<number>(-1);

/**
 * @descripttion: 切换分类
 * @return {*}
 */
function switchClassification(item: Classification): void {
  select.value = item.id;
}

let clolor = computed(() => {
  return function (item: Classification) {
    let flag = select.value == item.id;
    return flag ? "primary" : "";
  };
});

/**
 * @descripttion: 删除一个筛选项
 * @param {*} item
 * @return {*}
 */
function remove(item: Classification): void {
  // chips.value.splice(chips.value.indexOf(item), 1);
}
/**
 * @descripttion:前往文章详情页
 * @return {*}
 */
function goAttributesInfo(articleId: number): void {
  router.push({
    path: `/${articleId}`,
  });
}

const list = ref<ArticleHomeList[]>([]);
getHomeArticlesList().then((data) => {
  list.value = data.data;
});
</script>
<style lang="scss">
.img-text {
  width: 100%;
  min-height: 100vh;
}
</style>
