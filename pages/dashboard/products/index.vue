<template>
    <v-app>
      <NavBar />
      <v-container>
        <v-row>
          <v-col offset="2">
            <h1>Products</h1>
            <v-chip variant="outlined" class="mt-2">Register product</v-chip>
            <v-data-table :headers="headers" :items="desserts" density="compact">
              <template v-slot:top>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogOpen" width="500">
                  <v-card class="rounded-xl">
                    <v-card-title>
                      <span class="text-h5"
                        ><v-icon @click="dialogOpen = false" size="small" class="ma-2"
                          >mdi-close</v-icon
                        >{{ formTitle }}</span
                      >
                    </v-card-title>
  
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-sheet
                            class="text-body-2 mx-auto"
                            width="580"
                          >
                            <v-container fluid>
                              <v-row>
                                <v-col cols="12" md="3">
                                  <v-img
                                    height="80"
                                    src="https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png"
                                    cover
                                  ></v-img>
                                  <v-btn color="primary" block variant="tonal" rounded="xs"><v-icon>mdi-image</v-icon></v-btn>
                                </v-col>
  
                                <v-col cols="12" md="9">
                                  <h2>Product name</h2>
                                  <h4>Quantity: 256</h4>
                                  <h4>Value: £ 20.00</h4>
                                  
                             
                                  <v-btn
                                    class="text-none mt-2"
                                    color="primary"
                                    rounded="xl"
                                    variant="flat"
                                    block
                                  >
                                      Edit product
                                  </v-btn>
                                  <v-btn
                                    class="text-none mt-2"
                                    color="error"
                                    rounded="xl"
                                    variant="flat"
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
                <v-icon size="small" @click="registerProduct(item)"> mdi-info </v-icon>
              </template>
              <template v-slot:no-data> </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import NavBar from "../../components/navbar.vue";
  
  export default {
    data: () => ({
      dialog: false,
      dialogOpen: false,
      headers: [
        {
          title: "Name",
          key: "name",
        },
        { title: "Quantity", key: "calories" },
        { title: "Value", key: "calories" },
        { title: "Action", key: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "Info product" : "Info product";
      },
    },
  
    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogOpen(val) {
        val || this.closeDelete();
      },
    },
  
    created() {
      this.initialize();
    },
  
    methods: {
      initialize() {
        this.desserts = [
          {
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ];
      },
  
      registerProduct(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogOpen = true;
      },
  
      registerProductConfirm() {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
      },
  
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
  
      closeDelete() {
        this.dialogOpen = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
  
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
        } else {
          this.desserts.push(this.editedItem);
        }
        this.close();
      },
    },
    components: {
      NavBar,
    },
  };
  </script>
  