<template>
  <v-container class="w-100% min-h-[calc(100vh-90px)] max-w-100%!" fluid>
    <v-row>
      <v-sheet class="w-100%">
        <v-container class="max-w-100%!">
          <ClientOnly>
            <v-row class="gap-4 relative" v-if="basicForm.readState">
              <v-avatar :size="200" rounded="0" class="rounded-lg">
                <v-img
                  v-if="coverFiledCommand.receiver.length"
                  :src="coverFiledCommand.receiver[0].url"
                  cover
                ></v-img>
              </v-avatar>
              <v-col cols="12" md="9" class="py-2 bg-[rgba(var(--v-theme-surface))]! rounded-lg">
                <div class="text-h3">{{ myself.getMe.username }}</div>
                <v-sheet class="m-t-2 d-flex">
                  <span class="text-caption d-flex align-center">
                    账号：{{ myself.getMe.email }}
                  </span>
                  <div class="w-1px m-x-8px bg-black"></div>
                  <v-chip
                    size="small"
                    class="ma-0"
                    :color="getGender.color"
                    :prepend-icon="getGender.icon"
                  >
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
                    {{
                      myself.getMe.birthday
                        ? day(myself.getMe.birthday).format("YYYY-MM-DD")
                        : "保密"
                    }}
                  </v-chip>
                </v-sheet>
                <v-card variant="text" class="m-t-2">
                  <v-card-title class="pa-0 text-subtitle-1 font-normal!"> 擅长领域 </v-card-title>
                  <v-card-text class="px-0 d-flex gap-2 py-2">
                    <v-chip
                      size="small"
                      v-if="myself.getMe"
                      v-for="item of myself.getMe.excels"
                      :key="item.id"
                    >
                      {{ item.title }}
                    </v-chip>
                  </v-card-text>
                </v-card>
                <v-sheet class="m-t-2">
                  <div>个人说明</div>
                  <v-card variant="tonal" max-width="600" class="my-2">
                    <v-card-text class="px-2 py-2">
                      <p class="text-body-2">
                        {{ myself.getMe.introduction ? myself.getMe.introduction : "暂无内容" }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-sheet>
                <v-sheet class="flex! gap-16px!">
                  <span class="text-caption"> 0 关注 </span>
                  <span class="text-caption"> 32 粉丝 </span>
                  <span class="text-caption"> 908 获赞与收藏 </span>
                </v-sheet>
              </v-col>
              <v-sheet class="absolute right-10px top-0px">
                <v-btn color="primary" @click="basicForm.switchState" variant="plain"> 编辑 </v-btn>
              </v-sheet>
            </v-row>
            <v-form v-else>
              <v-row class="relative">
                <v-col cols="12" sm="4" md="3">
                  <v-card>
                    <v-card-title>
                      <v-img
                        class="rounded-lg"
                        v-if="coverFiledCommand.receiver.length"
                        :src="coverFiledCommand.receiver[0].url"
                        cover
                      ></v-img>
                    </v-card-title>
                    <v-card-text>
                      <v-file-input
                        accept="image/*"
                        color="primary"
                        @update:modelValue="setCoverFiles"
                        label="上传头像"
                      ></v-file-input>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="8" md="9">
                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      :counter="10"
                      v-model="basicForm.data.username"
                      label="昵称"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <label class="label text-grey-darken-2">性别</label>
                    <v-radio-group v-model="basicForm.data.sex" inline>
                      <v-radio color="#9E9E9E" label="保密" value="confidential"></v-radio>
                      <v-radio color="#2196F3" label="男" value="female"></v-radio>
                      <v-radio color="#E91E63" label="女" value="male"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <label class="label text-grey-darken-2">生日</label>
                    <v-date-picker
                      class="mt-2"
                      title="选择生日"
                      v-model="time"
                      :header="day().format('YYYY-MM-DD')"
                      show-adjacent-months
                      color="primary"
                    ></v-date-picker>
                  </v-col>
                  <v-col cols="12" class="py-0 mt-4">
                    <label class="label text-grey-darken-2">擅长领域</label>
                    <v-select
                      v-model="basicForm.data.excels"
                      :items="classificationList"
                      prepend-inner-icon="mdi-pound"
                      color="primary"
                      item-value="id"
                      chips
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="py-0 mt-4">
                    <label class="label text-grey-darken-2">个人说明</label>
                    <v-textarea
                      v-model="basicForm.data.introduction"
                      class="mt-2"
                      variant="solo-filled"
                    ></v-textarea>
                  </v-col>
                </v-col>
                <v-col cols="12">
                  <v-btn class="mt-2" @click="basicForm.submit" color="primary" block>
                    保存提交
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-row class="mt-4">
              <v-col class="d-flex items-center justify-between">
                <div class="text-h6">个人详细信息</div>
                <v-btn
                  v-if="detailedForm.readState"
                  color="primary"
                  @click="detailedForm.switchState"
                  variant="plain"
                >
                  编辑
                </v-btn>
                <v-btn v-else color="primary" @click="detailedForm.submit" variant="plain">
                  保存
                </v-btn>
              </v-col>
            </v-row>
          </ClientOnly>
          <ClientOnly>
            <v-row v-if="detailedForm.readState">
              <v-col>
                <Editor
                  v-model="detailedForm.data.explain"
                  ref="ediotrRead"
                  class="outline-none"
                  placeholder="暂无内容"
                  :api-key="editorConfig.apiKey"
                  :init="editorConfig.readInit"
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                />
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <Editor
                  v-model="detailedForm.data.explain"
                  ref="ediotrRead"
                  :api-key="editorConfig.apiKey"
                  :init="editorConfig.editInit"
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                />
              </v-col>
            </v-row>
          </ClientOnly>
          <v-row class="mt-4">
            <v-col cols="12">
              <div class="text-h6">我的发布</div>
            </v-col>
            <v-col cols="12">
              <v-card class="w-100%" variant="text">
                <v-card-title class="pa-0">
                  <v-btn-toggle
                    v-model="select"
                    size="small"
                    color="primary"
                    mandatory
                    rounded="1"
                    group
                  >
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
                      <IndexPerCenterArticTable />
                    </v-window-item>
                    <v-window-item key="1">
                      <v-card variant="text" class="pa-1">
                        <IndexPerCenterTrend :list="myself.getMe.trends" />
                      </v-card>
                    </v-window-item>
                  </v-window>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { UploadFileCommand } from "@/class/UploadFileCommand";
import type { Classification, FileObj } from "~/type";
import { upDataMeInfo } from "@/api/index";
let coverFiledCommand: Ref<UploadFileCommand> = ref(new UploadFileCommand([]));
const myself = useMystore();
const select = ref(0);
const day = useDayjs();
const time = ref<Date>(new Date());
const coverTempUrl = ref<string>("/imgs/defaut.png");
const config = useConfigstore();
const { notify } = useNotification();

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
  if (myself.getMe.sex) {
    return gender[myself.getMe.sex];
  } else {
    return gender["confidential"];
  }
});
/**
 * @descripttion: 个人基本信息
 * @return {*}
 */
const basicForm = ref<{
  readState: boolean;
  switchState: () => void;
  submit: () => void;
  data: {
    username: string;
    sex: "confidential" | "male" | "female";
    birthday?: string;
    avatart?: FileObj;
    introduction?: string;
    excels: {
      id: number;
      title: string;
    }[];
  };
}>({
  readState: true,
  data: {
    username: "",
    sex: "confidential",
    birthday: "",
    excels: [],
    introduction: "",
  },
  switchState() {
    basicForm.value.readState = false;
  },
  submit() {
    basicForm.value.readState = true;
    basicForm.value.data.birthday = day(time.value).format();
    coverFiledCommand.value.execute().then((data) => {
      if (data.length) {
        basicForm.value.data.avatart = data[0];
      }
      upDataMeInfo(basicForm.value.data).then(() => {
        basicForm.value.data.excels = classificationList.value.map((element) => {
          return {
            id: element.id,
            title: element.title,
          };
        });
        myself.setBasicMsg(basicForm.value.data);
        notify({
          title: "成功",
          text: "保存成功",
          type: "success",
        });
      });
    });
  },
});

/**
 * @descripttion: 分类列表
 * @return {*}
 */
const classificationList = ref<
  {
    id: number;
    title: string;
  }[]
>([]);

await config.getClassification().then((data: Classification[]) => {
  classificationList.value = data.map((element) => {
    return {
      id: element.id,
      title: element.attributes.title,
    };
  });
});
/**
 * @descripttion: 个人详细信息
 * @return {*}
 */
const detailedForm = ref<{
  readState: boolean;
  data: {
    explain?: string;
  };
  switchState: () => void;
  submit: () => void;
}>({
  readState: true,
  switchState() {
    detailedForm.value.readState = false;
  },
  submit() {
    detailedForm.value.readState = true;
    upDataMeInfo(detailedForm.value.data).then(() => {
      notify({
        title: "成功",
        text: "保存成功",
        type: "success",
      });
    });
  },
  data: {
    explain: "",
  },
});

myself.getUserInforAsync().then((data) => {
  if (data) {
    const { username, sex, birthday, avatart, excels, introduction, explain } = data;
    if (avatart) coverFiledCommand.value.addFileObj([avatart]);
    time.value = day(birthday).toDate();
    basicForm.value.data = {
      username: username,
      sex: sex,
      birthday: birthday,
      excels: excels,
      introduction: introduction,
    };
    if (explain) {
      detailedForm.value.data.explain = explain;
    }
  }
});
</script>
<style lang="scss" scoped></style>
