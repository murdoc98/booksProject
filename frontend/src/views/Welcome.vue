<template>
  <v-container class="center-outer" :class='envMode != "production" ? "envMode": ""'>
    <v-row class="center-inner text-center">
      <v-col cols="12">
        <v-img
          :src="booksImg"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the Book's project
        </h1>
        <p class="subheading font-weight-regular">
          This is a technical test developed to
          <a href="https://fpalpha.com/" target="_blank">FP Alpha</a> <br />If
          you want more info about the implementation reach me at
          <a href="https://github.com/murdoc98" target="_blank">Github</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useAppStore } from '@/store/app.store'
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { envMode } = storeToRefs(appStore)
const booksImg = new URL('@/assets/books1.png', import.meta.url).href
</script>
