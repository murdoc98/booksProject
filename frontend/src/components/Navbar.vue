<template>
  <v-app-bar :class="envMode != 'production' ? 'devNavbar' : ''">
    <v-toolbar-title
      ><router-link :to="`/`">Books project</router-link></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-switch :label='envMode.toUpperCase()' @change="changeMode" :disabled='initialEnv != "production"'></v-switch>
    <v-btn class="ma-2 white--text" @click="userService.login()" v-if="!isAuth">
      <v-icon right dark> mdi-login </v-icon>
      &nbsp;Login
    </v-btn>
    <v-btn class="ma-2 white--text" :to="`/protected`" v-if="isAuth">
      <v-icon right dark> mdi-account-circle-outline </v-icon>
      &nbsp;Profile
    </v-btn>
    <v-btn class="ma-2 white--text" @click="userService.logout()" v-if="isAuth">
      <v-icon right dark> mdi-logout </v-icon>
      &nbsp;Logout
    </v-btn>
  </v-app-bar>
</template>
<script setup>
import UserService from '@/services/user.service'
import { useUserStore } from '@/store/user.store'
import { useAppStore } from '@/store/app.store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const appStore = useAppStore()
const { isAuth } = storeToRefs(userStore)
const { envMode, initialEnv } = storeToRefs(appStore)

const userService = new UserService()

const changeMode = () => {
  userService.logout()
  if(appStore.envMode == 'production') {
    appStore.setEnvMode('development')
  } else {
    appStore.setEnvMode('production')
  }
}
</script>
