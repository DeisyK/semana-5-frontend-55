<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <barra-menu></barra-menu>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Mission Market 55</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view> </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Axios from 'axios';
import BarraMenu from "./components/BarraMenu.vue";
import HelloWorld from "./components/HelloWorld";

export default {
  components: { BarraMenu },
  data: () => ({ drawer: null }),
};
</script>
<style>
  h2 {
  margin-top: 1%;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
}
</style>