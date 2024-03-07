<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col offset="2">
          <h1>Dashboard</h1>
          <v-chip class="text-subtitle-1 mt-4" variant="outlined"
            >Your metrics</v-chip
          >
          <v-row class="mt-2">
            <v-col cols="12" md="4">
              <v-card
                title="Clients"
                rounded="xl"
                flat
                prepend-icon="mdi-account-multiple"
                link
                variant="tonal"
                height="80"
              >
                <template v-slot:subtitle>
                  <h2>256</h2>
                </template>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                title="Services open"
                rounded="xl"
                flat
                link
                prepend-icon="mdi-clock"
                variant="tonal"
                subtitle="256"
                height="80"
              >
                <template v-slot:subtitle>
                  <h2>256</h2>
                </template>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                title="Services concluded"
                rounded="xl"
                flat
                link
                prepend-icon="mdi-check-circle"
                variant="tonal"
                subtitle="256"
                height="80"
              >
                <template v-slot:subtitle>
                  <h2>256</h2>
                </template>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card
                title="Orders"
                rounded="xl"
                flat
                link
                variant="tonal"
                prepend-icon="mdi-order-bool-descending-variant"
                subtitle="256"
                height="80"
              >
                <template v-slot:subtitle>
                  <h2>455</h2>
                </template>
              </v-card>
            </v-col>
          </v-row>
          <v-divider class="my-10 mx-auto"></v-divider>
          <h1>My company</h1>
          <v-chip class="text-subtitle-1 mt-4" variant="outlined"
            >Company about</v-chip
          >
          <v-row class="mt-4" align=center>
            <v-col cols="12" md="4">
              <v-img
                src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png"
                width="250"
              ></v-img>
              <v-btn color="primary" block prepend-icon="mdi-image"
                >CHANGE LOGO</v-btn
              >
            </v-col>
            <v-col cols="12" md="8" class="mt-md-n8">
              <h4 class="mb-2">Company Details</h4>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Company name"
                    prepend-inner-icon="mdi-company"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Phone"
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" class="mt-n6">
                  <v-text-field
                class="mt-n3"
                label="Address"
                prepend-inner-icon="mdi-city"
              ></v-text-field>
                </v-col>
                <v-col cols="6" class="mt-n6">
                  <v-text-field
                class="mt-n3"
                label="ZIP Code"
                prepend-inner-icon="mdi-numeric"
              ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n6">
                  <v-text-field
                class="mt-n3"
                label="Email"
                prepend-inner-icon="mdi-email"
              ></v-text-field>
                </v-col>
              </v-row>
              
          
              <v-btn color="primary" block prepend-icon="mdi-chevron-right"
                >SAVE DETAILS</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup></script>
<script>
import NavBar from "../../components/navbar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
