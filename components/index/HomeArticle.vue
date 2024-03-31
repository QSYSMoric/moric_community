<template>
  <v-container fluid class="home-article">
    <v-row>
      <v-col :cols="9">
        <v-list>
          <v-list-item v-for="(item, index) of 5" :key="index">
            <v-card class="mx-auto" subtitle="prepend-icon and append-icon" title="Icons">
              <template v-slot:prepend>
                <v-avatar color="blue-darken-2">
                  <v-icon icon="mdi-alarm"></v-icon>
                </v-avatar>
              </template>
              <v-card-text>
                In most cases it is better not to use v-html, so the rule is included in the
                category recommended. no-v-text is a rule for users who do not want to use v-text.
                Users can turn ON the rule according to your preference. The new rule is to prevent
                unexpected component content corruption. In most cases it is better not to use
                v-html, so the rule is included in the category recommended. no-v-text is a rule for
                users who do not want to use v-text. Users can turn ON the rule according to your
                preference. The new rule is to prevent unexpected component content corruption.
              </v-card-text>
              <template v-slot:append>
                <div class="justify-self-end">
                  <v-icon class="me-1" icon="mdi-heart" color="deep-orange"></v-icon>
                  <span class="subheading me-2">256</span>
                  <span class="me-1">·</span>
                  <v-icon class="me-1" icon="mdi-share-variant" color="blue-darken-2"></v-icon>
                  <span class="subheading">45</span>
                </div>
              </template>
              <v-card-actions>
                <v-container>
                  <v-row justify="end">
                    <v-btn prepend-icon="mdi-heart" color="primary">点赞 </v-btn>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-list-item>
        </v-list>
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
const items = ref([
  { text: "Real-Time", icon: "mdi-clock" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-flag" },
]);
</script>
<style lang="scss">
.home-article {
  min-height: 100vh;
}
</style>
