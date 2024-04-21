<template>
  <ClientOnly>
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
          prepend-icon="mdi-creation"
          title="收藏"
          color="primary"
          value="starred"
        ></v-list-item>
      </v-list>
      <v-spacer></v-spacer>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn variant="tonal" color="primary" @click="toggleTheme" block>切换主题</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </ClientOnly>
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
      <v-btn icon="mdi-heart" color="primary" class="d-md-none d-lg-none"></v-btn>
      <v-btn icon="mdi-magnify" color="primary" class="d-md-none d-lg-none"></v-btn>

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
            <v-text-field
              clearable
              prepend-icon="mdi-magnify"
              label="发现"
              variant="underlined"
            ></v-text-field>
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
import type { Me } from "@/type/index";
import { useTheme } from "vuetify";

const nuxtApp = useNuxtApp();
const theme = useTheme();

function toggleTheme() {
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
]);
const { smAndUp, name } = media;
const mySelf = useMystore();
const router = useRouter();
const route = useRoute();
const me = ref<Me>({
  username: "请先登录",
  id: -1,
  email: void 0,
  provider: "",
  confirmed: false,
  uuid: "",
  phone: -1,
  sex: "",
  age: -1,
  avatart: void 0,
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
