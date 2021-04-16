<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :default-active="activeIndex"
    active-text-color="#ffd04b"
    text-color="#fff"
    background-color="#545c64"
    :router="true"
  >
    <el-menu-item class="title">
      <template #title>
        <span> Find my coach </span>
      </template>
      <el-image style="height: 100px" :src="url" fit="cover"></el-image>
    </el-menu-item>
    <el-menu-item index="0" :route="{ path: '/' }"> Home Center</el-menu-item>
    <el-menu-item index="1" :route="{ path: '/coaches' }">
      All Coaches
    </el-menu-item>
    <el-menu-item index="2" :route="{ path: '/requests' }">
      Requests
    </el-menu-item>
    <div class="menu-login">
      <router-link to="/auth" tag="button">
        <el-button type="info" plain round>Login</el-button>
      </router-link>
    </div>
  </el-menu>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Logo from '@/assets/images/coach.svg';

export default {
  setup() {
    const route = useRoute();
    const paths = ['/coaches', '/requests'];
    const url = Logo;

    const activeIndex = computed(() => {
      let selected = '';
      if (route.path.length > 1) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < paths.length; i++) {
          if (route.path.includes(paths[i])) {
            selected = i + 1;
            break;
          }
        }
      } else {
        selected = 0;
      }
      return selected.toString();
    });

    return { activeIndex, url };
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 450px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: 'Courier New', Courier, monospace;

  span {
    margin: 0 15px 0 10px;
  }
}

.menu-login {
  text-align: right;
  margin: 10px 30px 0;
}
</style>
