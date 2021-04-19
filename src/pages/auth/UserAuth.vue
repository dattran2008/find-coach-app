<template>
  <el-container direction="vertical">
    <el-tabs class="authentication" type="border-card" :stretch="true">
      <el-tab-pane label="Login">
        <h1>Login</h1>
        <auth-user @handle-login="login" :isLoading="isLoading" />
      </el-tab-pane>
      <el-tab-pane label="Register" :lazy="true">
        <h1>Sign up</h1>
        <auth-user
          @handle-signup="signup"
          :isLoading="isLoading"
          :isRegister="true"
        />
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AuthUser from '@/components/auth/index.vue';

export default {
  components: { AuthUser },
  setup() {
    const store = useStore();
    const router = useRouter();
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
        router.replace('/coaches');
      } catch (err) {
        $notify.error({
          title: 'Error',
          message: 'Authenticate failed! Please try again...',
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
      } catch (err) {
        $notify.error({
          title: 'Error',
          message: err.message || 'Something went wrong! Please try again...',
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
