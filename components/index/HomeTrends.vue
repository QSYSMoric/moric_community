<template>
  <v-container fluid class="home-article">
    <v-row>
      <v-col :cols="9">
        <v-list>
          <v-list-item v-for="(item, index) of trends" class="mb-4" :key="index">
            <v-card
              :subtitle="getTime(item.trend.attributes.updatedAt)"
              :title="item.trend.attributes.title"
              transition="scroll-y-reverse-transition"
            >
              <template v-slot:prepend>
                <v-avatar color="blue-darken-2">
                  <v-img
                    :src="
                      getFileUrl(
                        item.trend.attributes.users_permissions_user.data.attributes.avatart.data
                          .attributes
                      )
                    "
                  ></v-img>
                </v-avatar>
              </template>
              <v-card-text>
                {{ item.trend.attributes.text }}
              </v-card-text>
              <template v-slot:append>
                <div class="justify-self-end">
                  <v-icon class="me-1" icon="mdi-heart" color="deep-orange" :size="16"></v-icon>
                  <span class="subheading me-2 fs-sm">{{
                    item.trend.attributes.likeUsers.data.length
                  }}</span>
                  <!-- <span class="me-1">·</span> -->
                  <!-- <v-icon
                    class="me-1"
                    icon="mdi-share-variant"
                    color="blue-darken-2"
                    :size="16"
                  ></v-icon>
                  <span class="subheading fs-sm">45</span> -->
                </div>
              </template>
              <v-card-actions>
                <v-container>
                  <v-row justify="end">
                    <v-btn
                      :prepend-icon="item.isLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
                      @click="
                        () => {
                          item.likeDo();
                        }
                      "
                      :color="item.isLiked ? 'deep-orange' : 'primary'"
                    >
                      点赞
                    </v-btn>
                    <!-- <v-btn prepend-icon="mdi-bookmark-box-multiple-outline" color="primary">
                      收藏
                    </v-btn> -->
                    <v-btn
                      prepend-icon="mdi-comment-processing-outline"
                      @click="
                        () => {
                          item.switchCommentStatus();
                        }
                      "
                      color="primary"
                    >
                      评论
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-actions>
              <v-expand-transition>
                <div v-if="item.doYouWantToOpenComments">
                  <v-divider></v-divider>
                  <v-sheet class="pa-2">
                    <v-text-field
                      v-model="comment"
                      append-inner-icon="mdi-draw-pen"
                      density="compact"
                      label="发表评论"
                      variant="solo-filled"
                      hide-details
                      single-line
                      @keyup.enter="
                        () => {
                          item.commentDo(comment);
                        }
                      "
                      @click:append-inner="
                        () => {
                          item.commentDo(comment);
                        }
                      "
                    ></v-text-field>
                  </v-sheet>
                  <v-list lines="two">
                    <v-list-subheader>最新评论</v-list-subheader>
                    <v-sheet
                      v-for="commont of item.trend.attributes.comment_cs.data"
                      :key="commont.id"
                    >
                      <v-list-item
                        :title="commont.attributes.users_permissions_user.data.attributes.username"
                      >
                        <template #prepend>
                          <v-avatar :size="32">
                            <v-img
                              cover
                              :src="
                                getFileUrl(
                                  commont.attributes.users_permissions_user.data.attributes.avatart
                                    .data.attributes
                                )
                              "
                            ></v-img>
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
      <v-col :cols="3">
        <v-card class="mx-auto">
          <v-list density="compact">
            <v-list-subheader>REPORTS</v-list-subheader>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="primary"
              class="overflow-x-hidden"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              {{ item.text }}
            </v-list-item>
          </v-list>
          <v-list density="compact">
            <v-list-subheader>REPORTS</v-list-subheader>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="primary"
              class="overflow-x-hidden"
            >
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

const classificationProps = function (item: Comment_cs) {
  return {};
};
const comment = ref<string>();
const trends = ref<Trend[]>([]);
const items = ref([
  { text: "Real-Time", icon: "mdi-clock" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-flag" },
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
}
</style>
