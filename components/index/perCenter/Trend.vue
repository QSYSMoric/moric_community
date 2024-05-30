<template>
  <v-timeline align="start">
    <v-timeline-item
      v-for="(node, i) of trendList"
      dot-color="primary"
      class="mb-12"
      :key="node.id"
      size="small"
    >
      <template v-slot:opposite>
        <v-card variant="text">
          <v-card-text>
            <div class="pt-1 headline text-subtitle-1 mb-2">
              {{ getTime(node.createdAt) }}
              <span class="text-subtitle-2 font-normal opacity-[var(--v-medium-emphasis-opacity)]">
                发布了动态
              </span>
            </div>
            <v-dialog transition="dialog-bottom-transition" width="auto">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="w-100px!"
                  v-bind="activatorProps"
                  prepend-icon="mdi-delete"
                  color="error"
                  size="small"
                >
                  删除动态
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-toolbar title="要删除吗？"></v-toolbar>
                  <v-card-text>
                    确定删除你的动态:
                    <span class="font-semibold color-[rgba(var(--v-theme-primary))]">
                      《{{ node.title }}》
                    </span>
                    吗?
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn color="red" @click="deleteTrendItem(node.id)">确认</v-btn>
                    <v-btn @click="isActive.value = false">取消</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-text>
        </v-card>
      </template>
      <v-card
        :subtitle="getTime(node.createdAt)"
        :title="node.title"
        class="max-w-500px"
        transition="scroll-y-reverse-transition"
      >
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-img :src="getFileUrl(node.users_permissions_user.avatart)"></v-img>
          </v-avatar>
        </template>
        <v-card-text class="text-body-1">
          <Editor
            ref="ediotrRead"
            v-model="node.text"
            :api-key="editorConfig.apiKey"
            :init="editorConfig.readInit"
          />
          <v-card
            v-if="node.aboutArticle.id"
            class="m-t-16px bg-[rgba(var(--v-theme-subContent))]!"
            variant="text"
          >
            <template v-slot:title>
              <div class="d-flex align-center flex-row">
                <v-avatar size="x-small">
                  <v-img :src="getFileUrl(node.aboutArticle.publisher.avatart)"> </v-img>
                </v-avatar>
                <p class="font-size-15px font-400 ml-1">
                  {{ node.aboutArticle.publisher.username }}
                </p>
                <p class="font-size-15px font-400 ml-2 text-medium-emphasis">投稿了文章</p>
              </div>
            </template>
            <v-container class="p-t-0!" @click="goAttributesInfo(node.aboutArticle.id)">
              <v-hover v-slot="{ isHovering, props }">
                <v-row class="min-h-200px rounded-sm" no-gutters>
                  <v-col cols="12" sm="6" v-bind="props" class="h-100%">
                    <v-img
                      cover
                      :aspect-ratio="1"
                      class="h-100% w-100% rounded-l-sm align-end max-h-200px! d-flex"
                      :src="getFileUrl(node.aboutArticle.cover)"
                    >
                      <v-overlay
                        :model-value="isHovering"
                        class="align-center justify-center"
                        contained
                      >
                        <v-btn color="primary">查看文章</v-btn>
                      </v-overlay>
                    </v-img>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card
                      variant="text"
                      class="h-100%! cursor-pointer group bg-[rgba(var(--v-theme-subContentInfo))]! rounded-l-0! rounded-r-sm!"
                    >
                      <v-card-title>
                        <Ellipsis
                          :autoResize="true"
                          class="font-400 truncate group-hover:color-[rgba(var(--v-theme-primary))]"
                          :text="node.aboutArticle.title"
                          :max-lines="1"
                        />
                      </v-card-title>
                      <v-card-text color="info" class="text-medium-emphasis text-wrap min-h-95px">
                        <Ellipsis :text="node.aboutArticle.introduction" :max-lines="5" />
                      </v-card-text>
                      <template #actions>
                        <div class="text-caption pa-2">
                          {{ getTime(node.aboutArticle.createdAt) }}
                        </div>
                      </template>
                    </v-card>
                  </v-col>
                </v-row>
              </v-hover>
            </v-container>
          </v-card>
          <v-card v-else variant="text">
            <v-card-text class="m-t-16px bg-[rgba(var(--v-theme-subContent))]!" variant="text">
              <v-alert
                density="compact"
                text="原文章已删除请查看其他内容"
                title="错误"
                type="error"
              ></v-alert>
            </v-card-text>
          </v-card>
        </v-card-text>
        <template v-slot:append>
          <div class="justify-self-end">
            <v-icon class="me-1" icon="mdi-heart" color="deep-orange" :size="16"></v-icon>
            <span class="subheading me-2 fs-sm">{{ node.likeUsers.length }}</span>
          </div>
        </template>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import type { FileObj } from "~/type/api";
import { getMyTrendList } from "@/api/index";

const { notify } = useNotification();
/**
 * @descripttion:动态列表
 * @return {*}
 */
interface trendList {
  id: number;
  title: string;
  text: string;
  users_permissions_user: {
    id: number;
    username: string;
    avatart: FileObj;
  };
  likeUsers: {
    id: number;
    username: string;
  }[];
  aboutArticle: {
    id: number;
    title: string;
    introduction: string;
    createdAt: string;
    cover: FileObj;
    publisher: {
      id: number;
      username: string;
      avatart: FileObj;
    };
  };
  createdAt: string;
}

const trendList = ref<trendList[]>([]);

getMyTrendList().then((data) => {
  if (data.data) {
    trendList.value = data.data.map((element) => {
      return {
        createdAt: element.attributes.createdAt,
        id: element.id,
        title: element.attributes.title,
        text: element.attributes.text,
        users_permissions_user: {
          id: element.attributes.users_permissions_user.data.id,
          username: element.attributes.users_permissions_user.data.attributes.username,
          avatart:
            element.attributes.users_permissions_user.data.attributes.avatart.data.attributes,
        },
        likeUsers: element.attributes.likeUsers.data.map((element) => {
          return {
            id: element.id,
            username: element.attributes.username,
          };
        }),
        aboutArticle: {
          id: element.attributes.aboutArticle.data?.id,
          title: element.attributes.aboutArticle.data?.attributes.title,
          introduction: element.attributes.aboutArticle.data?.attributes.introduction,
          createdAt: element.attributes.aboutArticle.data?.attributes.createdAt,
          cover: element.attributes.aboutArticle.data?.attributes.cover.data.attributes,
          publisher: {
            id: element.attributes.aboutArticle.data?.attributes.publisher.data.id,
            username:
              element.attributes.aboutArticle.data?.attributes.publisher.data.attributes.username,
            avatart:
              element.attributes.aboutArticle.data?.attributes.publisher.data.attributes.avatart
                .data.attributes,
          },
        },
      };
    });
  }
});
const router = useRouter();

const myself = useMystore();
myself.linkUserInfo();
/**
 * @descripttion:删除动态
 * @param {*} trendId
 * @return {*}
 */
function deleteTrendItem(trendId: number): void {
  let index = trendList.value.findIndex((element) => {
    return element.id == trendId;
  });
  if (!~index) {
    return;
  }
  trendList.value.splice(index, 1);
  myself
    .deleteTrendItem(trendId)
    .then(() => {
      notify({
        title: "成功",
        text: "删除成功",
        type: "success",
      });
    })
    .catch(() => {
      notify({
        title: "失败",
        text: "删除失败",
        type: "error",
      });
    });
}

/**
 * @descripttion:前往文章详情页
 * @return {*}
 */
function goAttributesInfo(articleId: number | undefined): void {
  router.push({
    path: `/${articleId}`,
  });
}
/**
 * @descripttion: 返回时间格式
 * @param {*} date
 * @return {*}
 */
function getTime(date: string): string {
  const dayjs = useDayjs();
  let now = dayjs(date).format("YYYY-MM-DD HH:mm");
  return now;
}
</script>
<style lang="scss"></style>
