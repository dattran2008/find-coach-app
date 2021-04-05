<template>
  <el-container>
    <h1>Registration</h1>
    <registration-form @save-data="saveData"></registration-form>
  </el-container>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import RegistrationForm from '@/components/coaches/register/index.vue';

export default {
  components: { RegistrationForm },
  setup() {
    const store = useStore();
    const router = useRouter();

    const saveData = (data) => {
      store.dispatch('coaches/registerCoach', data);
      router.replace('/coaches');
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
