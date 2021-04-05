<template>
  <h1>Profile</h1>
  <detail :selectedCoach="selectedCoach" @go-back="handleGoBack" />
  <el-divider>
    <i class="el-icon-star-on"></i>
    <i class="el-icon-star-on"></i>
    <i class="el-icon-star-on"></i>
  </el-divider>
  <div class="contact" v-if="selectedCoach">
    <h1 class="title">Contact Us</h1>
    <h3>Interested? Reach out now</h3>
    <el-button plain @click="contactLink">Start Here</el-button>
  </div>
  <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Detail from '@/components/coaches/list/detail/index.vue';

export default {
  props: ['id'],
  components: { detail: Detail },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const selectedCoach = store.getters['coaches/coaches'].find(
      (coach) => coach.id === props.id,
    );

    const contactLink = () => router.replace(`${route.path}/contact`);
    const handleGoBack = () => router.push('/coaches');

    return {
      selectedCoach,
      contactLink,
      handleGoBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.contact {
  margin-bottom: 30px;

  .title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 40px;
    line-height: 1em;
    font-weight: 700;
  }

  button {
    text-transform: uppercase;
    padding: 1.19rem 1.37rem;
    min-width: 270px;
    letter-spacing: 0.1em;
    color: #000;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
