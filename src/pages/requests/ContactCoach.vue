<template>
  <el-main>
    <h1 id="send">Contact a coach</h1>
    <contact-form @send-message="sendMessage" :success="success" />
  </el-main>
</template>

<script>
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import ContactForm from '@/components/molecules/requests/contact/index.vue';

export default {
  components: { ContactForm },
  setup() {
    const store = useStore();
    const { $notify } = inject('plugins');
    const success = ref(false);

    const sendMessage = async (data) => {
      try {
        await store.dispatch('requests/sendMessage', data);
        success.value = true;
      } catch (error) {
        $notify.error({
          title: 'Error',
          message: error.message,
          duration: 2500,
        });
      }
    };

    return { sendMessage, success };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  max-width: 600px;
  margin: 30px auto 100px;
}
</style>
