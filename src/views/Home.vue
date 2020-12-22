<template>
  <div>
    <banner-servicios></banner-servicios>
    <articulos></articulos>
    <casos-exito></casos-exito>
  </div>
</template>

<script>
import Articulos from '../components/Articulos.vue'
import BannerServicios from '../components/BannerServicios.vue'
import CasosExito from '../components/CasosExito.vue'

export default {
  name: 'Home',
  components: {
    BannerServicios,
    Articulos,
    CasosExito
  }
}
</script>
