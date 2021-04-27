<template>
  <div
    :id="idLoading"
    v-loading="loading"
    element-loading-text="loadingText"
  ></div>
</template>

<script>
export default {
  props: ['idLoading', 'loading', 'loadingText'],
};
</script>
