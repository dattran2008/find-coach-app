<template>
  <el-container>
    <h1>Coach Registration</h1>
    <registration-form @save-data="saveData"></registration-form>
  </el-container>
</template>

<script>
import { inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import RegistrationForm from '@/components/molecules/coaches/register/index.vue';

export default {
  components: { RegistrationForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { $notify } = inject('plugins');

    const saveData = async (data) => {
      try {
        await store.dispatch('coaches/registerCoach', data);
        router.replace('/coaches');
      } catch (error) {
        let errorMessage = error.message;
        const { response } = error || {};
        if (response && response.status !== 200) {
          errorMessage = response.statusText
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
        }
        $notify.error({
          title: 'Error',
          message: errorMessage,
          duration: 2000,
        });
      }
    };

    return { saveData };
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}
</style>
