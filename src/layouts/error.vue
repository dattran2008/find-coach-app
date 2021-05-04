<template>
  <div style="margin-top: 50px">
    <error-logo />
    <p class="errorText">O-o-oh! Page not found.</p>
    <router-link to="/" replace class="errorLink"> Go Back </router-link>
  </div>
</template>

<script>
import ErrorLogo from '@/components/atoms/ErrorLogo.vue';

export default {
  components: { ErrorLogo },
};
</script>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css?family=Merriweather+Sans';

.errorText {
  font-size: 22px;
  margin: 14px 0 25px;
}

.errorLink {
  font-size: 20px;
  padding: 12px;
  border: 1px solid;
  color: $black;
  background-color: transparent;
  text-decoration: none;
  transition: all 0.5s ease-in-out;

  &:hover,
  &:active {
    color: $white;
    background: $black;
  }
}
</style>
