<template>
  <v-container fluid class="home-expert">
    <v-row>
      <v-col :cols="12" :md="8">
        <v-infinite-scroll :items="items" class="p-x-4px" :onLoad="load">
          <template v-for="item of items" :key="item">
            <v-card :title="item.username" color="surface-variant" variant="plain">
              <template v-slot:prepend>
                <v-avatar color="blue-darken-2" :size="42" rounded="1">
                  <v-img :src="getFileUrl(item.avatart)"></v-img>
                </v-avatar>
              </template>
              <template v-slot:subtitle> 副标题 </template>
              <template v-slot:append>
                <v-btn color="primary" rounded="2" variant="outlined"> 其他作品 </v-btn>
              </template>
              <v-card-text class="pa-0">
                <v-container>
                  <v-row v-if="item.articles.length">
                    <v-col :cols="6" :sm="3" v-for="node of item.articles.slice(4)" :key="node">
                      <v-img
                        class="bg-grey-lighten-2 cursor-pointer"
                        height="125"
                        :src="getFileUrl(node.cover)"
                        cover
                      ></v-img>
                    </v-col>
                  </v-row>
                  <v-row v-else> 暂无更多内容 </v-row>
                </v-container>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
          </template>
          <template v-slot:empty>
            <v-alert type="warning">没有更多评论啦!</v-alert>
          </template>
          <template v-slot:load-more="{ props }">
            <v-btn icon="mdi-refresh" size="small" variant="text" v-bind="props"></v-btn>
          </template>
        </v-infinite-scroll>
      </v-col>
      <v-col :cols="12" :md="3" class="d-none d-md-block d-xl-none">
        <v-card class="mx-auto">
          <v-toolbar color="transparent" flat>
            <v-toolbar-title>搜索领域的其他人</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-magnify" @click="searchField.focus()"> </v-btn>
          </v-toolbar>
          <v-container>
            <v-row align="center" justify="start">
              <v-col
                v-for="(selection, i) of selections"
                :key="selection.id"
                class="py-1 pe-0"
                cols="auto"
              >
                <v-chip :disabled="loading" closable @click:close="selected.splice(i, 1)">
                  {{ selection.attributes.title }}
                </v-chip>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="searchField"
                  v-model="search"
                  label="输入搜索领域"
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="(item, i) in itemList"
              @click="addClass(item)"
              :key="i"
              :value="item"
              color="primary"
            >
              <v-list-item-title>{{ item.attributes.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!selected.length"
              :loading="loading"
              color="purple"
              variant="text"
              @click="next"
            >
              搜索
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Classification, Labels, Talents } from "@/type/index";
import { getUserList } from "@/api/index";

const items = ref<Talents[]>([]);
const searchField = ref();
const config = useConfigstore();
const loading = ref(false);
const search = ref("");
const selected = ref<Classification[]>([]);
/**
 * @descripttion: 加载更多
 * @param {*} done
 * @return {*}
 */
async function load({ done }: { done: Function }): Promise<void> {
  done("empty");
}

const itemList = ref<Classification[]>([]);

config.getClassification().then((data: Classification[]) => {
  data.forEach((element) => {
    itemList.value.push({
      id: element.id,
      attributes: {
        title: element.attributes.title,
      },
    });
  });
});

const allSelected = computed(() => {
  return selected.value.length != itemList.value.length;
});

getUserList(selected.value).then((data) => {
  items.value = data;
  console.log(data);
});

/**
 * @descripttion:添加领域
 * @param {*} item
 * @return {*}
 */
function addClass(item: Classification): void {
  selected.value.push(item);
  let index = itemList.value.findIndex((element: Classification) => {
    return item.id == element.id;
  });
  if (!~index) {
    return;
  } else {
    itemList.value.splice(index, 1);
  }
}

/**
 * @descripttion: 分类
 * @return {*}
 */
const categories = computed(() => {
  const _search = search.value.toLowerCase();
  if (!_search) return itemList;
  return itemList.value.filter(
    (item: {
      id: number;
      attributes: {
        title: string;
      };
    }) => {
      const text = item.attributes.title;
      return text.indexOf(_search) > -1;
    }
  );
});
/**
 * @descripttion: 当前选择
 * @param {*} computed
 * @return {*}
 */
const selections = computed(() => {
  const selections: Classification[] = [];
  selected.value.forEach((elemnet: Classification) => {
    selections.push(elemnet);
  });
  return selections;
});

watch(selected, () => {
  search.value = "";
});

/**
 * @descripttion: 搜索
 * @return {*}
 */
function next(): void {
  loading.value = true;
}
</script>
<style lang="scss">
.home-expert {
  min-height: 100vh;
  .v-list-item__content {
    overflow: visible;
  }
  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
}
</style>
