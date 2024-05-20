<template>
  <v-timeline align="start">
    <v-timeline-item
      v-for="(node, i) in list"
      dot-color="primary"
      class="mb-12"
      fill-dot
      :key="node.id"
      size="small"
    >
      <template v-slot:opposite>
        <div :class="`pt-1 headline text-subtitle-1`">
          {{ getTime(node.createdAt) }}
          <span class="text-subtitle-2 font-normal opacity-[var(--v-medium-emphasis-opacity)]"
            >发布了动态</span
          >
        </div>
      </template>
      <v-card
        :subtitle="getTime(node.createdAt)"
        :title="node.title"
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
            v-if="node.aboutArticle"
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
  comment_cs: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    users_permissions_user: {
      id: number;
      username: string;
      avatart?: FileObj;
    };
  }[];
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
const props = defineProps<{
  list: trendList[];
}>();
const router = useRouter();
const { list } = toRefs(props);
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

const years = [
  {
    color: "cyan",
    year: "1960",
  },
  {
    color: "green",
    year: "1970",
  },
  {
    color: "pink",
    year: "1980",
  },
  {
    color: "amber",
    year: "1990",
  },
  {
    color: "orange",
    year: "2000",
  },
];
</script>
<style lang="scss"></style>
