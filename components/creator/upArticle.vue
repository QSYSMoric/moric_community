<template>
  <v-card min-height="400" class="pa-4 trends">
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
              <v-textarea
                v-model="articleForm.receiver.content"
                :rules="lastNameRules"
                clearable
                label="写你所想"
                auto-grow
                variant="solo-filled"
                bg-color="grey-lighten-5"
                color="primary"
                counter
              ></v-textarea>
              <label class="label text-grey-darken-2">选择你的分类</label>
              <v-select
                v-model="articleForm.receiver.classification"
                :items="classificationList"
                :item-props="classificationProps"
                prepend-inner-icon="mdi-pound"
                item-value="id"
                color="primary"
              />
              <label class="label text-grey-darken-2">选择文章的标签</label>
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
              />
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
                >提交你的动态</v-btn
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
              <v-btn color="primary">阅读</v-btn>
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
</template>

<script setup lang="ts">
import type { Classification, Labels, Article, Form } from "@/type/index";
import { UploadFileCommand } from "@/class/UploadFileCommand";
const my = useMystore();
const config = useConfigstore();
const coverFile = ref<File[]>([]);
const imgFiles = ref<File[]>([]);
const coverTempUrl = ref<string>("https://cdn.vuetifyjs.com/images/cards/house.jpg");
let coverFiledCommand: UploadFileCommand = new UploadFileCommand([]);
let imgsFiledCommand: UploadFileCommand = new UploadFileCommand([]);
/**
 * @descripttion: 分类列表
 * @return {*}
 */
const classificationList = ref<Classification[]>([]);
const classificationProps = function (item: Classification) {
  return {
    title: item.attributes.title,
    value: {
      id: item.id,
      attributes: {
        title: item.attributes.title,
      },
    },
  };
};
/**
 * @descripttion:设置封面命令
 * @param {*} files
 * @return {*}
 */
function setCoverFiles(files: File[]): void {
  coverFiledCommand = new UploadFileCommand(files);
  if (files.length) {
    coverTempUrl.value = coverFiledCommand.receiver[0].url!;
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
  imgsFiledCommand = new UploadFileCommand(files);
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
    console.log("表单提交成功");
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
    return lavelList?.attributes.labels.data;
  }
  return [];
});
const labelProps = function (item: Labels) {
  return {
    title: item.attributes.title,
    value: {
      id: item.id,
      attributes: {
        title: item.attributes.title,
      },
    },
  };
};

watch(
  () => {
    return articleForm.value.receiver.classification;
  },
  () => {
    articleForm.value.receiver.labels.length = 0;
  }
);
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
  Promise.all([coverFiledCommand.execute(), imgsFiledCommand.execute()]).then((data) => {
    console.log(2);
    articleForm.value.execute();
  });
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
</style>
