<template>
  <div id="servicios">
    <div>
      <h2>Servicios</h2>
    </div>
    <div>
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-md-3 g-1">
          <div v-for="(categoria, id) of categorias" :key="id">
            <div class="col" :class="colorCuadro(id)">
              <div class="card text-white bg-dark">
                <v-col>
                  {{ categoria.nombre }}
                  <div v-for="(articulo, id) of articulos" :key="id">
                    <v-card v-if="articulo.categoriaId == categoria.id">
                      <v-card-title>
                        {{ articulo.nombre }}
                      </v-card-title>
                      <div class="d-flex justify-content-center p-2">
                        <v-img v-bind:src="getImagen(articulo)" ></v-img>>
                      </div>
                      <v-card-text>
                        {{ articulo.descripcion }}
                      </v-card-text>
                    </v-card>
                  </div>
                </v-col>
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
    articulos: [],
    categorias: [],
  }),
  created() {
    this.agregar();
  },
  methods: {
    async list() {
      try {
        let response = await this.$http.get("api/articulo/list");
        this.articulos = response.data;
        // swal("Exito!", "Se han listado los articulos correctamente", "success");
        console.log(response.request.responseURL);
      } catch (error) {
        swal("Oops!", "Algo salio Mal!", "error");
        return error;
      }
    },
    async listCategoria() {
      try {
        let response = await this.$http.get("api/categoria/list");
        this.categorias = response.data;
        // swal("Exito!", "Se han listado los articulos correctamente", "success");
        console.log(response.request.responseURL);
      } catch (error) {
        swal("Oops!", "Algo salio Mal!", "error");
        return error;
      }
    },
    agregar() {
      this.list();
      this.listCategoria();
    },
    colorCuadro(id) {
      if (id == 0) {
        return "bg-warning";
      } else if (id == 1) {
        return "bg-info";
      } else {
        return "bg-danger";
      }
    },
    getImagen(articulo) {
        if (articulo.urlImagen==null) {
            return 'https://image.freepik.com/vector-gratis/concepto-landing-page-fallo-tecnico_23-2148249256.jpg'
        }else {
            return articulo.urlImagen
        }
      
    },
  },
};
</script>