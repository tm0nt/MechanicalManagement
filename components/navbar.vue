<template>
  <v-navigation-drawer v-model="drawer" permanent expand-on-hover rail>
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="My company name"
      nav
    >
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        to="/dashboard/"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        to="/dashboard/account/"
        title="My account"
        value="account"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-archive"
        to="/dashboard/products/"
        title="Products"
        value="products"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-order-bool-descending-variant"
        to="/dashboard/order/"
        title="Orders"
        value="order"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        to="/dashboard/clients/"
        title="Clients"
        value="clients"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-car"
        to="/dashboard/cars/"
        title="Cars"
        value="cars"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        value="logout"
        @click="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
<script setup>
const logout = () => {
  localStorage.clear();
  navigateTo("/");
};
</script>
