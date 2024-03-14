<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="8" lg="8" sm="8">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1 class="text-center">Admin Panel</h1>
            <VForm @submit.prevent="submit" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">User</label>
                <VTextField
                  :rules="[ruleRequired]"
                  v-model="user"
                  prepend-inner-icon="fluent:person-24-regular"
                  id="user"
                  name="user"
                  type="user"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password"
                  >Password</label
                >
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="password"
                  prepend-inner-icon="fluent:password-20-regular"
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
              <div class="mt-5">
                <VBtn
                  type="submit"
                  block
                  min-height="44"
                  class="gradient primary"
                  >SIGN IN</VBtn
                >
              </div>
              <p class="text-error" v-if="error_login">
                Error: Incorrect user or password
              </p>
            </VForm>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

definePageMeta({
  middleware: ["login"],
});
const user = ref("");
const password = ref("");

const { rulePassLen, ruleRequired } = useFormRules();
const error_login = ref(false);
const submit = async () => {
  try {
    const { data, error } = await useFetch("http://localhost:8080/auth/login", {
      method: "post",
      body: JSON.stringify({
        username: user.value,
        password: password.value,
      }),
    });
    if (data.value) {
      error_login.value = false;
      nuxtStorage.localStorage.setData("token", data.value.token);
      return navigateTo("/dashboard/");
    }
    if (error.value) {
      error_login.value = true;
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
