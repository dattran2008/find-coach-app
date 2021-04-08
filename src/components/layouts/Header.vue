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

    // watchEffect(() => {
    //   activeIndex.value = route.path;
    // });

    return { activeIndex };
  },
};
</script>

<style lang="scss" scoped></style>
