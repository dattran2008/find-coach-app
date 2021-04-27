<template>
  <el-collapse accordion>
    <el-collapse-item name="1">
      <template #title>
        <i class="header-icon el-icon-s-custom"></i>
        <a :href="emailLink">{{ emailItem }}</a>
      </template>
      <div class="message">{{ messageItem }}</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { computed } from 'vue';

export default {
  props: ['email', 'message'],
  setup(props) {
    const emailItem = computed(() => props.email);
    const messageItem = computed(() => props.message);
    const emailLink = computed(() => `mailto:${props.email}`);

    return { emailItem, messageItem, emailLink };
  },
};
</script>

<style lang="scss" scoped>
.el-collapse-item {
  &__header {
    a {
      text-decoration: none;
      font-size: 15px;
      color: #42b983;
    }
  }
  .header-icon {
    font-size: 18px;
    margin-right: 6px;
  }
  .message {
    text-align: left;
  }
}

.el-empty {
  &__description {
    margin-top: 40px !important;
    p {
      font-size: 18px;
    }
  }
}
</style>
