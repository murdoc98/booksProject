<template>
  <v-app>
    <v-main>
    <cDevLabel />
    <cNavbar/>
      <router-view />
    <cFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import cNavbar from "@/components/Navbar.vue";
import cFooter from "@/components/Footer.vue";
import cDevLabel from "@/components/DevLabel.vue";
</script>
