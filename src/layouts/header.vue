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
      <el-image style="height: 100px" :src="logoUrl" fit="cover"></el-image>
    </el-menu-item>
    <el-menu-item index="0" :route="{ path: '/' }"> Home Center </el-menu-item>
    <el-menu-item index="1" :route="{ path: '/coaches' }">
      All Coaches
    </el-menu-item>
    <el-menu-item v-if="isLoggedIn" index="2" :route="{ path: '/requests' }">
      Requests
    </el-menu-item>
    <menu-login-item
      :isLoggedIn="isLoggedIn"
      :userEmail="userEmail"
      :logout="handleLogout"
    />
  </el-menu>
</template>

<script>
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Logo from '@/assets/images/coach.svg';
import MenuLoginItem from '@/components/molecules/header/login.vue';

export default {
  components: { MenuLoginItem },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const paths = ['/coaches', '/requests'];
    const logoUrl = Logo;
    const { $loading } = inject('plugins');

    const userEmail = computed(() => store.getters.email);
    const isLoggedIn = computed(() => store.getters.isAuthenticated);
    const activeIndex = computed(() => {
      let selected = '';
      if (route.path.length > 1) {
        const result = paths.findIndex((el) => route.path.includes(el));
        selected = result + 1;
      } else {
        selected = 0;
      }
      return selected.toString();
    });

    // Handle logout
    const handleLogout = async () => {
      const loading = $loading({
        lock: true,
        text: 'Processing....',
      });
      await store.dispatch('logout');
      setTimeout(() => {
        loading.close();
        router.replace('/');
      }, 500);
    };

    return { activeIndex, logoUrl, userEmail, isLoggedIn, handleLogout };
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
</style>
