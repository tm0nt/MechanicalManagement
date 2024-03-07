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
                <v-text-field type="password" label="New password" prepend-inner-icon="mdi-password"></v-text-field>
                <v-text-field type="password" prepend-inner-icon="mdi-password" label="Confirm password"></v-text-field>
                <v-btn color="primary" block type="submit">CHANGE</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "../../components/navbar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
