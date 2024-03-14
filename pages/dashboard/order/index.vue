<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col offset="2">
          <h1>Dashboard</h1>
          <v-chip class="text-subtitle-1 mt-4 mb-4" variant="outlined"
            >Order of Service</v-chip
          >
          <v-data-table :headers="headers" :items="tableOrder">
            <template v-slot:item.action="{item}">
              <v-btn append-icon="mdi-info" color="primary" size="small" @click="openOrdemServiceDialog(item)">INFO</v-btn>
            </template>
            <template v-slot:top>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" width="auto">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="mb-2"
                    color="primary"
                    dark
                    v-bind="props"
                    @click="dialog = true"
                  >
                    NEW SERVICE ORDER
                  </v-btn>
                </template>
                <v-card class="rounded-xl">
                  <v-card-title>
                    <span class="text-h5"
                      ><v-icon @click="dialog = false" size="small" class="ma-2"
                        >mdi-close</v-icon
                      >New service order</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <h2 class="text-subtitle-1 mb-4">Client data</h2>
                      <v-row v-if="showAdditionalFields">
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Name"
                            prepend-inner-icon="mdi-account"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Last name"
                            type="text"
                            prepend-inner-icon="mdi-account"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            label="Email"
                            type="text"
                            prepend-inner-icon="mdi-email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            label="Phone"
                            type="text"
                            prepend-inner-icon="mdi-phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            label="Address"
                            type="text"
                            prepend-inner-icon="mdi-city"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            prepend-inner-icon="mdi-numeric"
                            label="ZIP Code"
                            type="text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-btn
                            @click="toggleAdditionalFields"
                            v-show="selectedClient === 'REGISTER CLIENT'"
                          >
                            Toggle Additional Fields
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="names"
                            label="Select client"
                            density="comfortable"
                            v-model="selectedName"
                            variant="outlined"
                            rounded="lg"
                            prepend-inner-icon="mdi-account"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <h2 class="text-subtitle-1 mb-4">Service data</h2>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            label="Product"
                            density="comfortable"
                            rounded="lg"
                            v-model="selectedProduct"
                            :items="products"
                            variant="outlined"
                            prepend-inner-icon="mdi-cup"
                            type="text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" class="mt-n8">
                          <v-text-field
                            prepend-inner-icon="mdi-text"
                            label="Describe the service"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n8">
                          <v-text-field
                            prepend-inner-icon="mdi-coin"
                            label="Value total"
                            type="text"
                          ></v-text-field>
                          <v-select
                            variant="outlined"
                            v-model="paymentType"
                            :items="paymentOptions"
                            label="Payment Type"
                          ></v-select>

                          <v-select
                            class="mt-n2"
                            v-model="selectedParcel"
                            variant="outlined"
                            :rounded="paymentType === 'Parcel' ? 'lg' : 'none'"
                            :disabled="paymentType === 'Cash'"
                            :items="generateParcelOptions()"
                            label="Parcel"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <p class="mb-4 mt-n4">Upload files</p>
                          <v-file-input
                            rounded="lg"
                            color="primary"
                            density="comfortable"
                            closable
                            multiples
                            chips
                            variant="outlined"
                          ></v-file-input>
                          <v-card
                            color="black"
                            rounded="xl"
                            class="elevation-0"
                            flat
                            width="80"
                            height="80"
                          >
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-col cols="12">
                        <v-btn color="primary" block @click="registerNewService"
                          >REGISTER</v-btn
                        >
                      </v-col>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogInfo" width="auto">
                <v-card
                  class="rounded-xl"
                  title="About a order"
                  subtitle="Review, closed and print a order"
                >
                  <template v-slot:prepend>
                    <v-icon @click="dialogInfo = false">mdi-close</v-icon>
                  </template>
                  <v-card-text>
                    <v-container>

                      <v-row>
                        <v-col cols="12">
                          <h2 class="text-subtitle-1 mb-n2">Client data</h2>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Name"
                            :disabled="true"
                            v-model="editOrderService.cliente.name"
                            prepend-inner-icon="mdi-account"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Last name"
                            type="text"
                            :disabled="true"
                            v-model="editOrderService.cliente.lastname"
                            prepend-inner-icon="mdi-account"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            label="Email"
                            :disabled="true"
                            type="text"
                            v-model="editOrderService.cliente.email"
                            prepend-inner-icon="mdi-email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                          label="Phone"
                            type="text"
                            :disabled="true"
                            v-model="editOrderService.cliente.phone"
                            prepend-inner-icon="mdi-phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            label="Address"
                            v-model="editOrderService.cliente.address.street"
                            type="text"
                            :disabled="true"
                            prepend-inner-icon="mdi-city"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" class="mt-n8">
                          <v-text-field
                            prepend-inner-icon="mdi-numeric"
                            :disabled="true"
                            label="ZIP Code"
                            v-model="editOrderService.cliente.address.zipCode"
                            type="text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <h2 class="text-subtitle-1 mb-4">Service data</h2>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="License plate"
                            v-model="editOrderService.cliente.specs.licensePlate"
                            prepend-inner-icon="mdi-license"
                            :disabled="true"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n8">
                          <v-text-field
                            prepend-inner-icon="mdi-text"
                            label="Describe the service"
                            :disabled="true"
                            type="text"
                            v-model="editOrderService.descricao"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n8">
                          <v-select
                            prepend-inner-icon="mdi-text"
                            label="Product"
                            :disabled="true"
                            type="text"
                            v-model="editOrderService.produto.name"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" class="mt-n6">
                          <p class="mb-4">Payment about</p>
                          <v-text-field
                            :disabled="true"
                            prepend-inner-icon="mdi-coin"
                            v-model="editOrderService.produto.value"
                        
                            label="Value total"
                            type="text"
                          ></v-text-field>
                          </v-col>
                          <v-col cols="6" class="mt-n8">
                            <v-select
                            prepend-inner-icon="mdi-coin"
                            :disabled="true"
                            label="Payment type"
                            variant="outlined"
                            solo
                            rounded="xl"
                            type="text"
                          ></v-select>
                          </v-col>
                          <v-col cols="6" class="mt-n8">
                            <v-text-field
                            prepend-inner-icon="mdi-coin"
                            label="Parcel open"
                            :disabled="true"
                            type="text"
                          ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                            prepend-inner-icon="mdi-coin"
                            class="mt-n8"
                            label="Value parcel"
                            :disabled="true"
                            type="text"
                          ></v-text-field>
                          </v-col>
                          <v-col cols="6" class="mt-n8">
                            <v-btn color="primary" block min-height="45" fab>PAYMENT PARCEL 1/6</v-btn>
                          </v-col>

                        <v-col cols="12">
                          <p class="mb-4 mt-n4">Upload files</p>
                          <v-file-input
                            rounded="lg"
                            color="primary"
                            density="comfortable"
                            closable
                            multiples
                            chips
                            variant="outlined"
                          ></v-file-input>
                          <h2 class="text-subtitle-1 mb-4">Files uploaded</h2>
                          <v-card
                            color="black"
                            rounded="xl"
                            class="elevation-0"
                            flat
                            width="80"
                            height="80"
                            prepend-icon="mdi-close"
                            link
                          >
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="deleteItemConfirm"
                      >PRINT ORDER</v-btn
                    >
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="dialogInfo = false"
                      >OK</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon size="large" @click="deleteItem(item)"> mdi-info </v-icon>
            </template>
            <template v-slot:no-data> </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
const dialogInfo = ref(false);
const dialog = ref(false);
const editOrderService = ref(null);
const openOrdemServiceDialog = async (item) => {
  dialogInfo.value = true;
  editOrderService.value = item;

};
const tableOrder = ref(null);
const headers = ref([
  { title: "License plate", key: "cliente.specs.licensePlate" },
  { title: "Client name", key: "cliente.name" },
  { title: "Product", key: "produto.name" },
  {title: "Status", key:"status"},
  { title: "Action", key: "action" },
]);

const allClients = ref(null);
const allProducts = ref(null);

const fetchData = async () => {
  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/ordens/listar",
    );
    if (data.value) {
      tableOrder.value = data.value;
    }
  } catch (error) {
    console.error(error);
  }
};

const allFetchData = async () => {
  await fetchClientData();
  await fetchProductData();
};

const fetchProductData = async () => {
  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/produtos/listar",
    );
    if (data.value) {
      allProducts.value = data.value;
      console.log(data.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const description = ref(null);

const fetchClientData = async () => {
  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/clientes/listar",
    );
    if (data.value) {
      allClients.value = data.value;
      console.log(data.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const paymentType = ref("Parcel");
const selectedParcel = ref(null);

const paymentOptions = ["Parcel", "Cash"];

const generateParcelOptions = () => {
  const options = [];
  for (let i = 1; i <= 12; i++) {
    options.push(`${i}x`);
  }
  return options;
};

const products = computed(() => allProducts.value.map((item) => item.name));
const selectedProduct = ref(null);
const selectedName = ref(null);

const names = computed(() => allClients.value.map((item) => item.name));

const ordensListar = async () => {
  try{
    const {data, error} = await useFetch("http://localhost:8080/ordens/listar")
    if(data.value){
      tableOrder.value = data.value
    }
  }catch(error){
    console.error(error)
  }
};


const registerNewService = async () => {
  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/ordens/cadastrar",
      {
        method: "post",
        body: JSON.stringify({
          clientId: selectedName.value,
          produtoId: selectedProduct.value,
          descricao: description.value,
          pagamento: pagament.value,
        }),
      },
    );
    if (data.value) {
      console.log(data.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const selectedClient = ref(null);
const showAdditionalFields = ref(false);

const toggleAdditionalFields = () => {
  showAdditionalFields.value = !showAdditionalFields.value;
};

await fetchData();
await ordensListar();
await allFetchData();
</script>
<script>
import NavBar from "../../components/navbar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
