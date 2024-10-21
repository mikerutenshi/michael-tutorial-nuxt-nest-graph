<template>
  <!-- <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div> -->
  <v-app>
    <v-main>
      <v-container fluid class="pn-container">
        <AuthProfileCard v-if="authStore.user" />
        <AuthSignInForm v-else />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<style lang="sass">
.pn-container
  +pn-cover-image(url("@/assets/images/home.jpg")) // from variables.sass
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  padding: $spacer * 4 // from vuetify
</style>
