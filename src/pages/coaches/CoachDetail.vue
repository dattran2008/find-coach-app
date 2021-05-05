<template>
  <section>
    <h1>Profile</h1>
    <detail
      :selectedCoach="selectedCoach"
      :isLoading="isLoading"
      @go-back="handleGoBack"
    />
    <el-divider>
      <i class="el-icon-star-on"></i>
      <i class="el-icon-star-on"></i>
      <i class="el-icon-star-on"></i>
    </el-divider>
    <div class="contact" v-if="selectedCoach">
      <h1 class="title">Contact Us</h1>
      <h3>Interested? Reach out now</h3>
      <router-link
        v-if="isShow"
        :to="`${route.path}/contact#send`"
        tag="button"
      >
        <el-button plain v-if="isShow">Start Here</el-button>
      </router-link>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import { ref, onUpdated, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Detail from '@/components/molecules/coaches/list/detail/index.vue';

export default {
  props: ['id'],
  components: { detail: Detail },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);

    // load data from api
    store.dispatch('coaches/fetchCoaches', { isRefresh: true });

    // filtered data
    const selectedCoach = computed(
      () => store.getters['coaches/getCoachById'](props.id),
      // eslint-disable-next-line function-paren-newline
    );

    const isShow = computed(() => store.getters['ui/show']);

    // Handle
    const handleGoBack = () => router.replace('/coaches');

    // Hooks
    onUpdated(() => {
      isLoading.value = false;
    });

    return {
      handleGoBack,
      isLoading,
      isShow,
      route,
      selectedCoach,
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
    color: $black;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
