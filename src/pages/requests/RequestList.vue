<template>
  <section class="container">
    <h2>Requests List</h2>
    <el-badge :value="data.length" :max="10" class="item">
      <el-button plain size="medium">New Request</el-button>
    </el-badge>
    <div
      v-if="isLoading"
      v-loading="isLoading"
      element-loading-text="Loading...."
    ></div>
    <div class="collapse" v-else-if="data.length > 0">
      <request-item
        v-for="item in data"
        :key="item.id"
        :email="item.email"
        :message="item.message"
      />
    </div>
    <el-empty
      v-else
      :image-size="200"
      description="Oops!...You haven't received any requests yet!"
    >
    </el-empty>
  </section>
</template>

<script>
import { computed, ref, onBeforeUpdate } from 'vue';
import { useStore } from 'vuex';
import RequestItem from '@/components/requests/item/index.vue';

export default {
  components: { RequestItem },
  setup() {
    const store = useStore();
    const isLoading = ref(true);

    // Get data from api
    const fetchMessage = async () => {
      try {
        await store.dispatch('requests/fetchMessage');
      } catch (error) {
        setTimeout(() => {
          isLoading.value = false;
        }, 4000);
      }
    };

    const data = computed(() => store.getters['requests/requests']);

    fetchMessage();
    onBeforeUpdate(() => {
      isLoading.value = false;
    });

    return { data, isLoading };
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.collapse {
  margin: 30px 0;
}
.item {
  margin-top: 0px;
}
</style>
