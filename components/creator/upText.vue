<template>
  <v-card min-height="400" class="pa-4 trends">
    <v-container class="ma-0 pa-0 trends-content">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-h5 px-4">编辑你的动态</div>
          <v-card variant="flat" class="mt-4">
            <v-form fast-fail class="trends-form pa-4 pt-3">
              <label class="label text-grey-darken-2">标题</label>
              <v-text-field v-model="trends.title" :rules="firstNameRules"></v-text-field>
              <label class="label text-grey-darken-2">正文</label>
              <!-- <v-textarea
                v-model="trends.text"
                :rules="lastNameRules"
                clearable
                label="写你所想"
                auto-grow
                variant="solo-filled"
                bg-color="grey-lighten-5"
                counter
              ></v-textarea> -->
              <v-sheet class="m-b-4">
                <Editor
                  v-model="trends.text"
                  :api-key="editorConfig.apiKey"
                  :init="editorConfig.editInit"
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                ></Editor>
              </v-sheet>
              <label class="label text-grey-darken-2">选择你的相关文章</label>
              <v-select
                v-model="trends.aboutArticle"
                :items="articles"
                item-title="title"
                prepend-inner-icon="mdi-pound"
                item-value="id"
              >
              </v-select>
              <v-btn
                class="mt-1"
                color="primary"
                :loading="subLoading"
                @click.stop="submitTrend"
                block
              >
                提交你的动态
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-h5">预览</div>
          <v-card class="mx-auto pa-0 mt-4" :title="my.getMe.username" :subtitle="now">
            <template v-slot:prepend>
              <v-avatar color="blue-darken-2">
                <v-img
                  :src="getFileUrl(my.getMe.avatart)"
                  aspect-ratio="1"
                  class="bg-grey-lighten-2"
                  cover
                >
                  <template v-slot:placeholder>
                    <v-row align="center" class="fill-height ma-0" justify="center">
                      <v-progress-circular
                        color="grey-lighten-5"
                        indeterminate
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </template>
            <v-card-title>{{ trends.title }} </v-card-title>
            <v-card-text>
              <Editor
                rer="ediotrRead"
                v-model="trends.text"
                :api-key="editorConfig.apiKey"
                :init="editorConfig.readInit"
              />
            </v-card-text>
            <template v-slot:append>
              <div class="justify-self-end">
                <v-icon class="me-1" icon="mdi-heart" color="deep-orange"></v-icon>
                <span class="subheading me-2">256</span>
                <span class="me-1">·</span>
                <v-icon class="me-1" icon="mdi-share-variant" color="blue-darken-2"></v-icon>
                <span class="subheading">45</span>
              </div>
            </template>
            <v-card-actions>
              <v-btn variant="tonal" color="primary" class="subheading me-2"
                >#{{ getArticles?.title }}</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="orange-lighten-2" variant="text"> 展开评论 </v-btn>
              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text class="pa-0">
                  <v-card class="me-1 a" subtitle="评论于 2024.4.11" title="用户" variant="flat">
                    <template v-slot:prepend>
                      <v-avatar color="blue-darken-2">
                        <v-img
                          :src="getFileUrl(my.getMe.avatart)"
                          aspect-ratio="1"
                          class="bg-grey-lighten-2"
                          cover
                        >
                          <template v-slot:placeholder>
                            <v-row align="center" class="fill-height ma-0" justify="center">
                              <v-progress-circular
                                color="grey-lighten-5"
                                indeterminate
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <v-icon color="success" icon="mdi-check"></v-icon>
                    </template>
                    <v-card-text> 这是一条评论</v-card-text>
                  </v-card>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import type { Optionlist, Trend } from "@/type/index";
import { upTrends } from "@/api/index";
const { notify } = useNotification();
const my = useMystore();
const subLoading = ref<boolean>(false);
const ediotrRead = ref();
const articles = ref<
  {
    id: number;
    title: string;
  }[]
>([]);
const dayjs = useDayjs();
let now = dayjs().format("YYYY-MM-DD HH:mm");
const router = useRouter();
/**
 * @descripttion: 发布动态
 * @return {*}
 */
const trends = ref<Trend>({
  title: "",
  text: "",
  aboutArticle: null,
});
const show = ref(false);
const firstNameRules = [
  (value: string | any[]) => {
    if (value?.length >= 3) return true;
    return "标题必须至少包含3个字符。";
  },
];
const lastNameRules = [
  (value: string) => {
    if (value?.length < 400) return true;

    return "正文最多400字";
  },
];
const getArticles = computed(() => {
  return articles.value.find((element: { id: any }) => {
    return element.id == trends.value.aboutArticle;
  });
});
/**
 * @descripttion:发布动态
 * @return {*}
 */
function submitTrend(): void {
  let id = my.getMe.id;
  subLoading.value = true;
  if (!~id) {
    notify({
      text: "请先登录",
      type: "error",
    });
    return;
  }
  upTrends(trends.value, id)
    .then((data) => {
      notify({
        text: "发布成功",
        type: "success",
      });
      router.push({
        path: "/",
      });
    })
    .finally(() => {
      subLoading.value = false;
    });
}
//初始化
my.getArticleslist().then((data: Optionlist[] | undefined) => {
  if (data) {
    articles.value = data;
  }
});
</script>
<style lang="scss">
.trends {
  .trends-content {
    min-height: 400px;
    .a {
      $card-title-font-size: 12px;
    }
    .v-row {
      min-height: 400px;
    }
  }
}
</style>
