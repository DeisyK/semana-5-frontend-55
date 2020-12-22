<template>
  <div>
    <div>
      <h2>Servicios</h2>
    </div>
    <div>
      <v-container fluid> </v-container>
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-md-3 g-5">
          <div v-for="(articulo, index) of Articulos" :key="index">
            <div class="col">
              <div class="card text-white bg-dark">
                <v-card>
                  <v-card-title>
                    {{ articulo.nombre }}
                  </v-card-title>
                  <div class="d-flex justify-content-center p-2">
                    <v-img src="../assets/logo.png"></v-img>
                  </div>
                  <v-card-text>
                    {{ articulo.descripcion }}
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["member"],
  data: () => ({
    Articulos: [],
    articuloMuestra: {
      codigo: "",
      nombre: "",
      descripcion: "",
      categoriaId: "",
      estado: 1,
    },
  }),
  created() {
    this.agregarArticulos();
  },
  methods: {
    async list() {
      try {
        let response = await this.$http.get("api/articulo/list");
        this.Articulos = response.data;
        // swal("Exito!", "Se han listado los articulos correctamente", "success");
        console.log(response.request.responseURL);
      } catch (error) {
        swal("Oops!", "Algo salio Mal!", "error");
        return error;
      }
    },
    agregarArticulos() {
      this.list();
    },
  },
};
</script>