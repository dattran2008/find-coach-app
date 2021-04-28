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
  bottom: 0;
  width: 100%;

  padding: 5em 0 0 0;
  background: #131719;
  margin-top: 50px;
}
</style>
