<template>
  <v-app-bar id="dev-label" v-if="envMode != 'production'">
    <v-toolbar-title
      >You're executing the system on browser mode, if you need backend read the documentation!</v-toolbar-title
    >
  </v-app-bar>
</template>
<script setup>
import { useAppStore } from '@/store/app.store'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { envMode } = storeToRefs(appStore)
</script>
