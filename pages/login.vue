<template>
  <VContainer fluid class="fill-height" locale="zh">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>登录</h1>
            <p class="text-medium-emphasis">输入你的账号进入社区</p>

            <VForm @submit.prevent="submit" class="mt-7" ref="vForm">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">邮箱</label>
                <VTextField
                  :rules="[ruleRequired, ruleEmail]"
                  v-model="email"
                  prepend-inner-icon="fluent:mail-24-regular"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">密码</label>
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="password"
                  prepend-inner-icon="fluent:password-20-regular"
                  id="password"
                  name="password"
                  type="password"
                  hint="输入你的密码"
                  autocomplete="off"
                />
              </div>
              <div class="mt-5">
                <VBtn type="submit" block min-height="44" class="gradient primary">登录</VBtn>
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <NuxtLink to="/reset-password" class="font-weight-bold text-primary"
                >忘记密码了吗?</NuxtLink
              >
            </p>
            <p class="text-body-2 mt-4">
              <span
                >没有帐户？
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
              在追寻真理的道路上，我们始终努力寻找那些充满美好的地方，因为在那里，我们将发现我们追求的一切
            </p>
          </div>
        </VImg>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
const { notify } = useNotification();
const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();
/**
 * @descripttion:表单
 * @return {*}
 */
interface UserInputMsg {
  email: string;
  password: string;
}
const vForm = ref();
const submit = async () => {
  vForm.value.validate().then((data: any) => {
    if (data.valid) {
      notify({
        title: "登录成功",
        text: "欢迎回来!",
        type: "success",
      });
    } else {
      notify({
        title: "错误",
        text: "请填写必要的信息!",
        type: "error",
      });
    }
  });
};
</script>
