<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="categoria"
      sort-by="id"
      class="elevation-1"
      :loading="cargando"
      loading-text="Cargando categorias... Espera por favor"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lista De Categorias</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar Categoria
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
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
                        auto-grow
                        counter="250"
                        :rules="[
                          reglas.campoVacio(),
                          reglas.descripcionDesborde(250),
                        ]"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn
                  color="orange darken-1"
                  text
                  @click="save"
                  :disabled="botonGuardar"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Estas seguro que deseas cambiar el estado {{estadoObjeto()}} de la categoria</v-card-title
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
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cargando: true,
    botonGuardar: false,
    iconoCambio:"",
    reglas: {
      campoVacio: (len) => (v) => v.length != 0 || `Campo Vacio: el campo no debe estar vacio`,
      descripcionDesborde: (len) => (v) => v.length < len ||
        `Descripcion Invalida: la descriocion debe ser menor a ${len} caracteres`,
    },
    headers: [
      { text: "Id", value: "id", align: "star" },
      { text: "Nombre", value: "nombre" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    categoria: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      descripcion: "",
      id: 1,
      estado: 1,
    },

    defaultItem: {
      nombre: "",
      descripcion: "",
      estado: 1,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Categoria" : "Editar Categoria";
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
    list() {
      this.$axios.get("api/categoria/list")
        .then((response) => {
          this.categoria = response.data;
          this.cargando = false
        })
        .catch((error) => {
          return error;
        });
    },
    initialize() {
      this.list();
    },
    editItem(item) {
      this.editedIndex = this.categoria.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.categoria.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        this.$axios.put("api/categoria/deactivate", {id: this.editedItem.id});
      } else {
        this.$axios.put("api/categoria/activate", {id: this.editedItem.id});
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);

        this.editedIndex = -1;
      });
      this.list();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.list();
    },

    save() {
      if (this.editedIndex > -1) {
        let objetoBusqueda = {
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          id: this.editedItem.id,
        };
        this.$axios.put("api/categoria/update", objetoBusqueda);
      } else {
        let objetoBusqueda = {
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          estado: 1,
        };
        this.$axios.post("api/categoria/add", objetoBusqueda);
        this.categoria.push(this.editedItem);
      }
      this.list();
      this.close();
    },
    estadoObjeto(){
      if (this.editedItem.estado ===1 ){
        return "acticvado"
      }
      else {
        return "desactivado"
      }
    },
  },
};
</script>