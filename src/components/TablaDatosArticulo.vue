<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="articulo"
      sort-by="id"
      class="elevation-1"
       :loading="cargando"
        loading-text="Cargando articulos... Espera por favor"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lista De Articulos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar Articulo
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.codigo"
                        label="Codigo"
                        :rules="[reglas.campoVacio()]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                        :rules="[reglas.campoVacio()]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.descripcion"
                        label="Descripcion"
                        :rules="[reglas.campoVacio(), reglas.descripcionDesborde(250)]"
                        counter="250"
                        auto-grow
                      ></v-textarea>
                    </v-col>     
                  </v-row>
                  <v-row>               
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.categoriaId"
                        label="Categoria"                        
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="orange darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Estas seguro que deseas {{estadoObjeto()}} el articulo</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="orange darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cargando: true,
    reglas:{      
      campoVacio: len => v => v.length != 0 || `Campo Vacio: el campo no debe estar vacio`,
      descripcionDesborde: len => v => v.length < len || `Descripcion Invalida: la descriocion debe ser menor a ${len} caracteres`,
      email: v => !! v.match(/@/) || `Correo Invalido, Por favor ingresa un correo valido`,
    },
    headers: [
      { text: "Id", value: "id", align: "star" },
      { text:"Codigo", value: "codigo"},
      { text: "Nombre", value: "nombre" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Categoria", value: "categoriaId"},
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    articulo: [],
    editedIndex: -1,
    editedItem: {
      codigo: "",
      nombre: "",
      descripcion: "",
      categoriaId: "",
      estado: 1,
    },
    defaultItem: {
      codigo: "",
      nombre: "",
      descripcion: "",
      categoriaId: "",
      estado: 1,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Articulo" : "Editar Articulo";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async list(){
      try {
        let response = await this.$http.get('api/articulo/list')
        this.articulo = response.data;
        // swal("Exito!", "Se han listado los articulos correctamente", "success"); 
        console.log(response.request.responseURL)
      } catch (error) {
        swal("Oops!", "Algo salio Mal!", "error");
        return error;          
      }       
    },
    initialize() {
      this.list()
    },
    editItem(item) {
      this.editedIndex = this.articulo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.articulo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        // axios.put(this.backend + "api/articulo/deactivate", {id: this.editedItem.id});
        try {
          let response = await this.$http.put('api/articulo/deactivate',{id: this.editedItem.id})
          swal("Exito!", "Articulo DESACTIVADO", "success"); 
        } catch (error) {
          swal("Oops!", "Algo salio Mal!", "error");
          return error;          
       }
      } else {
        // axios.put(this.backend + "api/articulo/activate", {id: this.editedItem.id});
        try {
          let response = await this.$http.put('api/articulo/activate',{id: this.editedItem.id})
          swal("Exito!", "Articulo ACTIVADO", "success"); 
        } catch (error) {
          swal("Oops!", "Algo salio Mal!", "error");
          return error;          
        }
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.list()
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.list()
    },

    async save() {
      if (this.editedIndex > -1) {
        let objetoBusqueda = {
          categoriaId: this.editedItem.categoriaId,
          codigo: this.editedItem.codigo,
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          id: this.editedItem.id,
          
        };
        // axios.put(this.backend + "api/articulo/update", objetoBusqueda);
        try {
          let response = await this.$http.put('api/articulo/update',objetoBusqueda)
          swal("Exito!", "Articulo ACTUALIZADO", "success"); 
          console.log(this.editedItem.categoriaId)
        } catch (error) {
          swal("Oops!", "Algo salio Mal!", "error");
          return error;          
        }
        Object.assign(this.articulo[this.editedIndex], this.editedItem);
      } else {
        let objetoBusqueda = {
          categoriaId: this.editedItem.categoriaId,
          codigo: this.editedItem.codigo,
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          estado: 1,
        };
        // axios.post(this.backend + "api/articulo/add", objetoBusqueda);
        try {
          let response = await this.$http.post('api/articulo/add',objetoBusqueda)
          swal("Exito!", "Articulo AGREGADO", "success"); 
        } catch (error) {
          swal("Oops!", "Algo salio Mal!", "error");
          return error;          
        }
        this.articulo.push(this.editedItem);
      }
      this.list();
      this.close();
    },
  estadoObjeto(){
  if (this.editedItem.estado ===1 ){
    return "DESACTIVAR"
  }
  else {
    return "ACTIVAR"
  }
  },

  },
};
</script>