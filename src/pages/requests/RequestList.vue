<template>
  <section class="container">
    <h2>Requests List</h2>
    <el-badge :value="data.length" :max="10" class="item">
      <el-button plain size="medium">New Request</el-button>
    </el-badge>
    <loading-spinner
      v-if="isLoading"
      :loading="isLoading"
      :loadingText="'Loading.....'"
      :idLoading="'loading'"
    />
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
import { computed, ref, onBeforeUpdate, inject } from 'vue';
import { useStore } from 'vuex';
import RequestItem from '@/components/molecules/requests/item/index.vue';
import LoadingSpinner from '@/components/atoms/Loading.vue';

export default {
  components: { RequestItem, LoadingSpinner },
  setup() {
    const store = useStore();
    const isLoading = ref(true);
    const { $message } = inject('plugins');

    // Get data from api
    const fetchMessage = async () => {
      try {
        await store.dispatch('requests/fetchMessage');
      } catch (error) {
        let errorMessage = error.message;
        const { response } = error || {};
        if (response && response.status !== 200) {
          errorMessage = response.statusText
            .toLowerCase()
            .replace(/^\w/g, (letter) => letter.toUpperCase());
        }
        $message.error({
          message: errorMessage,
          offset: 180,
          showClose: true,
          duration: 1500,
          customClass: 'custom-el-message-1',
        });
        return;
      }
      isLoading.value = false;
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
