<template>
  <div>
    <banner-servicios></banner-servicios>
    <informacion></informacion>
    <articulos></articulos>
    <casos-exito></casos-exito>
  </div>
</template>

<script>
import Articulos from '../components/Articulos.vue'
import BannerServicios from '../components/BannerServicios.vue'
import CasosExito from '../components/CasosExito.vue'
import Informacion from '../components/Informacion.vue'

export default {
  name: 'Home',
  components: {
    BannerServicios,
    Articulos,
    CasosExito,
    Informacion
  }
}
</script>
