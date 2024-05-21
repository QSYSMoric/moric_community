<template>
  <v-navigation-drawer
    :elevation="0"
    floating
    :fixed="true"
    v-model="drawer.drawer"
    :rail="drawer.rail"
    @click="drawer.rail = false"
  >
    <v-list>
      <v-list-item
        :prepend-avatar="getFileUrl(me.avatart)"
        :subtitle="me?.email"
        :title="me?.username"
        class="cursor-pointer"
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="drawer.rail = !drawer.rail"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" color="primary" nav v-model:selected="selected">
      <v-list-item
        prepend-icon="mdi-podium-gold"
        title="发现"
        color="primary"
        value="myfiles"
        @click="go('/')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-draw"
        title="发布"
        color="primary"
        value="shared"
        @click="go('/creator')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-star"
        title="个人中心"
        color="primary"
        value="personalCenter"
        @click="go('/personalCenter')"
      ></v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn variant="tonal" color="primary" @click="toggleTheme" block>切换主题</v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <VAppBar :elevation="0" :order="0" border :floating="true" position="sticky">
    <template #prepend>
      <v-app-bar-nav-icon>
        <!-- <VAvatar :size="32">
          <SvgIcon name="community_icon"> </SvgIcon>
        </VAvatar> -->
        <VAvatar color="teal-darken-4"> 青 </VAvatar>
      </v-app-bar-nav-icon>
    </template>
    <v-app-bar-title v-if="!smAndUp">小青社</v-app-bar-title>
    <template #append>
      <v-menu transition="slide-y-transition" class="shrink">
        <template v-slot:activator="{ props }">
          <v-btn :icon="icon" color="primary" title="更多" v-bind="props"></v-btn>
        </template>
        <v-expand-transition>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title>
                <v-btn color="secondary" size="small" variant="text" @click="item.click" block>
                  {{ item.title }}
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expand-transition>
      </v-menu>
    </template>
    <VContainer id="input-usage" fluid>
      <v-row justify="center" class="d-none d-md-flex d-xl-flex">
        <v-col cols="6">
          <VRow align="end" class="clear-init">
            <v-menu transition="slide-y-reverse-transition">
              <template v-slot:activator="{ props }">
                <v-text-field
                  @update:modelValue="run"
                  v-bind="props"
                  clearable
                  prepend-icon="mdi-magnify"
                  label="发现"
                  variant="underlined"
                ></v-text-field>
              </template>
              <v-card hover>
                <v-card-text class="pa-0">
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="pb-0" v-if="searchList.articleList.length">
                        <v-list lines="two">
                          <div>文章</div>
                          <v-list-item
                            class="pa-1 rounded-sm hover:bg-[rgba(var(--v-theme-subContent))]!"
                            v-for="item of searchList.articleList"
                            :title="item.attributes.title"
                            :key="item.id"
                            @click="goAtributeInfo(item.id)"
                          >
                            <template v-slot:prepend>
                              <v-img
                                class="mr-2 rounded-lg"
                                width="80px"
                                :src="getFileUrl(item.attributes.cover.data.attributes)"
                              >
                              </v-img>
                            </template>
                            <v-chip
                              color="primary"
                              size="small"
                              variant="flat"
                              class="ml-1 mt-1"
                              prepend-icon="mdi-label-multiple-outline"
                              v-for="node of item.attributes.classification"
                              :key="item.id"
                            >
                              {{ node.attributes.title }}
                            </v-chip>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="pt-0" v-if="searchList.userList.length">
                        <v-list lines="two">
                          <div>用户</div>
                          <v-list-item
                            class="pa-1 rounded-sm hover:bg-[rgba(var(--v-theme-subContent))]!"
                            v-for="item of searchList.userList"
                            :title="item.username"
                            :key="item.id"
                            @click="goUserInfo(item.id)"
                          >
                            <template v-slot:prepend>
                              <v-avatar color="grey-lighten-1">
                                <v-img :src="getFileUrl(item.avatart)"></v-img>
                              </v-avatar>
                            </template>
                            <div>
                              <v-chip
                                color="primary"
                                size="small"
                                class="ml-1 mt-1"
                                variant="flat"
                                prepend-icon="mdi-label-multiple-outline"
                                v-for="node of item.excels"
                                :key="item.id"
                              >
                                {{ node.title }}
                              </v-chip>
                            </div>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                    <v-row
                      v-if="!searchList.articleList.length && !searchList.userList.length"
                      justify="center"
                    >
                      <v-card variant="text">
                        <v-card-text> 未搜索到内容 </v-card-text>
                      </v-card>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-menu>
          </VRow>
        </v-col>
      </v-row>
    </VContainer>
  </VAppBar>
  <NuxtPage />
  <v-footer class="text-center d-flex flex-column">
    <div>
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
    </div>

    <div class="pt-0">基于Nuxt3的社区管理系统</div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>Vuetify + nuxt</strong></div>
  </v-footer>
</template>

<script setup lang="ts">
import type { FileObj, Me } from "@/type/index";
import { useThemeDisplay } from "~/composables/media";
import { useDebounceFn } from "vue-hooks-plus";
import { fuzzySearch } from "@/api/index";
const router = useRouter();
/**
 * @descripttion: 文章搜索列表
 * @return {*}
 */
interface ArticleList {
  id: number;
  attributes: {
    title: string;
    classification: {
      data: {
        id: number;
        attributes: {
          title: string;
        };
      };
    };
    cover: {
      data: {
        id: number;
        attributes: FileObj;
      };
    };
  };
}
/**
 * @descripttion: 用户搜索列表
 * @return {*}
 */
interface UserList {
  id: number;
  username: string;
  excels: {
    id: number;
    title: string;
  }[];
  avatart: FileObj;
}
const searchList = ref<{
  articleList: ArticleList[];
  userList: UserList[];
}>({
  articleList: [],
  userList: [],
});
const theme = useThemeDisplay();
/**
 * @descripttion:搜索按钮
 * @return {*}
 */
async function search(str: string): Promise<void> {
  searchList.value.articleList.length = 0;
  searchList.value.userList.length = 0;
  if (str == "") {
    return;
  }
  if (str)
    fuzzySearch(str).then((data) => {
      searchList.value = data;
    });
}

/**
 * @descripttion:防抖搜索
 * @return {*}
 */
const { run } = useDebounceFn(search, {
  wait: 500,
});

/**
 * @descripttion: 前往文章详情页
 * @param {*} artic
 * @return {*}
 */
function goAtributeInfo(artic: number) {
  router.push({
    path: `/${artic}`,
  });
}

function goUserInfo(userId: number) {
  router.push({
    path: `/personalInfo`,
    query: {
      userId,
    },
  });
}

/**
 * @descripttion: 切换主题
 * @return {*}
 */
function toggleTheme(): void {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

const alignment = ref(true);

watch(
  () => {
    return alignment.value;
  },
  () => {
    toggleTheme();
  }
);

const media = useMedia();
const routeMap = new Map([
  ["/", "myfiles"],
  ["/creator", "shared"],
  ["/personalCenter", "personalCenter"],
]);
const { smAndUp, name } = media;
const mySelf = useMystore();

const route = useRoute();
const me = ref<Me>({
  username: "请先登录",
  id: -1,
  email: void 0,
  provider: "",
  confirmed: false,
  uuid: "",
  phone: -1,
  sex: "confidential",
  age: -1,
  avatart: void 0,
  articles: [],
  excels: [],
  trends: [],
});
mySelf.getUserInforAsync().then((data: Me | undefined) => {
  if (data) me.value = data;
});
const icon = computed(() => {
  switch (name.value) {
    case "xs":
      return "mdi-dots-vertical";
    case "sm":
      return "mdi-dots-vertical";
    case "md":
      return "mdi-chevron-down";
    case "lg":
      return "mdi-chevron-down";
    case "xl":
      return "mdi-chevron-down";
    case "xxl":
      return "mdi-chevron-down";
  }
  return undefined;
});
const selected = ref<string[]>(["myfiles"]);
const drawer = ref({
  drawer: true,
  rail: false,
});
const items = ref<
  {
    title: string;
    value: string;
    click: () => void;
  }[]
>([
  {
    title: "个人中心",
    value: "1",
    click: () => {
      router.replace({
        path: "/login",
      });
    },
  },
  {
    title: "退出登录",
    value: "2",
    click: () => {
      mySelf.logOut();
      router.replace({
        path: "/login",
      });
    },
  },
]);
//切换路由
let selectIndex = getRouteByNumber(route.path, 1);
if (selectIndex) {
  selected.value = [routeMap.get(selectIndex)!];
}

/**
 * @descripttion:tab切换
 * @param {*} url
 * @return {*}
 */
function go(url: string): void {
  router.replace({
    path: url,
  });
}
const icons = ref(["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]);
</script>
<style lang="scss">
.clear-init {
  .v-input__details {
    display: none;
  }
}
.no_v-input_details {
  .v-input__details {
    display: none;
  }
}
.community-main {
  min-height: 800px;
  padding: 20px;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute !important;
  width: 100%;
}
</style>
