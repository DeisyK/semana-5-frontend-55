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

        <v-list-group sub-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Usuario</v-list-item-title>
          </template>
          <v-list-item v-for="([titulo, icono, ruta], i) in usuario" :key="i" :to="ruta" link>
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
          <v-list-item v-for="([titulo, icono,ruta], i) in cruds" :key="i" :to="ruta" link>
            <v-list-item-title v-text="titulo"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icono"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item to="Login" link>
            <v-list-item-title>Iniciar Sesion </v-list-item-title>
            <v-list-item-icon>
                <v-icon>mdi-account-lock</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    usuario: [["Perfil", "mdi-card-account-details",'Perfil']],
    cruds: [
      ["Usuarios", "mdi-human-edit", "TablaUsuario"],
      ["Categorias", "mdi-notebook-edit", "TablaCategoria"],
      ["Articulos", "mdi-file-document-edit", "TablaArticulo"],
    ],
  }),
};
</script>