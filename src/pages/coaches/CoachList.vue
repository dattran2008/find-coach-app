<template>
  <section class="container">
    <coach-filter @coach-filter="setFilter" />
  </section>
  <section>
    <div class="container">
      <div class="btn__group">
        <el-button
          icon="el-icon-refresh-left"
          round
          @click="fetchCoaches"
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
    </div>
    <div v-if="isLoading">
      <h1>.........Loading!!!!!!!!</h1>
    </div>
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
    <h1 v-else>No data found</h1>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '@/components/coaches/list/item/index.vue';
import CoachFilter from '@/components/coaches/filter/index.vue';

export default {
  components: { CoachItem, CoachFilter },
  setup() {
    const store = useStore();
    const filtered = ref('');
    const isLoading = ref(false);

    // load data
    const fetchCoaches = async () => {
      isLoading.value = true;
      await store.dispatch('coaches/fetchCoaches');
      isLoading.value = false;
    };
    const hasCoaches = computed(() => store.getters['coaches/hasCoaches']);
    const isCoach = computed(() => store.getters['coaches/isCoach']);

    // handle filter action
    const filteredCoaches = computed(() => {
      const coaches = store.getters['coaches/coaches'];
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
    });
    const setFilter = (value) => {
      filtered.value = value;
    };

    onMounted(async () => {
      await fetchCoaches();
    });

    return {
      isCoach,
      isLoading,
      hasCoaches,
      filteredCoaches,
      setFilter,
      fetchCoaches,
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
</style>
