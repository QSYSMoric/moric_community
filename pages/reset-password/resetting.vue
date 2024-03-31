<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>重置密码</h1>
            <p class="text-medium-emphasis">输入你的新密码来更新你的信息</p>

            <VForm @submit.prevent="submit" class="mt-7" ref="vForm">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">密码</label>
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="password"
                  prepend-inner-icon="mdi-lock"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="passwordConfirmation"
                  >再次输入密码</label
                >
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="passwordConfirmation"
                  prepend-inner-icon="mdi-lock"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  autocomplete
                />
              </div>
              <div class="mt-5">
                <VBtn type="submit" block min-height="44" class="gradient primary"
                  >更新你的密码</VBtn
                >
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <span
                >没有账号，注册一个？
                <NuxtLink to="/signup" class="font-weight-bold text-primary">跟我来</NuxtLink></span
              >
            </p>
          </VCol>
        </VRow>
      </VCol>
      <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
        <VImg
          src="https://wallpaper.dog/large/5557744.jpg"
          cover
          class="h-100 rounded-xl d-flex align-center justify-center"
        >
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4">立即开始您的旅程</h2>
            <p>
              在我们追求真理的旅途中，我们不断寻觅那些充满美好的角落，因为唯有在那里，我们才能够发现我们心灵渴望的一切！
            </p>
          </div>
        </VImg>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { resetting } from "~/api/user";

const { notify } = useNotification();
const route = useRoute();
const router = useRouter();
const { query } = route;
const vForm = ref();
if (!query.code) {
  notify({
    title: "错误",
    text: "无效的重置码",
    type: "error",
  });
  router.replace({
    path: "/login",
  });
}
const password = ref("");
const passwordConfirmation = ref("");
const code: string = query.code as string;
const { rulePassLen, ruleRequired } = useFormRules();

const submit = async () => {
  vForm.value.validate().then((data: any) => {
    if (data.valid) {
      resetting(code, password.value, passwordConfirmation.value).then((data) => {
        notify({
          title: "成功",
          text: "重置成功",
          type: "success",
        });
      });
    }
  });
};
</script>
