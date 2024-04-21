<template>
  <v-overlay
    v-model="overlay"
    class="flex items-center justify-center"
    hide-overlay
    :opacity="0.4"
    persistent
    disabled
  >
    <v-sheet class="rounded-lg w-100vw overflow-y-auto h-100vh lg:w-80vw lg:h-90vh relative">
      <v-container class="pa-0 p-x-20px h-100% w-100%!">
        <v-row class="ma-0 h-100% w-100%!">
          <v-col cols="12" :md="7" class="flex align-center w-max">
            <v-carousel progress="primary" class="h-max w-max" hide-delimiters v-if="ArticleInfo">
              <v-carousel-item
                v-for="item of ArticleInfo?.article.attributes.imgs.data"
                cover
                class="h-max w-max flex align-center"
                :key="item.id"
                loading
              >
                <v-img
                  :lazy-src="getFileUrl(item.attributes, 'large')"
                  :src="getFileUrl(item.attributes, 'large')"
                  aspect-ratio="1"
                  height="100%"
                  class="bg-grey-lighten-2"
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
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="12" :md="5" class="pa-0">
            <v-card
              variant="flat"
              class="p-x-16px! h-100% lg:p-x-0px!"
              :subtitle="getTime(ArticleInfo?.article.attributes.createdAt)"
              :title="ArticleInfo?.article.attributes.publisher.data.attributes.username"
            >
              <template v-slot:prepend>
                <v-avatar color="blue-darken-2">
                  <v-img
                    :src="
                      getFileUrl(
                        ArticleInfo?.article.attributes.publisher.data.attributes.avatart.data
                          .attributes
                      )
                    "
                  ></v-img>
                </v-avatar>
              </template>
              <template v-slot:append>
                <v-btn icon="$close" color="primary" variant="text" @click="close"></v-btn>
              </template>
              <v-card-title>{{ ArticleInfo?.article.attributes.title }}</v-card-title>
              <v-card-text> {{ ArticleInfo?.article.attributes.introduction }}</v-card-text>
              <v-card-actions>
                <v-btn variant="text" color="primary" prepend-icon="mdi-pound"> </v-btn>
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
                <div v-show="show" class="p-x-8px">
                  <v-divider class="m-y-10px"></v-divider>
                  <v-sheet>
                    <v-text-field
                      v-model="comment"
                      append-inner-icon="mdi-draw-pen"
                      density="compact"
                      label="发表评论"
                      variant="solo-filled"
                      hide-details
                      single-line
                      @keyup.enter="putComment"
                      @click:append-inner="putComment"
                    ></v-text-field>
                  </v-sheet>
                  <v-infinite-scroll class="h-100% md:h-350px m-t-16px" @load="load" mode="manual">
                    <div>
                      <template
                        v-for="item in ArticleInfo?.article.attributes.comment_cs.data"
                        :key="item.id"
                      >
                        <v-card
                          class="me-1 comment"
                          variant="flat"
                          :title="item.attributes.users_permissions_user.data.attributes.username"
                          :subtitle="getTime(item.attributes.createdAt)"
                        >
                          <template v-slot:prepend>
                            <v-avatar color="blue-darken-2" :size="32">
                              <v-img
                                :src="
                                  getFileUrl(
                                    item.attributes.users_permissions_user.data.attributes.avatart
                                      .data.attributes
                                  )
                                "
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
                            <v-chip
                              class="fs-sm"
                              v-if="
                                item.attributes.users_permissions_user.data.id ==
                                ArticleInfo?.article.attributes.publisher.data.id
                              "
                            >
                              作者
                            </v-chip>
                          </template>

                          <v-card-text>{{ item.attributes.content }} </v-card-text>
                          <v-card-actions class="px-4" color="primary">
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
                      </template>
                    </div>

                    <template v-slot:load-more="{ props }">
                      <v-btn icon="mdi-refresh" size="small" variant="text" v-bind="props"></v-btn>
                    </template>
                  </v-infinite-scroll>
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
import { getArticleInfo } from "@/api/index";
import type { ArticleInfo, Comment } from "@/type/index";
import { Article } from "@/class/index";

const overlay = ref<boolean>(true);
const route = useRoute();
const router = useRouter();
const comment = ref<string>();
const show = ref(false);
const ArticleInfo = ref<Article>();

/**
 * @descripttion:关闭详情页
 * @return {*}
 */
function close(): void {
  router.back();
}

/**
 * @descripttion: 加载更多的评论
 * @param {*} done
 * @return {*}
 */
function load({ done }: any): void {
  done("ok");
}

/**
 * @descripttion: 发表评论
 * @return {*}
 */
function putComment(): void {
  ArticleInfo.value?.commentDo(comment.value);
}

getArticleInfo(route.params.articleId as string).then((data) => {
  ArticleInfo.value = new Article(data.data);
});
</script>
<style lang="scss" scoped></style>
