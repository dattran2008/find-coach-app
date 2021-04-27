<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="loadingText"
  ></div>
</template>

<script>
export default {
  props: ['loading', 'loadingText'],
};
</script>
