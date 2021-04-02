<template>
  <el-container class="container">
    <h1>Registration</h1>
    <registration-form></registration-form>
  </el-container>
</template>

<script>
import RegistrationForm from '@/components/coaches/register/index.vue';

export default {
  components: { RegistrationForm },
  setup() {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}
</style>
