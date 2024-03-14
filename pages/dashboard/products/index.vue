<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col offset="2">
          <h1>Products</h1>
          <v-chip variant="outlined" class="mt-2">Register product</v-chip>
          <v-data-table
            :headers="headers"
            :items="tableProducts"
            density="comfortable"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                append-icon="mdi-info"
                color="primary"
                size="small"
                @click="productEditDialog(item)"
                >INFO</v-btn
              >
            </template>
            <template v-slot:top>
              <v-btn
                block
                color="primary"
                class="mt-2"
                @click="productDialog = true"
                >NEW PRODUCT</v-btn
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
                      >{{ formTitle }}</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-sheet class="text-body-2 mx-auto" width="580">
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12" md="3">
                                <v-img
                                  height="80"
                                  src="https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png"
                                  cover
                                ></v-img>
                                <v-btn
                                  color="primary"
                                  block
                                  variant="tonal"
                                  rounded="xs"
                                  ><v-icon>mdi-image</v-icon></v-btn
                                >
                              </v-col>

                              <v-col cols="12" md="9">
                                <v-text-field
                                  label="Name"
                                  v-model="productEdit.name"
                                ></v-text-field>
                                <v-text-field
                                  label="Quantity"
                                  v-model="productEdit.quantity"
                                ></v-text-field>
                                <v-text-field
                                  label="Value"
                                  v-model="productEdit.value"
                                ></v-text-field>

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

                                <v-btn
                                  class="text-none mt-2"
                                  color="primary"
                                  rounded="xl"
                                  variant="flat"
                                  @click="productSaveEdit"
                                  :disabled="!isDataChanged"
                                  block
                                >
                                  Edit product data
                                </v-btn>
                                <v-btn
                                  class="text-none mt-2"
                                  color="error"
                                  rounded="xl"
                                  variant="flat"
                                  @click="deleteProduct(productEdit._id)"
                                  block
                                >
                                  Delete product
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon size="small" @click="registerProduct(item)">
                mdi-info
              </v-icon>
            </template>
            <template v-slot:no-data> </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="productDialog" width="600">
      <v-card rounded="xl" flat>
        <v-card-title>
          <span class="text-h5"
            ><v-icon @click="productDialog = false" size="small" class="ma-2"
              >mdi-close</v-icon
            >New product</span
          >
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Name product"
            v-model="name_product"
            prepend-inner-icon="mdi-cup-outline"
          >
          </v-text-field>
          <v-text-field
            label="Quantity"
            v-model="quantity"
            prepend-inner-icon="mdi-numeric"
          >
          </v-text-field>
          <v-text-field
            v-model="value_product"
            prepend-inner-icon="mdi-coin"
            label="Value"
          >
          </v-text-field>
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
          <v-btn
            color="primary"
            :disabled="isRegisterProduct"
            block
            @click="registerProduct"
            >REGISTER
            <v-progress-circular
              indeterminate
              v-if="isRegisterProduct"
              size="20"
              color="white"
            ></v-progress-circular>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar location="center" color="success" v-model="snackbar"
      >Product deleted!</v-snackbar
    >
  </v-app>
</template>

<script setup>
const snackbar = ref(false);
const dialogOpen = ref(false);

const productEdit = ref(null);

const headers = [
  { title: "Name", key: "name" },
  { title: "Quantity", key: "quantity" },
  { title: "Value", key: "value" },
  { title: "Action", key: "action" },
];

const alertedit = ref({
  text: "",
  view: false,
  color: "",
});

const originalProductEdit = ref({}); // Armazenar os dados originais

const isDataChanged = computed(() => {
  // Comparar os dados originais com os dados atuais
  return (
    productEdit.value.name !== originalProductEdit.value.name ||
    productEdit.value.quantity !== originalProductEdit.value.quantity ||
    productEdit.value.value !== originalProductEdit.value.value
  );
});

const productEditDialog = async (item) => {
  dialogOpen.value = true;
  productEdit.value = item;
  originalProductEdit.value = { ...item }; // Copiar os dados originais
};

const isRegisterProduct = ref(false);
const name_product = ref("");
const quantity = ref("");
const value_product = ref("");
const productDialog = ref(false);
const tableProducts = ref([]);
const registerProduct = async () => {
  try {
    isRegisterProduct.value = true;
    const { data, error } = await useFetch(
      "http://localhost:8080/produtos/cadastrar",
      {
        method: "post",
        body: JSON.stringify({
          name: name_product.value,
          value: value_product.value,
          quantity: quantity.value,
        }),
      },
    );
    isRegisterProduct.value = false;

    if (data.value) {
      alert.value.view = true;
      alert.value.color = "success";
      alert.value.text = "Product registered successfully!";
      name_product.value = null;
      value_product.value = null;
      quantity.value = null;

      listProducts();
    }
    if (error.value) {
      alert.value.view = true;
      alert.value.color = "error";
      alert.value.text = "Unregistered product";
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const { data, error } = await useFetch(
      `http://localhost:8080/produtos/deletar/${id}`,
      {
        method: "delete",
      },
    );
    if (data.value) {
      snackbar.value = true;
      dialogOpen.value = false;
      listProducts();
    }
    if (error.value) {
      //
    }
  } catch (error) {
    console.error(error);
  }
};

const alert = ref({
  text: "",
  view: false,
  color: "",
});

const productSaveEdit = async () => {
  try {
    const { data, error } = await useFetch(
      `http://localhost:8080/produtos/editar/${productEdit.value._id}`,
      {
        method: "put",
        body: JSON.stringify({
          name: productEdit.value.name,
          value: productEdit.value.value,
          quantity: productEdit.value.quantity,
        }),
      },
    );
    if (data.value) {
      alertedit.value.view = true;
      alertedit.value.text = "Product edited!";
      alertedit.value.color = "success";
      listProducts();
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

const listProducts = async () => {
  try {
    const { data } = await useFetch("http://localhost:8080/produtos/listar");
    if (data.value) {
      tableProducts.value = data.value;
    }
  } catch (error) {
    console.error(error);
  }
};

await listProducts();
</script>
<script>
import NavBar from "../../components/navbar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
