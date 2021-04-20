<template>
  <section class="container">
    <coach-filter @coach-filter="setFilter" />
    <div class="btn__group">
      <el-button
        v-if="isRefreshed && isLoading"
        icon="el-icon-loading"
        round
      ></el-button>
      <el-button
        v-else
        icon="el-icon-refresh-left"
        round
        @click="handleRefresh"
      ></el-button>
      <router-link v-if="!isLoggedIn" to="/auth?redirect=register" tag="button">
        <el-button icon="el-icon-user-solid" round type="info" size="medium">
          Login to register as Coach
        </el-button>
      </router-link>
      <router-link
        v-if="isLoggedIn && !isCoach && !isLoading"
        to="/register"
        tag="button"
      >
        <el-button icon="el-icon-plus" type="primary" size="medium">
          Register as Coach
        </el-button>
      </router-link>
    </div>
    <div
      id="loading"
      v-if="isLoading"
      v-loading="isLoading"
      element-loading-text="Loading...."
    ></div>
    <div class="list" v-else-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      />
    </div>
    <el-empty v-else :image-size="200"></el-empty>
  </section>
</template>

<script>
import { computed, ref, inject } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '@/components/coaches/list/item/index.vue';
import CoachFilter from '@/components/coaches/filter/index.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  setup() {
    const store = useStore();
    const { $notify } = inject('plugins');

    const filtered = ref('');
    const isLoading = ref(false);
    const isRefreshed = ref(false);
    const status = ref(null);

    // Getters
    const hasCoaches = computed(() => store.getters['coaches/hasCoaches']);
    const isCoach = computed(() => store.getters['coaches/isCoach']);
    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    // Get data from api
    const fetchCoaches = async (refresh = false) => {
      isLoading.value = true;
      try {
        const result = await store.dispatch('coaches/fetchCoaches', {
          isRefresh: refresh,
        });
        status.value = refresh && result.status;
      } catch (error) {
        let errorMessage = 'Something went wrong!';
        if (error.message.includes('Network')) {
          errorMessage = error.message;
        }
        $notify.error({
          title: 'Error',
          message: errorMessage,
          customClass: 'text',
          duration: 2500,
        });
        return;
      }
      isLoading.value = false;
    };

    // Handle actions
    const filteredCoaches = computed(() => {
      const coaches = store.getters['coaches/coaches'];
      if (filtered.value.length >= 1) {
        return coaches.filter((coach) => {
          if (
            filtered.value.includes('frontend') &&
            coach.areas.includes('frontend')
          ) {
            return true;
          }
          if (
            filtered.value.includes('backend') &&
            coach.areas.includes('backend')
          ) {
            return true;
          }
          if (
            filtered.value.includes('career') &&
            coach.areas.includes('career')
          ) {
            return true;
          }
          return false;
        });
      }
      return coaches;
    });

    // handle click filter
    const setFilter = (value) => {
      filtered.value = value;
    };

    // handle click refresh
    const handleRefresh = async () => {
      isRefreshed.value = true;
      await fetchCoaches(true);
      if (status.value === 200) {
        $notify.success({
          title: 'Success',
          message: 'Data is refreshed!',
          duration: 2000,
        });
      }
      status.value = null;
    };

    // Hooks
    fetchCoaches();

    return {
      isCoach,
      isLoading,
      isRefreshed,
      hasCoaches,
      isLoggedIn,
      filteredCoaches,
      setFilter,
      handleRefresh,
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.container {
  max-width: 600px;
  margin: 30px auto 0;
}

.btn__group {
  display: flex;
  justify-content: space-between;
}

.text {
  font-size: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
