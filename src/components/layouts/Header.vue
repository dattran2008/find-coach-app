<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="1" :route="{ path: '/' }"> Home Center</el-menu-item>
    <el-menu-item index="2" :route="{ path: '/coaches' }">
      All Coaches
    </el-menu-item>
    <el-menu-item index="3" :route="{ path: '/requests' }">
      Requests
    </el-menu-item>
  </el-menu>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const activeIndex = ref('1');
    return { activeIndex };
  },
};
</script>

<style lang="scss" scoped></style>
