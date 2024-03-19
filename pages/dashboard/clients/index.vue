<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col offset="2">
          <h1>Clients</h1>
          <v-chip variant="outlined" class="mt-2">View data of yours</v-chip>
          <v-data-table
            :headers="headers"
            :items="itensClient"
            density="comfortable"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                color="primary"
                @click="editClientDialog(item)"
                append-icon="mdi-info"
                >INFO</v-btn
              >
            </template>
            <template v-slot:top>
              <v-btn
                block
                color="primary"
                class="mt-2"
                @click="dialogOpenClient = true"
                >NEW CLIENT</v-btn
              >
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogOpen" width="500">
                <v-card class="rounded-xl">
                  <v-card-title>
                    <span class="text-h5"
                      ><v-icon
                        @click="dialogOpen = false"
                        size="small"
                        class="ma-2"
                        >mdi-close</v-icon
                      >Edit client</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <h2 class="text-subtitle-1 mb-4">Client data</h2>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            v-model="editClient.name"
                            label="Name"
                            prepend-inner-icon="mdi-account"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            v-model="editClient.lastname"
                            label="Last name"
                            type="text"
                            prepend-inner-icon="mdi-account"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="editClient.email"
                            label="Email"
                            type="text"
                            prepend-inner-icon="mdi-email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="editClient.phone"
                            label="Phone"
                            type="text"
                            prepend-inner-icon="mdi-phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="editClient.address.street"
                            label="Address"
                            type="text"
                            prepend-inner-icon="mdi-city"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="editClient.address.zipCode"
                            prepend-inner-icon="mdi-numeric"
                            label="ZIP Code"
                            type="text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <h2 class="text-subtitle-1 mb-4">Orders list</h2>
                      <v-row>
                        <v-expansion-panels class="my-4" variant="inset">
                          <v-expansion-panel
                            v-for="i in editClient.ordensServico"
                            :key="i._id"
                            :title="i._id"
                            >
                            <template v-slot:text>
                              <v-col>
                                Descrição: {{ i.descricao }}
                              </v-col>
                              <v-col>
                                <v-chip class="text-uppercase">{{ i.status }}</v-chip>
                              </v-col>
                              <v-btn color="primary" class="ma-2" variant="text"
                                >PRINT ORDER</v-btn
                              >
                              <v-btn color="primary" class="ma-2" variant="text"
                                >CLOSE ORDER</v-btn
                              >
                            </template>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-row>
                      <v-row>
                        <h2 class="text-subtitle-1 mb-4">Client files</h2>
                        <v-col cols="12">
                        <v-form @submit.prevent="handleFileSubmit(editClient._id)">
                          <v-file-input
                            variant="outlined"
                            @change="handleUpload"
                            color="primary"
                            rounded="lg"
                          ></v-file-input>
                          <v-btn type="submit">SEND</v-btn>
                          </v-form>
                          
                        </v-col>
                        <v-col>
                          <p class="text-caption mt-n2 mb-4">Uploaded</p>
                        </v-col>
                      </v-row>
                      <v-col cols="12">
                        <v-btn color="primary" block>CHANGE DATA</v-btn>
                      </v-col>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogOpenClient" width="500">
                <v-card class="rounded-xl">
                  <v-card-title>
                    <span class="text-h5"
                      ><v-icon
                        @click="dialogOpenClient = false"
                        size="small"
                        class="ma-2"
                        >mdi-close</v-icon
                      >Create client</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <h2 class="text-subtitle-1 mb-4">Client data</h2>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            v-model="cliente.name"
                            label="Name"
                            prepend-inner-icon="mdi-account"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            v-model="cliente.lastname"
                            label="Last name"
                            type="text"
                            prepend-inner-icon="mdi-account"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="cliente.email"
                            label="Email"
                            type="text"
                            prepend-inner-icon="mdi-email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="cliente.phone"
                            label="Phone"
                            type="text"
                            prepend-inner-icon="mdi-phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="address.street"
                            label="Address"
                            type="text"
                            prepend-inner-icon="mdi-city"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            v-model="address.zipCode"
                            prepend-inner-icon="mdi-numeric"
                            label="ZIP Code"
                            type="text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <h2 class="text-subtitle-1 mb-4">Client files</h2>
                        <v-col cols="12">
                          <v-file-input
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
                        <v-btn color="primary" @click="newClient" block>SAVE DATA</v-btn>
                      </v-col>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon size="small" @click="deleteItem(item)"> mdi-info </v-icon>
            </template>
            <template v-slot:no-data> </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
const dialogOpen = ref(false);
const dialogOpenClient = ref(false);


const editClient = ref(null);

const editClientDialog = async (item) => {
  dialogOpen.value = true;
  editClient.value = item;
};

const cliente = ref({
  name: null,
  lastname: null,
  email: null,
  phone: null,
})

const address = ref({
  street: null,
  city: null,
  state: null,
  zipCode: null,
})

const alert = ref({
  view: false,
  color: "",
  text: "",
})
const filesPicture = ref(null);
const files = ref(null);



function handleUpload(event) {
  files.value = event.target.files;
  if (files.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
    };
    reader.readAsDataURL(files.value[0]);
  }
}

async function handleFileSubmit(id) {
  const fd = new FormData();
  if (files.value) {
    Array.from(files.value).forEach((file) => {
      fd.append("files", file);
    });
  }
  const options = {
    method: "POST",
    body: fd,
  };
  const data = await $fetch(`https://psautocenter-panel.shop/api/files/upload/${id}`, options);

  if (data) {
    console.log(data)
  } else {
    console.error("Erro ao enviar imagem:", error);
  }
}

const newClient = async () => {
  try{
    const {data, error} = await useFetch("https://psautocenter-panel.shop/api/clientes/cadastrar", {
      method: "post",
      body: JSON.stringify({
        name: cliente.value.name,
        lastname: cliente.value.lastname,
        email: cliente.value.email,
        phone: cliente.value.phone,
        address: {
          street: address.value.street,
          city: address.value.city,
          state: address.value.state,
          zipCode: address.value.zipCode,
        }
      })
    })
    if(data.value){
      alert.value.view = true;
      alert.value.color = "success";
      alert.value.text = "Client registered!";

    }
    if(error.value){
      alert.value.view = true;
      alert.value.color = "error";
      alert.value.text = "Unregistered client";
    }
  }catch(error){
    console.error(error);
  }
};



const headers = ref([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "License plate", key: "specs.licensePlate" },
  { title: "Action", key: "action" },
]);

const itensClient = ref([]);

const fetchData = async () => {
  try {
    const { data, error } = await useFetch(
      "https://psautocenter-panel.shop/api/clientes/listar",
    );
    if (data.value) {
      itensClient.value = data.value;
      console.log(data.value)
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
