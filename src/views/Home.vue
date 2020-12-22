<template>
  <div>
    <banner-servicios></banner-servicios>
    <articulos></articulos>
  </div>
</template>

<script>
import Articulos from '../components/Articulos.vue'
import BannerServicios from '../components/BannerServicios.vue'

export default {
  name: 'Home',
  components: {
    BannerServicios,
    Articulos
  }
}
</script>
