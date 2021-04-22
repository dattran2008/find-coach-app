<template>
  <el-main>
    <h1>Contact a coach</h1>
    <contact-form @send-message="sendMessage" />
  </el-main>
</template>

<script>
import { inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ContactForm from '@/components/requests/contact/index.vue';

export default {
  components: { ContactForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { $notify } = inject('plugins');

    const sendMessage = async (data) => {
      try {
        const result = await store.dispatch('requests/sendMessage', data);
        console.log('Result: ', result);
        router.replace('/coaches');
      } catch (error) {
        $notify.error({
          title: 'Error',
          message: error.message,
          duration: 2500,
        });
      }
    };

    return { sendMessage };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  max-width: 600px;
  margin: 30px auto 100px;
}
</style>
