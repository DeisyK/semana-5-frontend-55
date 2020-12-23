<template>
  <v-footer color="darck lighten-1" padless>
    <v-row justify="center" no-gutters>
      <h5 class="text-center">Contactanos</h5>
      <v-col
        v-for="(contacto,nombre) in contacto"
        :key="nombre"
        color="white"
        text
        rounded
        class="my-2"
      >
        <p>{{ contacto.ciudad }}</p>
        <p>{{ contacto.direccion }}</p>
        <p>{{ contacto.telefono }}</p>
      </v-col>
    
      <v-col class="text-right">
        <v-spacer></v-spacer>
        <p>missionm@tripulante55.com</p>
        <p>
            <a
              href="https://github.com/DeisyK/semana-5-frontend-55/tree/master"
              class="badge badge-dark text-light"
              target="_blank"
            >
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/github-163-761603.png"
                alt="Imagen Noticia 2" style="height: 3em; width: 3em;"
              />
              Repositorio Frontend
            </a>
          </p>
          <p>
            <a
              href="https://github.com/DeisyK/semana-4-55/tree/master"
              class="badge badge-dark text-light"
              target="_blank"
            >
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/github-163-761603.png"
                alt="Imagen Noticia 2" style="height: 3em; width: 3em;"
              />
              Repositorio Backend
            </a>
          </p>
      </v-col>
  
      <v-col class="orange lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>UTP</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    contacto: [
      {
        ciudad: "Bogotá D.C.",
        direccion: "Calle Joaquin # 18 - 18",
        telefono: 2582320,
      },
      {
        ciudad: "Cali, Valle del Cauca",
        direccion: "Transito # 1 - 2",
        telefono: 1059870,
      },
      {
        ciudad: "Montelíbano, Cordoba",
        direccion: "Calle Balderas # 26 - 38",
        telefono: 2883597,
      },
    ],
  }),
};
</script>