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
      <router-link to="/register" tag="button">
        <el-button
          v-if="!isCoach && !isLoading"
          icon="el-icon-plus"
          type="primary"
          size="medium"
        >
          Register as Coach
        </el-button>
      </router-link>
    </div>
    <div
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '@/components/coaches/list/item/index.vue';
import CoachFilter from '@/components/coaches/filter/index.vue';
import { ElNotification as notify } from 'element-plus';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  setup() {
    const store = useStore();
    const filtered = ref('');
    const isLoading = ref(false);
    const isRefreshed = ref(false);
    const status = ref(null);

    // Get data from api
    const fetchCoaches = async (refresh = false) => {
      isLoading.value = true;
      try {
        const result = await store.dispatch('coaches/fetchCoaches', {
          isRefresh: refresh,
        });
        status.value = result.status;
      } catch (error) {
        notify.error({
          title: 'Error',
          message: error.message || 'Something went wrong!',
          customClass: 'text',
        });
      }
      isLoading.value = false;
    };

    // Getters
    const hasCoaches = computed(() => store.getters['coaches/hasCoaches']);
    const isCoach = computed(() => store.getters['coaches/isCoach']);

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
      await fetchCoaches(true);
      if (status.value === 200) {
        notify.success({
          title: 'Success',
          message: 'Data is refreshed!',
        });
      }
      isRefreshed.value = true;
    };

    // Hooks
    fetchCoaches();

    return {
      isCoach,
      isLoading,
      isRefreshed,
      hasCoaches,
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
