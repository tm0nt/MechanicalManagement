<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col offset="2">
          <h1>Account</h1>
          <v-chip variant="outlined" class="mt-2">Change password</v-chip>
          <v-row class="mt-4">
            <v-col cols="12" md="4">
              <v-form>
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label="New password"
                  prepend-inner-icon="mdi-password"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  label="Confirm password"
                  prepend-inner-icon="mdi-password"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn
                  color="primary"
                  @click="changePassword"
                  :disabled="isChangingPassword"
                >
                  <v-progress-circular
                    v-if="isChangingPassword"
                    indeterminate
                    size="20"
                    color="white"
                  ></v-progress-circular>
                  <span v-else>CHANGE</span>
                </v-btn>
                <v-alert
                  v-model="alert.view"
                  border="start"
                  class="mb-2 mt-2"
                  rounded="xl"
                  close-label="Error"
                  :color="alert.color"
                  title="Response"
                  variant="tonal"
                  closable
                  >{{ alert.text }}</v-alert
                >
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const password = ref(null);
const confirmPassword = ref(null);
const isChangingPassword = ref(false);
const alert = ref({
  text: "",
  view: false,
  color: "",
});
const showPassword = ref(false);

const changePassword = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      alert.value.view = true;
      alert.value.text = "Passwords do not match!";
      alert.value.color = "error";
      return;
    }

    isChangingPassword.value = true;
    const { data, error } = await useFetch(
      "http://localhost:8080/auth/change-password",
      {
        method: "put",
        body: JSON.stringify({
          newPassword: password.value,
        }),
      },
    );
    isChangingPassword.value = false;

    if (data.value) {
      console.log(data.value);
      alert.value.view = true;
      alert.value.text = "Password changed!";
      alert.value.color = "success";
    }
    if (error.value) {
      console.log(error.value);
      alert.value.view = true;
      alert.value.text = "Something didn't work!";
      alert.value.color = "error";
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<script>
import NavBar from "../../components/navbar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
