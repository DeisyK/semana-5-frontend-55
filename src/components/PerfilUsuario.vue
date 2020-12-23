<template>
  <div>
    <div>
      <v-card class="mx-auto" max-width="100%" tile>
        <v-img
          height="100%"
          src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
        >
          <v-row align="end" class="fill-height">
            <v-col align-self="start" class="pa-0" cols="12">
              <v-avatar class="profile" color="grey" size="164" tile>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">
                      lolo
                  </v-list-item-title>
                  <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </div>
    <v-spacer></v-spacer>
    <div class="align-self-center">
      <v-btn depressed color="error" @click="cerrarSesion" class="">
        Cerrar Sesion</v-btn
      >
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
export default {
  data: () => ({}),
  usuario:[],

  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      swal(
        "Terminar Sesion",
        "Has terminado la sesion exitosamente",
        "success"
      );
      this.$router.push("/");
    },
  },
};
</script>