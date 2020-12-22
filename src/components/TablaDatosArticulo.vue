<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="articulo"
      sort-by="id"
      class="elevation-1"
       :loading="barraCarga"
        loading-text="Cargando Articulos... Espera por favor"
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                        :rules="[reglas.campoVacio()]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.descripcion"
                        label="Descripcion"
                        :rules="[reglas.campoVacio(), reglas.descripcionDesborde(250)]"
                        counter="250"
                        auto-grow
                      ></v-text-field>
                    </v-col>                    
                    <v-col cols="12" sm="6" md="4">
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
                >Estas seguro que deseas eliminar el articulo</v-card-title
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
import axios from "axios"
export default {
  data: () => ({
    dialog: false,
    backend:'http://localhost:3000/',
    dialogDelete: false,
    barraCarga: true,
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
    this.barraCarga=true;
    this.initialize();
    this.barraCarga=false;
  },

  methods: {
    list(){
      axios.get(this.backend+'api/articulo/list')
      .then( (response) => {
        this.articulo = response.data
      })
      .catch(error =>{
        return error
      })
      
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

    deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        axios.put(this.backend + "api/articulo/deactivate", {id: this.editedItem.id});
      } else {
        axios.put(this.backend + "api/articulo/activate", {id: this.editedItem.id});
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

    save() {
      if (this.editedIndex > -1) {
        let objetoBusqueda = {
          categoriaId: this.editedItem.categoriaId,
          codigo: this.editedItem.codigo,
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          id: this.editedItem.id,
        };
        axios.put(this.backend + "api/articulo/update", objetoBusqueda);
        Object.assign(this.articulo[this.editedIndex], this.editedItem);
      } else {
        let objetoBusqueda = {
          categoriaId: this.editedItem.categoriaId,
          codigo: this.editedItem.codigo,
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          estado: 1,
        };
        axios.post(this.backend + "api/articulo/add", objetoBusqueda);
        this.articulo.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>