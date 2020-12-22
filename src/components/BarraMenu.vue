<template>
  <div>
    <v-card class="mx-auto" width="300">
      <v-list>
        <v-list-item to="/">
          <v-list-item-avatar>
            <img src="../assets/logoMissionMarket55.png" />
          </v-list-item-avatar>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
        <template v-if="logueo">
          <v-list-group sub-group prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>Usuario</v-list-item-title>
            </template>
            <v-list-item
              v-for="([titulo, icono, ruta], i) in usuario"
              :key="i"
              :to="ruta"
              link
            >
              <v-list-item-title v-text="titulo"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="icono"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group sub-group prepend-icon="mdi-database-settings">
            <template v-slot:activator>
              <v-list-item-title>Administacion</v-list-item-title>
            </template>
            <v-list-item
              v-for="([titulo, icono, ruta], i) in cruds"
              :key="i"
              :to="ruta"
              link
            >
              <v-list-item-title v-text="titulo"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="icono"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-item @click="cerrarSesion" to="/" link>
            <v-list-item-title>Cerrar Sesion </v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-account-lock</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item @click="iniciarSesion" to="Login" link>
            <v-list-item-title>Iniciar Sesion </v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-account-lock</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    usuario: [["Perfil", "mdi-card-account-details", "Perfil"]],
    logueo: false,
    cruds: [
      ["Usuarios", "mdi-human-edit", "TablaUsuario"],
      ["Categorias", "mdi-notebook-edit", "TablaCategoria"],
      ["Articulos", "mdi-file-document-edit", "TablaArticulo"],
    ],
  }),
  methods: {
    cerrarSesion() {
      console.log(this.logueo);
      localStorage.removeItem("token");
      this.logueo = false;
      //swal("Terminar Sesion","Has terminado la sesion exitosamente","success")
    },
    iniciarSesion() {
      console.log(this.logueo);
      this.logueo = true;
    },
  },
};
</script>