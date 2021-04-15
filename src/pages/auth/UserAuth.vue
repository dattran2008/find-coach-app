<template>
  <el-container direction="vertical">
    <h1>Login</h1>
    <auth-user
      @handle-login="login"
      @handle-signup="signup"
      :isLoading="isLoading"
    ></auth-user>
  </el-container>
</template>

<script>
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import AuthUser from '@/components/auth/index.vue';

export default {
  components: { AuthUser },
  setup() {
    const store = useStore();
    const { $notify } = inject('plugins');
    const error = ref(null);
    const isLoading = ref(false);

    // Call API
    const login = (data) => {
      store.dispatch('login', data);
    };

    const signup = async (data) => {
      isLoading.value = true;
      try {
        await store.dispatch('signup', data);
        $notify.success({
          title: 'Success',
          message: 'Your account has been created successfully!',
        });
      } catch (err) {
        error.value = err.message || 'Failed to authenticate';
        $notify.error({
          title: 'Error',
          message: err.message || 'Authenticate failed! Please try again...',
        });
      } finally {
        isLoading.value = false;
      }
    };

    return { login, signup, isLoading };
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  max-width: 600px;
  margin: 50px auto;
}
</style>
