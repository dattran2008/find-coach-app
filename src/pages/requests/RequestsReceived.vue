<template>
  <h1>Requests</h1>
  <div v-if="data.length > 0">
    <ul v-for="item in data" :key="item.email">
      <h4>Coach ID: {{ item.coachId }}</h4>
      <h2>Message: {{ item.message }}</h2>
      <h3>Email: {{ item.email }}</h3>
    </ul>
  </div>
  <div v-else>No data</div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const data = store.getters['requests/requests'];

    return { data };
  },
};
</script>
