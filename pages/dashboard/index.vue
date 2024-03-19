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
                  <h2>{{ Data?.quantidadeClientes }}</h2>
                </template>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                title="Open payments"
                rounded="xl"
                flat
                prepend-icon="mdi-payment-clock"
                link
                variant="tonal"
                height="80"
              >
                <template v-slot:subtitle>
                  <h2>{{ Data?.quantidadePagamentosEmAberto }}</h2>
                </template>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                title="Vehicles"
                rounded="xl"
                flat
                prepend-icon="mdi-car"
                link
                variant="tonal"
                height="80"
              >
                <template v-slot:subtitle>
                  <h2>{{ Data?.quantidadeVeiculos }}</h2>
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
                  <h2>{{ Data?.quantidadeOrdens }}</h2>
                </template>
              </v-card>
            </v-col>
          </v-row>
          <v-divider class="my-10 mx-auto"></v-divider>
          <h1>My company</h1>
          <v-chip class="text-subtitle-1 mt-4" variant="outlined"
            >Company about</v-chip
          >
          <v-row class="mt-4" align="center">
            <v-col cols="12" md="4">
              <v-img
                src="https://i.imgur.com/mrMBAvg.png"
                width="250"
              ></v-img>
              <v-form  @submit.prevent="handleFileSubmit">

            </v-form>
            </v-col>
            <v-col cols="12" md="8" class="mt-md-n8">
              <h4 class="mb-2">Company Details</h4>

              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Company name"
                    v-model="CompanyData.companyName"
                    prepend-inner-icon="mdi-company"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Phone"
                    v-model="CompanyData.phone"
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" class="mt-n6">
                  <v-text-field
                    class="mt-n3"
                    label="Address"
                    v-model="CompanyData.address"
                    prepend-inner-icon="mdi-city"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="mt-n6">
                  <v-text-field
                    class="mt-n3"
                    v-model="CompanyData.postcode"
                    label="Postcode"
                    prepend-inner-icon="mdi-numeric"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n6">
                  <v-text-field
                    class="mt-n3"
                    v-model="CompanyData.email"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn
                @click="submit"
                color="primary"
                block
                prepend-icon="mdi-chevron-right"
                :disabled="isSubmitting"
              >
                <v-progress-circular
                  v-if="isSubmitting"
                  indeterminate
                  size="20"
                  color="white"
                ></v-progress-circular>
                <span v-else>SAVE DETAILS</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
const alert = ref({
  text: "",
  view: false,
  color: "",
});
const CompanyData = ref([
  {
    companyName: null,
    phone: null,
    address: null,
    email: null,
    postcode: null,
  },
]);

const Data = ref([]);
const Error = ref(false);
const fetchData = async () => {
  try {
    const { data, error } = await useFetch("https://psautocenter-panel.shop/api/");
    if (data.value) {
      Data.value = data.value;
      CompanyData.value.companyName = data.value.companyInfo.companyName;
      CompanyData.value.phone = data.value.companyInfo.phone;
      CompanyData.value.address = data.value.companyInfo.address;
      CompanyData.value.postcode = data.value.companyInfo.postCode;
      CompanyData.value.email = data.value.companyInfo.email;
    }
    if (error.value) {
      Error.value = true;
    }
  } catch (error) {
    console.error(error);
  }
};

const files = ref(null);

const filesPicture = ref(null);

function handleUploadPicture(event) {
  filesPicture.value = event.target.files;
  if (filesPicture.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
    };
    reader.readAsDataURL(filesPicture.value[0]);
  }
}


async function handleFileSubmit() {
  const fd = new FormData();
  if (files.value) {
    Array.from(files.value).forEach((file) => {
      fd.append("image", file);
    });
  }
  const options = {
    method: "POST",
    body: fd,
  };
  const data = await $fetch("https://psautocenter-panel.shop/api/upload/upload/companyterm", options);

  if (data) {
    console.log(data);
  } else {
    console.error("Erro ao enviar imagem:", error);
  }
}


const isSubmitting = ref(false);

const submit = async () => {
  try {
    isSubmitting.value = true;

    const { data, error } = await useFetch(
      "https://psautocenter-panel.shop/api/company/about",
      {
        method: "put",
        body: JSON.stringify({
          companyName: CompanyData.value.companyName,
          phone: CompanyData.value.phone,
          email: CompanyData.value.email,
          postCode: CompanyData.value.postcode,
          address: CompanyData.value.address,
        }),
      },
    );

    isSubmitting.value = false;

    if (data.value) {
      alert.value.view = true;
      (alert.value.text = "Data changed!"), (alert.value.color = "success");
      await fetchData();
    }

    if (error.value) {
      alert.value.view = true;
      (alert.value.text = "Something didn't work!"),
        (alert.value.color = "error");
    }
  } catch (error) {
    console.error(error);
  }
};
await fetchData();
</script>
<script>
import NavBar from "../../components/navbar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
