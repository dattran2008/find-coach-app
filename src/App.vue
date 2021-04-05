<template>
  <el-header>
    <layout-header />
  </el-header>
  <el-main>
    <router-view />
  </el-main>
  <el-footer>
    <layout-footer></layout-footer>
  </el-footer>
</template>

<script>
import LayoutHeader from '@/components/layouts/Header.vue';
import LayoutFooter from '@/components/layouts/Footer.vue';

export default {
  components: { LayoutHeader, LayoutFooter },
  setup() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
}

.el-main {
  text-align: center;
  margin-bottom: 40px;
}

.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
