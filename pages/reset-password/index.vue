<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>重置密码</h1>
            <p class="text-medium-emphasis">输入你的信息让我们确保是你自己</p>

            <VForm @submit.prevent="submit" class="mt-7">
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
              <div class="mt-5">
                <VBtn type="submit" block min-height="44" class="gradient primary"
                  >发送重置请求</VBtn
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
const email = ref("");
const password = ref("");

const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const submit = async () => {};
</script>
