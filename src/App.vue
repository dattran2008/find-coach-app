<template>
  <el-header>
    <layout-header />
  </el-header>
  <el-main>
    <router-view v-slot="slot">
      <transition name="el-fade-in-linear">
        <component :is="slot.Component"></component>
      </transition>
    </router-view>
    <el-backtop target="#app"></el-backtop>
  </el-main>
  <el-footer>
    <layout-footer></layout-footer>
  </el-footer>
</template>

<script>
import LayoutHeader from '@/layouts/Header.vue';
import LayoutFooter from '@/layouts/Footer.vue';

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
  /* The height minus 60 pixels here is the height of the top navigation bar. Avoid the scroll bar that comes with the browser */
  height: calc(100vh - 60px);
  /* Automatic display scroll bar for overflow height */
  overflow: auto;
}

body {
  margin: 0;
}

.el-main {
  text-align: center;
  margin-bottom: 40px;

  .el-backtop {
    background-color: #5488c7;
    color: #fff;
    border-radius: 0.188rem;
  }
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
