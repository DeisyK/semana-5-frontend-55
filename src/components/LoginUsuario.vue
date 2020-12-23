<template>
  <div>
    <v-parallax src="../assets/fondoLogin.jpeg" height="100%">
      <v-container class="login">
        <v-card max-width="500px" class="row g-3 align-items-center">
          <v-card-title > Iniciar Sesion </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="login.email"
                    label="Email"
                    :rules="[reglas.campoVacio(), reglas.campoEmail()]"
                    type="email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="login.password"
                    label="Contraseña"
                    :rules="[reglas.campoVacio()]"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-1" text @click="borrar"> Borrar </v-btn>
            <v-btn color="orange darken-1" text @click="iniciarSesion">
              Iniciar Sesion
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-parallax>
  </div>
</template>

<script>
import swal from 'sweetalert';
export default {
  data: () => ({
    reglas: {
      campoVacio: (len) => (v) =>
        v.length != 0 || `Campo Vacio: el campo no debe estar vacio`,
      campoEmail: (len) => (v) =>
        !!v.match(/@/) || `Correo Invalido, Por favor ingresa un correo valido`,
    },
    login: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async iniciarSesion() {
      try {
        this.$http.post("api/usuario/login",this.login)
            .then((response)=>{
                let token = response.data.tokenReturn;
                let usuario = response.data.usuario;
                console.log(response.request.responseURL);
                if (token){
                    localStorage.setItem('token',token);
                    localStorage.setItem('usuario',JSON.stringify(usuario));
                    swal("Exito", "Ha iniciado session correctamente", "success");
                    this.$router.push('/Perfil');
                }
            })
            .catch(error => {
                swal("Error","¡Algo salio Mal!","error")
                return error
            })
      } catch (error) {
        swal("Oops!", "Algo salio Mal!", "error");
      }
    },
    iniciar() {},
    borrar() {
      this.login.email = "";
      this.login.password = "";
    },
  },
};
</script>
<style>
.login {
  margin-top: 10%;
  margin-bottom: 10%;
  align-content: center;
}
</style>
  