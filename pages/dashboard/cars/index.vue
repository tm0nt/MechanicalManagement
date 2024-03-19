<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col offset="2">
          <h1>Cars</h1>
          <v-chip variant="outlined" class="mt-2">View ours cars</v-chip>
          <v-btn
            class="mt-2 mb-2"
            @click="newCarDialog = true"
            color="primary"
            block
            >NEW CAR</v-btn
          >
          <v-dialog v-model="newCarDialog" width="600">
            <v-card rounded="xl" flat>
              <v-card-title
                ><v-icon @click="newCarDialog = false">mdi-close</v-icon
                >&nbsp;New car</v-card-title
              >
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="License plate"
                    v-model="newCarLicensePlate"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Model"
                    v-model="newCarModel"
                  ></v-text-field>
                  <v-btn color="primary" block @click="newCarRegister"
                    >REGISTER</v-btn
                  >
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
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-data-table :headers="headers" :items="cars" density="comfortable">
            <template v-slot:item.action="{ item }">
              <v-btn
                @click="editCarDialog(item)"
                append-icon="mdi-info"
                color="primary"
                size="small"
                >INFO</v-btn
              >
            </template>
            <template v-slot:top>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogOpen" width="500">
                <v-card class="rounded-xl">
                  <v-card-title>
                    <span class="text-h5"
                      ><v-icon @click="dialogClose" size="small" class="ma-2"
                        >mdi-close</v-icon
                      >Car edit</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <h2 class="text-subtitle-1 mb-1">Car data</h2>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="License plate"
                            v-model="editCar.licensePlate"
                            prepend-inner-icon="mdi-license"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Model car"
                            v-model="editCar.model"
                            type="text"
                            prepend-inner-icon="mdi-car"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <h2 class="text-subtitle-1 mb-4">Car files</h2>
                        <v-col cols="12">
                          <v-file-input
                            label="New upload"
                            variant="outlined"
                            color="primary"
                            rounded="lg"
                          ></v-file-input>
                        </v-col>
                        <v-col>
                          <p class="text-caption mt-n2 mb-4">Uploaded</p>
                        </v-col>
                      </v-row>
                      <v-col cols="12">
                        <v-btn
                          color="primary"
                          block
                          :disabled="!isDataChanged"
                          @click="vehiclesEditSave"
                          >SAVE DATA</v-btn
                        >
                        <v-alert
                          v-model="alertedit.view"
                          border="start"
                          class="mb-2 mt-2"
                          rounded="xl"
                          close-label="Error"
                          :color="alertedit.color"
                          title="Response"
                          variant="tonal"
                          closable
                          >{{ alertedit.text }}</v-alert
                        >
                      </v-col>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
const dialogOpen = ref(false);
const newCarLicensePlate = ref(null);
const newCarModel = ref(null);
const cars = ref([]);
const headers = ref([
  { title: "License plate", key: "licensePlate" },
  { title: "Model", key: "model" },
  { title: "Action", key: "action" },
]);

const editCar = ref({
  licensePlate: null,
  model: null,
  _id: null,
});

const alertedit = ref({
  text: "",
  view: false,
  color: "",
});

const editCarDialog = async (item) => {
  dialogOpen.value = true;
  editCar.value = item;
  originalCarEdit.value = { ...item };
};

const alert = ref({
  text: "",
  view: false,
  color: "",
});

const fetchData = async () => {
  try {
    const { data, error } = await useFetch(
      "https://psautocenter-panel.shop/api/veiculos/listar",
    );
    if (data.value) {
      cars.value = data.value;
      console.log(data.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const newCarDialog = ref(false);

const newCarRegister = async () => {
  try {
    const { data, error } = await useFetch(
      "https://psautocenter-panel.shop/api/veiculos/cadastrar",
      {
        method: "post",
        body: JSON.stringify({
          licensePlate: newCarLicensePlate.value,
          model: newCarModel.value,
        }),
      },
    );
    if (data.value) {
      alert.value.view = true;
      alert.value.color = "success";
      alert.value.text = "Vehicle registered!";
      (newCarLicensePlate.value = null),
        (newCarModel.value = null),
        fetchData();
    }
    if (error.value) {
      alert.value.view = true;
      alert.value.color = "error";
      alert.value.text = "Unregistered vehicles";
    }
  } catch (error) {
    console.error(error);
  }
};
const dialogClose = async () => {
  editCar.value = {
    licensePlate: null,
    _id: null,
    model: null,
  };
  dialogOpen.value = false;
};

const vehiclesEditSave = async () => {
  try {
    const { data, error } = await useFetch(
      `https://psautocenter-panel.shop/api/veiculos/editar/${editCar.value._id}`,
      {
        method: "put",
        body: JSON.stringify({
          licensePlate: editCar.value.licensePlate,
          model: editCar.value.model,
        }),
      },
    );
    if (data.value) {
      alertedit.value.view = true;
      alertedit.value.text = "Vehicles edited!";
      alertedit.value.color = "success";
      fetchData();
    }
    if (error.value) {
      alertedit.value.view = true;
      alertedit.value.text = "Something didn't work!";
      alertedit.value.color = "error";
    }
  } catch (error) {
    console.error(error);
  }
};

const originalCarEdit = ref({
  licensePlate: null,
  model: null,
  _id: null,
});

const isDataChanged = computed(() => {
  return (
    editCar.value.licensePlate !== originalCarEdit.value.licensePlate ||
    editCar.value.model !== originalCarEdit.value.model
  );
});

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
