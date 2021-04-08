<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>{{ fullName }}</h3>
        <el-space size="medium">
          <router-link :to="coachContactLink()" tag="button">
            <el-button type="primary" plain size="large" icon="el-icon-message">
            </el-button>
          </router-link>
          <router-link :to="coachDetailLink()" tag="button">
            <el-button type="primary" plain size="large" icon="el-icon-view">
            </el-button>
          </router-link>
        </el-space>
      </div>
    </template>
    <div class="text item">
      <h3>${{ rate }}/hour</h3>
      <el-tag
        v-for="area in areas"
        :key="area"
        type="info"
        effect="dark"
        style="margin-right: 8px"
      >
        {{ area }}
      </el-tag>
    </div>
  </el-card>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  setup(props) {
    const route = useRoute();

    const checked = ref(false);
    const fullName = computed(() => `${props.firstName} ${props.lastName}`);

    const coachContactLink = () => `${route.path}/${props.id}/contact`;
    const coachDetailLink = () => `${route.path}/${props.id}`;

    return {
      fullName,
      coachContactLink,
      coachDetailLink,
      checked,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
}
</style>
