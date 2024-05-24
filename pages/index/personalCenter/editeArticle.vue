<template>
  <v-card min-height="400" class="pa-4 upArticle">
    <v-container class="ma-0 pa-0 trends-content">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-h5 px-4">分享你的日常</div>
          <v-card variant="flat" class="mt-4">
            <v-form fast-fail class="trends-form pa-4 pt-3">
              <label class="label text-grey-darken-2">标题</label>
              <v-text-field
                v-model="articleForm.receiver.title"
                :rules="firstNameRules"
              ></v-text-field>
              <label class="label text-grey-darken-2">简介</label>
              <v-textarea
                v-model="articleForm.receiver.introduction"
                clearable
                label="简述你的作品"
                auto-grow
                variant="solo-filled"
                rows="3"
                bg-color="grey-lighten-6"
                color="primary"
                counter
              ></v-textarea>
              <label class="label text-grey-darken-2">正文</label>
              <ClientOnly>
                <Editor
                  ref="ediotrRead"
                  v-model="articleForm.receiver.content"
                  :api-key="editorConfig.apiKey"
                  :init="editorConfig.editInit"
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                />
              </ClientOnly>
              <label class="label text-grey-darken-2 mt-4">选择你的分类</label>
              <v-select
                v-model="articleForm.receiver.classification"
                @update:modelValue="
                  () => {
                    articleForm.receiver.labels.length = 0;
                  }
                "
                :items="classificationList"
                :item-props="classificationProps"
                prepend-inner-icon="mdi-pound"
                item-value="id"
                item-title="title"
                color="primary"
                return-object
              />

              <!-- <label class="label text-grey-darken-2">选择文章的标签</label>
              <v-select
                v-model="articleForm.receiver.labels"
                :items="getLabelList"
                :item-props="labelProps"
                item-title="title"
                prepend-inner-icon="mdi-label-multiple-outline"
                item-value="id"
                color="primary"
                chips
                multiple
                return-object
              /> -->
              <label class="label text-grey-darken-2">上传封面</label>
              <v-file-input
                label="为你的文章选件衣服吧"
                v-model="coverFile"
                accept="image/*"
                @update:modelValue="setCoverFiles"
                prepend-icon="mdi-bus-stop-covered"
                color="primary"
              >
                <template v-slot:selection="{ fileNames }">
                  <template v-for="fileName in fileNames" :key="fileName">
                    <v-chip class="me-2" color="primary" size="small" label>
                      {{ fileName }}
                    </v-chip>
                  </template>
                </template>
              </v-file-input>
              <label class="label text-grey-darken-2">上传你的图片</label>
              <v-file-input
                label="可上传多张图片"
                v-model="imgFiles"
                @update:modelValue="setImgsFiles"
                accept="image/*"
                color="primary"
                multiple
              ></v-file-input>
              <v-btn class="mt-1" color="primary" type="button" @click="submit" block
                >更新你的文章信息</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-h5">预览</div>
          <v-card class="mx-auto pa-0 mt-4">
            <v-img
              :src="coverTempUrl"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
              height="200px"
              cover
            >
              <v-card-title class="text-white overflow-x-hidden">
                {{ articleForm.receiver.title }}
                <v-chip
                  class="ma-2"
                  color="primary"
                  variant="flat"
                  prepend-icon="mdi-label-multiple-outline"
                  v-for="item of articleForm.receiver.labels"
                  :key="item.id"
                >
                  {{ item.attributes.title }}
                </v-chip>
              </v-card-title>
            </v-img>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="
                  () => {
                    articleShow = true;
                  }
                "
                >阅读</v-btn
              >
              <!-- mdi-pound -->
              <v-btn
                variant="text"
                color="primary"
                prepend-icon="mdi-pound"
                v-if="articleForm.receiver.classification"
              >
                {{ articleForm.receiver.classification.attributes.title }}
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn color="primary" icon="mdi-heart" size="small" variant="text"></v-btn>

              <v-btn color="primary" icon="mdi-bookmark" size="small" variant="text"></v-btn>

              <v-btn color="primary" icon="mdi-share-variant" size="small" variant="text"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-overlay
    v-model="overlay"
    class="align-center justify-center"
    hide-overlay
    close-on-content-click
    :opacity="0.4"
    persistent
    disabled
  >
    <v-progress-circular color="indigo" size="32" indeterminate />
  </v-overlay>
  <v-overlay
    v-model="articleShow"
    hide-overlay
    :opacity="0.4"
    persistent
    disabled
    class="flex items-center justify-center"
    content-class="align-center"
    :absolute="false"
  >
    <v-sheet class="rounded-lg w-100vw h-100vh m-card lg:w-80vw lg:h-90vh relative">
      <v-container style="height: 100%" class="pa-0 overflow-y-auto lg:overflow-y-hidden!">
        <v-row class="ma-0 h-100%">
          <v-col cols="12" md="7" class="h-100% flex items-center">
            <v-carousel hide-delimiters progress="primary">
              <v-carousel-item
                v-for="item of imgsFiledCommand.receiver"
                :src="item.url"
                :key="item.id"
              ></v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="12" md="5" class="pa-0 h-100%">
            <v-card
              variant="flat"
              class="p-x-16px! h-100% lg:p-x-0px! scroll-container overflow-y-auto!"
              :subtitle="now"
              :title="my.getMe.username"
            >
              <template v-slot:prepend>
                <v-avatar color="blue-darken-2">
                  <v-img :src="getFileUrl(my.getMe.avatart)"></v-img>
                </v-avatar>
              </template>
              <template v-slot:append>
                <v-btn
                  icon="$close"
                  color="primary"
                  variant="text"
                  @click="
                    () => {
                      articleShow = false;
                    }
                  "
                ></v-btn>
              </template>
              <v-card-title>{{ articleForm.receiver.title }} </v-card-title>
              <v-card-text>
                <ClientOnly>
                  <Editor
                    ref="ediotrRead"
                    v-model="articleForm.receiver.content"
                    :api-key="editorConfig.apiKey"
                    :init="editorConfig.readInit"
                  />
                </ClientOnly>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  variant="text"
                  color="primary"
                  prepend-icon="mdi-pound"
                  v-if="articleForm.receiver.classification"
                >
                  {{ articleForm.receiver.classification.attributes.title }}
                </v-btn>
                <v-btn
                  class="mx-1"
                  prepend-icon="mdi-map-marker-outline"
                  color="primary"
                  variant="text"
                >
                  上海
                </v-btn>
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
                  <v-card
                    class="me-1 comment"
                    variant="flat"
                    :title="my.getMe.username"
                    :subtitle="now"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="blue-darken-2" :size="32">
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
                      <v-chip class="fs-sm"> 作者 </v-chip>
                    </template>

                    <v-card-text> 这是一条评论 </v-card-text>
                    <v-card-actions class="px-4" color="primary">
                      {{ now_ }}
                      <v-btn
                        class="mx-1"
                        prepend-icon="mdi-map-marker-outline"
                        color="primary"
                        variant="text"
                      >
                        上海
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-overlay>
</template>

<script setup lang="ts">
import type { Classification, Labels, Article, Form, FileObj } from "@/type/index";
import { UploadFileCommand } from "@/class/UploadFileCommand";
import { updatedArticInfoByid, getArticleInfoByid } from "@/api/index";
const my = useMystore();
const route = useRoute();
const { articId } = route.query;
const { notify } = useNotification();
const config = useConfigstore();
const coverFile = ref<File[]>([]);
const imgFiles = ref<File[]>([]);
const show = ref(false);
const dayjs = useDayjs();
let now = dayjs().format("YYYY-MM-DD HH:mm");
let now_ = dayjs().format("YYYY-MM-DD");
const overlay = ref(false);
const articleShow = ref<boolean>(false);
const coverTempUrl = ref<string>("/imgs/defaut.png");
let coverFiledCommand: Ref<UploadFileCommand> = ref(new UploadFileCommand([]));
let imgsFiledCommand: Ref<UploadFileCommand> = ref(new UploadFileCommand([]));

/**
 * @descripttion: 分类列表
 * @return {*}
 */
const classificationList = ref<Classification[]>([]);
const classificationProps = function (item: Classification) {
  return {
    id: item.id,
    title: item.attributes.title,
  };
};
/**
 * @descripttion:设置封面命令
 * @param {*} files
 * @return {*}
 */
function setCoverFiles(files: File[]): void {
  coverFiledCommand.value.exceed(files[0]);
  if (files.length) {
    coverTempUrl.value = coverFiledCommand.value.receiver[0].url!;
  } else {
    coverTempUrl.value = "https://cdn.vuetifyjs.com/images/cards/house.jpg";
  }
}

/**
 * @descripttion: 设置imgs命令
 * @param {*} files
 * @return {*}
 */
function setImgsFiles(files: File[]): void {
  imgsFiledCommand.value = new UploadFileCommand(files);
}

/**
 * @descripttion: 文章表单
 * @return {*}
 */
const articleForm = ref<Form<Article>>({
  receiver: {
    title: "",
    content: "",
    imgs: [],
    introduction: "",
    classification: void 0,
    labels: [],
    cover: [],
  },
  execute: function (): void {
    updatedArticInfoByid(articId as unknown as number, articleForm.value.receiver).then((data) => {
      overlay.value = false;
      notify({
        title: "成功",
        text: "修改成功",
        type: "success",
      });
    });
  },
});

/**
 * @descripttion: 获取标签列表
 * @param {*} computed
 * @return {*}
 */
const getLabelList = computed(() => {
  if (articleForm.value.receiver.classification) {
    let lavelList = classificationList.value.find((element: Classification) => {
      return element.id == articleForm.value.receiver.classification!.id;
    });
    return lavelList?.attributes.labels?.data;
  }
  return [];
});
const labelProps = function (item: Labels) {
  return {
    id: item.id,
    title: item.attributes.title,
  };
};
getArticleInfoByid(articId as unknown as number).then((data) => {
  const { classification, content, imgs, introduction, labels, title, cover } =
    data.data!.attributes;
  articleForm.value.receiver.classification = classification.data;
  articleForm.value.receiver.content = content;
  articleForm.value.receiver.introduction = introduction;
  cover.data.attributes.id = cover.data.id;
  imgs.data.forEach((element) => {
    element.attributes.id = element.id;
  });
  articleForm.value.receiver.cover = [cover.data.attributes];
  articleForm.value.receiver.imgs = imgs.data.map((element) => {
    return element.attributes;
  });
  articleForm.value.receiver.labels = labels.data;
  articleForm.value.receiver.title = title;
  coverFiledCommand.value.addFileObj(articleForm.value.receiver.cover);
  imgsFiledCommand.value.addFileObj(articleForm.value.receiver.imgs);
  coverTempUrl.value = coverFiledCommand.value.receiver[0].url!;
});

/**
 * @descripttion: 标题校验
 * @return {*}
 */
const firstNameRules = [
  (value: string | any[]) => {
    if (value?.length >= 3) return true;
    return "标题必须至少包含3个字符。";
  },
];
/**
 * @descripttion:正文校验
 * @return {*}
 */
const lastNameRules = [
  (value: string) => {
    if (value?.length < 400) return true;
    return "正文最多400字";
  },
];

config.getClassification().then((data: Classification[]) => {
  classificationList.value = data;
});
/**
 * @descripttion: 提交表单
 * @return {*}
 */
function submit(): void {
  overlay.value = true;
  articleForm.value.receiver.classification = {
    id: articleForm.value.receiver.classification?.id!,
    attributes: {
      title: articleForm.value.receiver.classification?.attributes.title!,
    },
  };
  Promise.all([coverFiledCommand.value.execute(), imgsFiledCommand.value.execute()]).then(
    (data) => {
      const coverArray = data[0].filter((element: FileObj) => element !== undefined);
      const imgsArray = data[1].filter((element: FileObj) => element !== undefined);
      articleForm.value.receiver.cover = coverArray;
      articleForm.value.receiver.imgs = imgsArray;
      articleForm.value.execute();

      overlay.value = false;
    }
  );
}
</script>
<style lang="scss">
.trends {
  .trends-content {
    min-height: 400px;
    .v-row {
      min-height: 400px;
    }
  }
}
.article {
  max-width: 600px;
  max-height: 400px;
}
.align-center {
  display: flex;
  align-items: center;
}
</style>
