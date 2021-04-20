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
    <div class="menu-login">
      <router-link v-if="!isLoggedIn" to="/auth" tag="button">
        <el-button type="info" plain round style="margin-top: 10px">
          Login
        </el-button>
      </router-link>
      <el-dropdown
        v-else
        trigger="click"
        style="color: white; margin: 7px 0"
        placement="bottom-end"
      >
        <div class="el-dropdown-link">
          <el-avatar
            size="small"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            alt="Avatar"
          ></el-avatar>
          <div class="el-dropdown-link__text">
            {{ userEmail || 'Anonymous Name' }}
          </div>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="header">
            <el-dropdown-item icon="el-icon-user-solid">
              Profile
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-cooperation">
              Your coach
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Logo from '@/assets/images/coach.svg';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const paths = ['/coaches', '/requests'];
    const logoUrl = Logo;
    const { $loading } = inject('plugins');

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

    const userEmail = computed(() => store.getters.email);
    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    // Handle logout
    const logout = async () => {
      const loading = $loading({
        lock: true,
        text: 'Processing...',
      });
      await store.dispatch('logout');
      setTimeout(() => {
        loading.close();
        router.replace('/');
      }, 500);
    };

    return { activeIndex, logoUrl, userEmail, isLoggedIn, logout };
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
  margin: 0 30px;

  &:focus {
    outline: 0;
    border: none;
  }
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  padding: 8px 10px;

  &__text {
    vertical-align: middle;
    max-width: 120px;
    color: inherit;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 10px;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(41, 75, 114, 0.5);
    border-radius: 5px;
  }

  .el-dropdown__popper {
    &.el-popper.is-light.is-pure {
      letter-spacing: 1px;
    }
  }
}
</style>
