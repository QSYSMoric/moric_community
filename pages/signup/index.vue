<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>注册</h1>
            <p class="text-medium-emphasis">输入您的详细信息以开始</p>

            <VForm @submit.prevent="submit" class="mt-7">
              <div>
                <label class="label text-grey-darken-2" for="name">名字</label>
                <VTextField
                  :rules="[ruleRequired]"
                  v-model="name"
                  prepend-inner-icon="fluent:person-24-regular"
                  id="name"
                  name="name"
                  hint="让我们认识你"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">邮箱</label>
                <VTextField
                  :rules="[ruleRequired, ruleEmail]"
                  v-model="email"
                  type="email"
                  prepend-inner-icon="fluent:mail-24-regular"
                  id="email"
                  name="email"
                  hint="让我们联系你"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">密码</label>
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  type="password"
                  v-model="password"
                  prepend-inner-icon="fluent:password-20-regular"
                  id="password"
                  name="password"
                  hint="输入你的密码"
                />
              </div>
              <div class="mt-5">
                <VBtn type="submit" block min-height="45" class="gradient primary">创建角色</VBtn>
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <span
                >什么！你已经准备好了?
                <NuxtLink to="/login" class="font-weight-bold text-primary">快进来</NuxtLink></span
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
const name = ref<string>("");
const email = ref("");
const password = ref("");

const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const submit = async () => {};
</script>
