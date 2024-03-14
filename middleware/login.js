import nuxtStorage from "nuxt-storage";

export default defineNuxtRouteMiddleware((to, from) => {
  if (nuxtStorage.localStorage.getData("token")) {
    return navigateTo("/dashboard/");
  }
});
