<template>
  <div>
    <VApp>
      <v-locale-provider locale="zhHans">
        <VMain>
          <slot />
        </VMain>
      </v-locale-provider>
    </VApp>
  </div>
</template>
