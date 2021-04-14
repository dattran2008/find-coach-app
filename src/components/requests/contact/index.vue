<template>
  <el-form
    :model="data.form"
    :rules="data.rules"
    ref="getRef"
    label-width="100px"
    status-icon
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="data.form.email"></el-input>
    </el-form-item>
    <el-form-item label="Message" prop="message">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 8 }"
        v-model="data.form.message"
        maxlength="500"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-button round type="info" @click="submitForm"> Send Message </el-button>
  </el-form>
</template>

<script>
import { reactive, toRef } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup(_, context) {
    const route = useRoute();
    const data = reactive({
      form: {
        email: '',
        message: '',
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'blur',
            type: 'email',
            validator(rule, value, callback) {
              const message = 'Email address is required!';
              if (!value) {
                return callback(new Error(message));
              }
              return callback();
            },
          },
          {
            type: 'email',
            trigger: 'blur',
            message: 'Please input correct email address',
          },
        ],
        message: {
          required: true,
          trigger: 'blur',
          validator(rule, value, callback) {
            if (!value) {
              return callback(new Error('Please leave something bruhhhhh!!!'));
            }
            return callback();
          },
        },
      },
    });
    const getRef = toRef(data, 'getRef');

    const submitForm = () => {
      // eslint-disable-next-line consistent-return
      getRef.value.validate((valid) => {
        const formData = {
          coachId: route.params.id,
          email: data.form.email,
          message: data.form.message,
        };
        if (valid) {
          context.emit('send-message', formData);
        } else {
          return false;
        }
      });
    };

    return { data, getRef, submitForm };
  },
};
</script>
