<template>
  <v-container fluid class="home-article">
    <v-row>
      <v-col :cols="12" :md="8">
        <v-list>
          <v-list-item v-for="(item, index) of trends" class="mb-4" :key="index">
            <v-card :subtitle="getTime(item.trend.attributes.updatedAt)" :title="item.trend.attributes.title"
              transition="scroll-y-reverse-transition">
              <template v-slot:prepend>
                <v-avatar color="blue-darken-2">
                  <v-img :src="getFileUrl(
                    item.trend.attributes.users_permissions_user.data.attributes.avatart.data
                      ?.attributes
                  )
                    "></v-img>
                </v-avatar>
              </template>
              <v-card-text class="text-body-1">
                <Editor ref="ediotrRead" v-model="item.trend.attributes.text" :api-key="editorConfig.apiKey"
                  :init="editorConfig.readInit" />
                <v-card v-if="item.trend.attributes.aboutArticle?.data"
                  class="m-t-16px bg-[rgba(var(--v-theme-subContent))]!" variant="text">
                  <template v-slot:title>
                    <div class="d-flex align-center flex-row">
                      <v-avatar size="x-small">
                        <v-img :src="getFileUrl(
                          item.trend.attributes.aboutArticle.data.attributes.publisher.data
                            .attributes.avatart?.data?.attributes
                        )
                          ">
                        </v-img>
                      </v-avatar>
                      <p class="font-size-15px font-400 ml-1">
                        {{
                          item.trend.attributes.aboutArticle.data.attributes.publisher.data
                            .attributes.username
                        }}
                      </p>
                      <p class="font-size-15px font-400 ml-2 text-medium-emphasis">投稿了文章</p>
                    </div>
                  </template>
                  <v-container class="p-t-0!" @click="goAttributesInfo(item.trend.attributes.aboutArticle.data?.id)">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-row class="min-h-200px rounded-sm" no-gutters>
                        <v-col cols="12" sm="6" v-bind="props" class="h-100%">
                          <v-img cover :aspect-ratio="1"
                            class="h-100% w-100% rounded-l-sm align-end max-h-200px! d-flex" :src="getFileUrl(
                              item.trend.attributes.aboutArticle.data.attributes.cover.data
                                .attributes
                            )
                              ">
                            <v-overlay :model-value="isHovering" class="align-center justify-center" contained>
                              <v-btn color="primary">查看文章</v-btn>
                            </v-overlay>
                          </v-img>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-card variant="text"
                            class="h-100%! cursor-pointer group bg-[rgba(var(--v-theme-subContentInfo))]! rounded-l-0! rounded-r-sm!">
                            <template #title>
                              <Ellipsis class="font-400 group-hover:color-[rgba(var(--v-theme-primary))]"
                                :text="item.trend.attributes.aboutArticle.data.attributes.title" :max-lines="1" />
                            </template>
                            <v-card-text color="info" class="text-medium-emphasis text-wrap min-h-95px">
                              <Ellipsis :text="item.trend.attributes.aboutArticle.data.attributes.introduction
                                " :max-lines="5" />
                            </v-card-text>
                            <template #actions>
                              <div class="text-caption pa-2">
                                {{
                                  getTime(
                                    item.trend.attributes.aboutArticle.data.attributes.createdAt
                                  )
                                }}
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
                  <span class="subheading me-2 fs-sm">{{
                    item.trend.attributes.likeUsers.data.length
                  }}</span>
                </div>
              </template>
              <v-card-actions>
                <v-container>
                  <v-row justify="end">
                    <v-btn :prepend-icon="item.isLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'" @click="() => {
                        item.likeDo();
                      }
                      " :color="item.isLiked ? 'deep-orange' : 'primary'">
                      点赞
                    </v-btn>
                    <v-btn prepend-icon="mdi-comment-processing-outline" @click="() => {
                        item.switchCommentStatus();
                      }
                      " color="primary">
                      评论
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-actions>
              <v-expand-transition>
                <div v-if="item.doYouWantToOpenComments">
                  <v-divider></v-divider>
                  <v-sheet class="pa-2">
                    <v-text-field v-model="comment" append-inner-icon="mdi-draw-pen" density="compact" label="发表评论"
                      variant="solo-filled" hide-details single-line @keyup.enter="() => {
                          item.commentDo(comment);
                        }
                        " @click:append-inner="() => {
                          item.commentDo(comment);
                        }
                        "></v-text-field>
                  </v-sheet>
                  <v-list lines="two" v-auto-animate>
                    <v-list-subheader>最新评论</v-list-subheader>
                    <v-infinite-scroll height="300" mode="manual" @load="load">
                      <template v-for="commont of item.trend.attributes.comment_cs.data" :key="commont.id">
                        <v-sheet>
                          <v-list-item :title="commont.attributes.users_permissions_user.data.attributes.username
                            ">
                            <template #prepend>
                              <v-avatar :size="32">
                                <v-img cover :src="getFileUrl(
                                  commont.attributes.users_permissions_user.data.attributes
                                    .avatart.data?.attributes
                                )
                                  "></v-img>
                              </v-avatar>
                            </template>
                            <template #append>
                              <v-list-item-action class="text-body-2 text-medium-emphasis">
                                {{ getTime(commont.attributes.updatedAt) }}
                              </v-list-item-action>
                            </template>
                            <v-sheet>
                              {{ commont.attributes.content }}
                            </v-sheet>
                          </v-list-item>
                          <v-divider inset></v-divider>
                        </v-sheet>
                      </template>
                      <template v-slot:empty>
                        <v-alert type="warning">没有更多评论啦!</v-alert>
                      </template>
                      <template v-slot:load-more="{ props }">
                        <v-btn icon="mdi-refresh" size="small" variant="text" v-bind="props"></v-btn>
                      </template>
                    </v-infinite-scroll>
                  </v-list>
                </div>
              </v-expand-transition>
            </v-card>
          </v-list-item>
        </v-list>
        <v-row justify="center" class="my-2">
          <v-btn variant="tonal" prepend-icon="mdi-dots-horizontal">加载更多</v-btn>
        </v-row>
      </v-col>
      <v-col :cols="12" :md="3" class="d-none d-md-block d-xl-none">
        <v-card class="mx-auto">
          <v-list density="compact">
            <v-list-subheader>过滤</v-list-subheader>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" class="overflow-x-hidden">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              {{ item.text }}
            </v-list-item>
          </v-list>
          <v-list density="compact">
            <v-list-subheader>热门话题</v-list-subheader>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" class="overflow-x-hidden">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              {{ item.text }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getHomeTrends } from "@/api/index";
import type { TrendHome, Comment_cs } from "@/type/index";
import { Trend } from "@/class/Trend";

const router = useRouter();
const classificationProps = function (item: Comment_cs) {
  return {};
};
/**
 * @descripttion: 加载更多的评论
 * @param {*} done
 * @return {*}
 */
function load({ done }: { done: Function }): void {
  done("empty");
}
/**
 * @descripttion:前往文章详情页
 * @return {*}
 */
function goAttributesInfo(articleId: number | undefined): void {
  if (!articleId) {
    return;
  }
  router.push({
    path: `/${articleId}`,
  });
}
const comment = ref<string>();
const trends = ref<Trend[]>([]);
const items = ref([
  { text: "最新发布", icon: "mdi-clock" },
  { text: "明星博主", icon: "mdi-account" },
  { text: "最高点赞", icon: "mdi-flag" },
]);
getHomeTrends().then((data) => {
  trends.value = data.data.map((element: TrendHome) => {
    return new Trend(element);
  });
});
</script>
<style lang="scss">
.home-article {
  min-height: 100vh;

  .v-list-item__content {
    overflow: visible;
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
}
</style>
