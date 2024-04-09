<template>
  <v-container fluid class="home-article">
    <v-row>
      <v-col :cols="9">
        <v-list>
          <v-list-item v-for="(item, index) of trends" :key="index">
            <v-card
              class="mx-auto"
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
                  <span class="subheading me-2 fs-sm">256</span>
                  <span class="me-1">·</span>
                  <v-icon
                    class="me-1"
                    icon="mdi-share-variant"
                    color="blue-darken-2"
                    :size="16"
                  ></v-icon>
                  <span class="subheading fs-sm">45</span>
                </div>
              </template>
              <v-card-actions>
                <v-container>
                  <v-row justify="end">
                    <v-btn prepend-icon="mdi-thumb-up-outline" color="primary">点赞 </v-btn>
                    <v-btn prepend-icon="mdi-bookmark-box-multiple-outline" color="primary">
                      收藏
                    </v-btn>
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
                  <v-list :items="itemTT" lines="three" item-props>
                    <template #append>
                      <p class="text-disabled text-body-2">2024.1.1</p>
                    </template>
                    <template v-slot:subtitle="{ subtitle }">
                      <div v-html="subtitle"></div>
                    </template>
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
import type { TrendHome } from "@/type/home";
import { Trend } from "@/class/Trend";

const comment = ref<string>();
const trends = ref<Trend[]>([]);
const items = ref([
  { text: "Real-Time", icon: "mdi-clock" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-flag" },
]);
const itemTT = [
  { type: "subheader", title: "最新评论" },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    title: "Brunch this weekend?",
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    title: "Summer BBQ",
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    title: "Oui oui",
    subtitle:
      '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    title: "Birthday gift",
    subtitle:
      '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    title: "Recipe to try",
    subtitle:
      '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
];
getHomeTrends().then((data) => {
  trends.value = data.data.map((element: TrendHome) => {
    return new Trend(element);
  });
});
</script>
<style lang="scss">
.home-article {
  min-height: 100vh;
}
</style>
