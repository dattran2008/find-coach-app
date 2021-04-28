<template>
  <el-header>
    <layout-header />
  </el-header>
  <el-main>
    <router-view v-slot="slot">
      <transition name="el-fade-in-linear" mode="out-in" appear>
        <component :is="slot.Component"></component>
      </transition>
    </router-view>
    <el-backtop></el-backtop>
  </el-main>
  <layout-footer></layout-footer>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import LayoutHeader from '@/layouts/header.vue';
import LayoutFooter from '@/layouts/footer.vue';
import { watch } from 'vue';

export default {
  components: { LayoutHeader, LayoutFooter },
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch('autoLogin');

    watch(
      () => route.params,
      () => {
        if (route.path === `/coaches/${route.params.id}/contact`) {
          store.commit('ui/show', false);
        } else {
          store.commit('ui/show', true);
        }
      },
    );
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  position: relative;
  /* The height minus 60 pixels here is the height of the top navigation bar. Avoid the scroll bar that comes with the browser */
  min-height: calc(100vh - 60px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header {
  padding: 0;
  height: auto !important;
}

.el-main {
  text-align: center;
  padding-bottom: 200px;

  .el-backtop {
    background-color: #5488c7;
    color: #fff;
    border-radius: 0.188rem;
  }
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
