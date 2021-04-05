<template>
  <h1>Contact a coach</h1>
  <el-form
    :model="data.form"
    :rules="data.rules"
    ref="data.form"
    label-width="100px"
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="data.form.email"></el-input>
    </el-form-item>
    <el-form-item label="Message" prop="message">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 8 }"
        v-model="data.form.message"
      ></el-input>
    </el-form-item>
    <el-button round type="info" @click="submitForm('form')">
      Send Message
    </el-button>
  </el-form>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const data = reactive({
      form: {
        email: '',
        message: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ],
        message: {
          required: true,
          message: 'Please leave your message....',
          trigger: 'blur',
        },
      },
    });

    function submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('ok');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

    return { data, submitForm };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  max-width: 600px;
  margin: 30px auto 100px;
}
</style>
