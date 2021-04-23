<template>
  <el-container direction="vertical">
    <el-tabs class="authentication" type="border-card" :stretch="true">
      <el-tab-pane
        :lazy="true"
        v-for="(tab, tabIndex) in Tabs"
        :key="tabIndex"
        :label="tab.label"
      >
        <h1>{{ tab.label }}</h1>
        <transition name="el-fade-in-linear" appear>
          <component
            :is="tab.content"
            @handle="tab.method"
            :isLoading="isLoading"
            :isRegister="tab.isRegister"
          />
        </transition>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import AuthTabs from '@/utils/constant';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { $notify } = inject('plugins');
    const isLoading = ref(false);

    // Call API
    // login
    const login = async (data) => {
      isLoading.value = true;
      try {
        await store.dispatch('login', data);
        $notify.success({
          title: 'Success',
          message: 'Login successfully!',
          duration: 1500,
        });
        const redirectUrl = `/${route.query.redirect || 'coaches'}`;
        router.replace(redirectUrl);
      } catch (error) {
        let errorMessage = error.message;
        const { response } = error || {};
        if (response && response.status === 400) {
          errorMessage = response.data.error.message
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
        }
        $notify.error({
          title: 'Error',
          message: errorMessage,
          duration: 2000,
        });
      } finally {
        isLoading.value = false;
      }
    };

    // registration
    const signup = async (data) => {
      isLoading.value = true;
      try {
        await store.dispatch('signup', data);
        $notify.success({
          title: 'Success',
          message: 'Your account has been created successfully',
        });
      } catch (error) {
        let errorMessage = error.message;
        const { response } = error || {};
        if (response && response.status === 400) {
          errorMessage = response.data.error.message
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/^\w/g, (letter) => letter.toUpperCase());
        }
        $notify.error({
          title: 'Error',
          message: errorMessage,
        });
      } finally {
        isLoading.value = false;
      }
    };

    const Tabs = AuthTabs({ login, signup });

    return { login, signup, isLoading, Tabs };
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  max-width: 600px;
  margin: 50px auto;
}
</style>
