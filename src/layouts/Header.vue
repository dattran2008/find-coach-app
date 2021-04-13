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
    const url = Logo;
    // watchEffect(() => {
    //   activeIndex.value = route.path;
    // });

    return { activeIndex, url };
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 400px;
  display: flex;
  align-items: center;
  font-size: 20px;

  span {
    margin-left: 10px;
  }
}
</style>
