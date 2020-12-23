<template>
  <div>
    <banner-servicios></banner-servicios>
    <informacion></informacion>
    <articulos></articulos>
    <casos-exito></casos-exito>
    <div class="container-fluid">
      <div class="row justify-content-center mb-5">
        <br>
        <h2 class="text-center">Equipo</h2>
        <div class="col mt-5" v-for="(miembro,index) of Team" :key="index">
            <team-card :member="miembro"></team-card>            
        </div>        
      </div>
    </div>

    <seccion-footer></seccion-footer>
  </div>
</template>

<script>
import Articulos from '../components/Articulos.vue'
import BannerServicios from '../components/BannerServicios.vue'
import CasosExito from '../components/CasosExito.vue'
import Informacion from '../components/Informacion.vue'
import SeccionFooter from '../components/SeccionFooter.vue'
import TeamCard from '../components/TeamCard.vue'

export default {
  name: 'Home',
  components: {
    BannerServicios,
    Articulos,
    CasosExito,
    Informacion,
    SeccionFooter,
    TeamCard
  },
   data() {
    return {

      Team: [
           {
        codigo: 1,
        nombre: "Kevin Andres Balcazar",
        descripcion:
          "Vivo en Montería, estudiante de programación (Amateur). Mi comida favorita es el perro suizo. Mi película favorita es la saga predator. Mi nickname es Clark Kent.",
        rol: "Arquitecto de Software",
        image: "https://i.imgur.com/h1ibIMZ.jpg",
        correo: "kevin_balcazar9@hotmail.com",
      },
      {
        codigo: 2,
        nombre: "Deisy Katherine Pineda",
        descripcion:
          "Vivo en Bogotá. Estudiante de ing. mecatrónica. Mi comida favorita es pizza mexicana y lasaña. Mi película favorita es los 13 fantasmas. Mi nickname es Kathe o Kata.",
        rol: "Desarrollador Frontend",
        image: "https://i.imgur.com/zAoJz8Y.jpg",
        correo: "kte_0330@hotmail.com",
      },
      {
        codigo:3,
        nombre:"Andres Castaño",
        descripcion:"Vivo en Cali. Tecnologo Electrónico. Mi comida favorita la lasagna. Apasionado por el cine y la investigación. Mi peliculas favorita Interstellar. Mi nickname Mich.",
        rol:"Desarrollador Backend",
        image:"https://i.ibb.co/qxdLFkQ/icon3.jpg"
    },
      {
        codigo: 4,
        nombre: "Jhon Jairo Sanabria",
        descripcion:
          "Vivo en Bogotá. Mi profesión ingeniero electrónico. Mi comida favorita es la pasta, wraps y sushi. Mi película favorita es Matrix. Mi nickname es JJ",
        rol: "Analista Tester",
        image: "https://i.imgur.com/FPDZUXl.jpg",
        correo: "auyeco@hotmail.com",
      }
      ],
      



    };
  },
}
</script>
