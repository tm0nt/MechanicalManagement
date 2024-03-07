<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col offset="2">
          <h1>Clients</h1>
          <v-chip variant="outlined" class="mt-2">View data of yours</v-chip>
          <v-data-table :headers="headers" :items="desserts" density="compact">
            <template v-slot:top>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogOpen" width="500">
                <v-card class="rounded-xl">
                  <v-card-title>
                    <span class="text-h5"
                      ><v-icon @click="dialog = false" size="small" class="ma-2"
                        >mdi-close</v-icon
                      >{{ formTitle }}</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <h2 class="text-subtitle-1 mb-4">Client data</h2>
                      <v-row>
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
                      <h2 class="text-subtitle-1 mb-4">Orders list</h2>
                      <v-row>
                        <v-expansion-panels class="my-4" variant="inset">
                          <v-expansion-panel
                            v-for="i in 3"
                            :key="i"
                            title="Item"
                          >
                          <template v-slot:text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            <v-btn color="primary" class="ma-2" variant="text">PRINT ORDER</v-btn>
                          </template>
                        </v-expansion-panel>
                        </v-expansion-panels>
                      </v-row>
                      <v-row>
                        <h2 class="text-subtitle-1 mb-4">
                          Client files
                        </h2>
                        <v-col cols="12">
                          <v-file-input variant="outlined" color="primary" rounded="lg"></v-file-input>
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
      { title: "Email", key: "calories" },
      { title: "Last order", key: "calories" },
      { title: "Created at", key: "calories" },
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
      return this.editedIndex === -1 ? "Info client" : "Info client";
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

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen = true;
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
