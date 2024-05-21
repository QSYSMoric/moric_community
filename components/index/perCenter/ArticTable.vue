<template>
  <v-card variant="text" class="mt-4 pa-0">
    <v-card-text class="pa-0">
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2 px-0">
          <v-icon icon="mdi-file-find-outline"></v-icon>
          <p class="m-l-4">搜索你的作品</p>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            density="compact"
            label="搜索"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          >
          </v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table-server
          hover
          color="primary"
          @update:options="updateOption"
          :search="search"
          :headers="headers"
          :items-length="totalItems"
          :loading="loading"
          :items="articList"
        >
          <template v-slot:item.title="{ item }">
            {{ item.title }}
          </template>
          <template v-slot:item.content="{ item }">
            <v-card class="max-w-300px" variant="text">
              <v-card-text>
                {{ item.content }}
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:item.introduction="{ item }">
            <v-card class="max-w-250px" variant="text">
              <v-card-text class="px-0">
                {{ item.introduction }}
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon="mdi-pencil"
              @click="goEditeArtic(item.id)"
              color="primary"
              variant="text"
              size="small"
            >
            </v-btn>
            <v-dialog transition="dialog-bottom-transition" width="auto">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  icon="mdi-delete"
                  color="red"
                  variant="text"
                  size="small"
                >
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-toolbar title="要删除吗？"></v-toolbar>

                  <v-card-text>
                    确定删除你的文章:
                    <span class="font-semibold color-[rgba(var(--v-theme-primary))]">
                      《{{ item.title }}》
                    </span>
                    吗?
                  </v-card-text>

                  <v-card-actions class="justify-end">
                    <v-btn @click="deleteArtic(item.id)" color="red">确认</v-btn>
                    <v-btn @click="isActive.value = false">取消</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </template>
          <template v-slot:item.createdAt="{ item }">
            {{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm") }}
          </template>
          <template v-slot:expanded-row="{ columns, item }">
            <tr>
              <td :colspan="columns.length">
                <v-card variant="text" class="p-t-2!">
                  <v-card-subtitle> 封面 </v-card-subtitle>
                  <v-card-text>
                    <v-img :width="300" :src="getFileUrl(item.cover.data.attributes)"></v-img>
                  </v-card-text>
                </v-card>
              </td>
            </tr>
          </template>
        </v-data-table-server>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { getMyArticleList, deleteArticInfoByid } from "@/api/index";
import type { MyArticlesTables } from "@/type/home";
const search = ref("");
const dayjs = useDayjs();
const router = useRouter();
const loading = ref(true);
const totalItems = ref(0);
const { notify } = useNotification();
const articList = ref<MyArticlesTables[]>([]);

const headers = ref([
  {
    title: "标题",
    align: "start",
    sortable: false,
    key: "title",
  },
  //   { title: "详细内容", key: "content" },
  { title: "简介", key: "introduction" },
  { title: "创建时间", key: "createdAt" },
  { title: "操作", key: "actions", sortable: false },
  { title: "", key: "data-table-expand" },
]);
/**
 * @descripttion:在其中一个选项属性更新时发出。
 * @return {*}
 */
function updateOption({
  page,
  itemsPerPage,
  sortBy,
  search,
}: {
  page: number;
  itemsPerPage: number;
  sortBy: number;
  search: string;
}): void {
  loading.value = true;
  getMyArticleList(page, itemsPerPage, search).then((data) => {
    if (data.data) {
      articList.value = data.data.map((element) => {
        return {
          id: element.id,
          title: element.attributes.title,
          content: element.attributes.content,
          introduction: element.attributes.introduction,
          createdAt: element.attributes.createdAt,
          cover: element.attributes.cover,
        };
      });
      totalItems.value = data.meta!.pagination.total;
    }
    loading.value = false;
  });
}

/**
 * @descripttion: 前往文章编辑页面
 * @param {*} articId
 * @return {*}
 */
function goEditeArtic(articId: number): void {
  router.push({
    path: "/personalCenter/editeArticle",
    query: {
      articId: articId,
    },
  });
}

/**
 * @descripttion: 删除文章
 * @param {*} articId
 * @return {*}
 */
function deleteArtic(articId: number): void {
  let index = articList.value.findIndex((element) => {
    return element.id == articId;
  });
  if (!~index) {
    return;
  }
  deleteArticInfoByid(articId)
    .then(() => {
      articList.value.splice(index, 1);
      notify({
        title: "成功",
        text: "删除成功",
        type: "success",
      });
    })
    .catch((err) => {
      notify({
        text: "删除失败",
        type: "error",
      });
    });
}
</script>
<style lang="scss" scoped></style>
