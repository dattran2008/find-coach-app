<template>
  <section class="home">
    <h1>Explore our services</h1>
    <home-carousel></home-carousel>
    <div class="container">
      <h3>Home page</h3>
      <home-section></home-section>
    </div>
  </section>
</template>

<script>
import HomeCarousel from '@/components/molecules/homepage/carousel.vue';
import HomeSection from '@/components/molecules/homepage/index.vue';

export default {
  components: { HomeCarousel, HomeSection },
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 30px auto 0;
}
</style>
