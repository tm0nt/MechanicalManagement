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
            <v-data-table
              :headers="headers"
              :items="desserts"
            >
              <template v-slot:top>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" width="auto">
                    <template v-slot:activator="{ props }">
                      <v-btn class="mb-2" color="primary" dark v-bind="props">
                        NEW SERVICE 
                      </v-btn>
                    </template>
                    <v-card class="rounded-xl">
                      <v-card-title>
                        <span class="text-h5"><v-icon @click="dialog = false" size="small" class="ma-2">mdi-close</v-icon>{{ formTitle }}</span>
                      </v-card-title>
  
                      <v-card-text>
                        <v-container>
                          <h2 class="text-subtitle-1 mb-4">Client data</h2>
                          <v-row v-if="showAdditionalFields">
                            <v-col cols="12" md="6" sm="6">
                              <v-text-field
                                v-model="editedItem.name"
                                label="Name"
                                prepend-inner-icon="mdi-account"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6">
                              <v-text-field
                                v-model="editedItem.calories"
                                label="Last name"
                                type="text"
                                prepend-inner-icon="mdi-account"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6" class="mt-n8">
                              <v-text-field
                                v-model="editedItem.name"
                                label="Email"
                                type="text"
                                prepend-inner-icon="mdi-email"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6" class="mt-n8">
                              <v-text-field
                                v-model="editedItem.calories"
                                label="Phone"
                                type="text"
                                prepend-inner-icon="mdi-phone"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6" class="mt-n8">
                              <v-text-field
                                v-model="editedItem.name"
                                label="Address"
                                type="text"
                                prepend-inner-icon="mdi-city"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6" class="mt-n8">
                              <v-text-field
                                v-model="editedItem.calories"
                                prepend-inner-icon="mdi-numeric"
                                label="ZIP Code"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            </v-row>
                            <v-row>
        <v-col cols="12">
          <v-btn @click="toggleAdditionalFields" v-show="selectedClient === 'REGISTER CLIENT'">
            Toggle Additional Fields
          </v-btn>
        </v-col>
      </v-row>
  
                            <v-row>
                            <v-col cols="12">
                              <v-select :items="['Mario', 'Bruno']" label="Select client" density="comfortable" variant="outlined" rounded="lg0"  prepend-inner-icon="mdi-account"></v-select>
                            </v-col>
  
                            </v-row>
                            <h2 class="text-subtitle-1 mb-4">Service data</h2>
                            <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="editedItem.name"
                                label="License plate"
                                prepend-inner-icon="mdi-license"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n8">
                              <v-text-field
                              prepend-inner-icon="mdi-text"
                                v-model="editedItem.calories"
                                
                                label="Describe the service"
                                type="text"
                              ></v-text-field>
                              </v-col>
                              <v-col cols="12" class="mt-n8">
                              <v-text-field
                                v-model="editedItem.calories"
                                prepend-inner-icon="mdi-coin"
                                label="Value total"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <p class="mb-4 mt-n4">Upload files</p>
                              <v-file-input	rounded="lg" color="primary" density="comfortable" closable multiples chips variant="outlined"></v-file-input>
                              <v-card color="black" rounded="xl" class="elevation-0" flat width="80" height="80">
                              </v-card>
                            </v-col>
  
                            </v-row>
                            <v-col cols="12">
                              <v-btn color="primary" block>CADASTRAR</v-btn>
                            </v-col>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogInfo" width="auto">
                    <v-card class="rounded-xl" title="About a order" subtitle="Review, closed and print a order">
                        <template v-slot:prepend>
                            <v-icon @click="dialogInfo = false">mdi-close</v-icon>
                        </template>
                        <v-card-text>
                        <v-container>
                          <h2 class="text-subtitle-1 mb-4">Client data</h2>
                          <v-row>
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
                                v-model="editedItem.calories"
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
                            <h2 class="text-subtitle-1 mb-4">Service data</h2>
                            <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="editedItem.name"
                                label="License plate"
                                prepend-inner-icon="mdi-license"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n8">
                              <v-text-field
                              prepend-inner-icon="mdi-text"
                                v-model="editedItem.calories"
                                
                                label="Describe the service"
                                type="text"
                              ></v-text-field>
                              </v-col>
                              <v-col cols="12" class="mt-n8">
                              <v-text-field
                                v-model="editedItem.calories"
                                prepend-inner-icon="mdi-coin"
                                label="Value total"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <p class="mb-4 mt-n4">Upload files</p>
                              <v-file-input	rounded="lg" color="primary" density="comfortable" closable multiples chips variant="outlined"></v-file-input>
                              <h2 class="text-subtitle-1 mb-4">Files uploaded</h2>
                              <v-card color="black" rounded="xl" class="elevation-0" flat width="80" height="80" prepend-icon="mdi-close" link>
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
  
                <v-icon size="large"   @click="deleteItem(item)">
                  mdi-info
                </v-icon>
              </template>
              <template v-slot:no-data>
              </template>
            </v-data-table>
  
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  
  <script setup>
  
  const selectedClient = ref(null);
  const showAdditionalFields = ref(false);
  
  const toggleAdditionalFields = () => {
        showAdditionalFields.value = !showAdditionalFields.value;
      };
  
  </script>
  <script>
  import NavBar from "../../components/navbar.vue";
  
  export default {
    data: () => ({
      dialog: false,
      dialogInfo: false,
      headers: [
        {
          title: "License plate",
          key: "name",
        },
        {title: 'Client', key: 'name'},
        {title: 'Turnaround Time', key: 'calories'},
        {title: 'Status', key: 'calories'},
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
        return this.editedIndex === -1 ? "New service" : "Edit Item";
      },
    },
  
    
    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogInfo(val) {
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
  
      deleteItem(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogInfo = true;
      },
  
      deleteItemConfirm() {
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
        this.dialogInfo = false;
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
  