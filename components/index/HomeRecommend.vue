<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet class="mx-auto pa-2 pt-6">
          <v-sheet width="max-content" class="pa-1 rounded text-body-2"> 今日推荐话题 </v-sheet>
          <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" show-arrows>
            <v-slide-group-item
              v-for="n in 15"
              :key="n"
              v-slot="{ isSelected, toggle, selectedClass }"
            >
              <v-card
                :class="['ma-4', selectedClass]"
                color="grey-lighten-1"
                height="300"
                width="400"
                @click="toggle"
              >
                <div class="d-flex fill-height align-center justify-center">
                  <v-scale-transition>
                    <v-icon
                      v-if="isSelected"
                      color="primary"
                      icon="mdi-close-circle-outline"
                      size="48"
                    />
                  </v-scale-transition>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>

      <v-col cols="12">
        <v-card variant="flat">
          <v-list lines="two">
            <v-list-subheader title="今天发生了什么"></v-list-subheader>
            <template v-for="n in 6" :key="n">
              <v-container class="ma-0" :fluid="true">
                <v-row>
                  <v-col :xs="12" :sm="12" :md="6" :lg="6" cols="12">
                    <v-card subtitle="prepend and append" title="Avatars">
                      <template v-slot:prepend>
                        <v-avatar color="blue-darken-2">
                          <v-icon icon="mdi-alarm"></v-icon>
                        </v-avatar>
                      </template>
                      <template v-slot:append>
                        <v-avatar size="24">
                          <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                        </v-avatar>
                      </template>
                      <v-card-text
                        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod.</v-card-text
                      >

                      <v-card-actions @click="reveal = true">
                        <v-btn> Button </v-btn>
                      </v-card-actions>
                      <v-expand-transition>
                        <v-card v-if="reveal" class="v-card--reveal" style="height: 100%">
                          <v-card-text class="pb-0">
                            <p class="text-h4 text--primary">Origin</p>
                            <p>
                              late 16th century (as a noun denoting a place where alms were
                              distributed): from medieval Latin eleemosynarius, from late Latin
                              eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
                            </p>
                          </v-card-text>
                          <v-card-actions class="pt-0">
                            <v-btn color="teal-accent-4" variant="text" @click="reveal = false">
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-expand-transition>
                    </v-card>
                  </v-col>
                  <v-col :xs="12" :sm="12" :md="6" :lg="6" cols="12">
                    <v-card class="mx-auto" subtitle="prepend and append" title="Avatars">
                      <template v-slot:prepend>
                        <v-avatar color="blue-darken-2">
                          <v-icon icon="mdi-alarm"></v-icon>
                        </v-avatar>
                      </template>
                      <template v-slot:append>
                        <v-avatar size="24">
                          <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                        </v-avatar>
                      </template>
                      <v-card-text
                        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod.</v-card-text
                      >
                      <v-card-actions>
                        <v-btn @click="reveal = true"> Button </v-btn>
                      </v-card-actions>
                      <v-expand-transition>
                        <v-card v-if="reveal" class="v-card--reveal">
                          <v-card-text class="pb-0">
                            <p class="text-h4 text--primary">Origin</p>
                            <p class="overflow-x-hidden">
                              late 16th century (as a noun denoting a place where alms were
                              distributed): from medieval Latin eleemosynarius, from late Latin
                              eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
                            </p>
                          </v-card-text>
                          <v-card-actions class="pt-0">
                            <v-btn color="teal-accent-4" variant="text" @click="reveal = false">
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-expand-transition>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getHomeArticles } from "@/api/index";
getHomeArticles();
const reveal = ref<boolean>(false);
const model = ref(1);
</script>
<style lang="scss"></style>
