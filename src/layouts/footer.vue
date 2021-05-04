<template>
  <el-footer>
    <main-footer />
  </el-footer>
</template>

<script>
import MainFooter from '@/components/molecules/footer/index.vue';

export default {
  components: { MainFooter },
};
</script>

<style lang="scss" scoped>
.el-footer {
  position: absolute;
  top: 100%;
  width: 100%;
  height: auto !important;
  margin-top: 50px;
  padding: 5em 0 0 0;
  background: $black-100;
}
</style>
