<template>
  <v-form @submit.prevent="execute({ data: form })">
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-text-field v-model="form.email" label="Email" />
    <v-text-field v-model="form.password" label="Password" />
    <v-btn :loading="isFetching" type="submit"> Sign In </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { useMutation } from "villus";
import { useAuthStore } from "@/stores/auth";
import { SignInDocument } from "@/api/generated/types";

const { data, execute, isFetching, error } = useMutation(SignInDocument);

const form = reactive({
  email: "",
  password: "",
});

const authStore = useAuthStore();

watchEffect(() => {
  authStore.user = data.value?.signIn || null;
});
</script>
