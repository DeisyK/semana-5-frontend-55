<template>
  <!--Seccion Banner servicios-->
  <div id="carouselServicio" class="carousel slide" data-bs-ride="carousel">
    <ol class="carousel-indicators">
      <li
        data-bs-target="#carouselServicio"
        data-bs-slide-to="0"
        class="active"
      ></li>
      <li data-bs-target="#carouselServicio" data-bs-slide-to="1"></li>
      <li data-bs-target="#carouselServicio" data-bs-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../assets/bannerInvestigacion.jpg"
          class="d-block w-100"
          alt="Imagen Investigacion"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../assets/bannerAnalisis.jpg"
          class="d-block w-100"
          alt="Imagen Analisis"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../assets/bannerEstrategia.jpg"
          class="d-block w-100"
          alt="Imagen Estrategia"
        />
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselServicio"
      role="button"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselServicio"
      role="button"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
</template>
<script>
export default {
 
};
</script>