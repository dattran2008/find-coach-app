<template>
  <el-form
    :model="data.ruleForm"
    :rules="data.rules"
    ref="getRef"
    label-width="110px"
    status-icon
  >
    <loading-screen :loading="isLoading" :loadingText="'Processing.....'" />
    <el-form-item label="Email" prop="email">
      <el-input
        v-model="data.ruleForm.email"
        clearable
        autocomplete="on"
      ></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="data.ruleForm.password" show-password></el-input>
    </el-form-item>

    <el-form-item label-width="0">
      <el-button v-if="!isRegister" type="primary" @click="handleLogin">
        Login
      </el-button>
      <el-button v-else plain @click="handleSignup">Sign up</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRef } from 'vue';
import LoadingScreen from '@/components/atoms/LoadingFullScreen.vue';

export default {
  emits: ['handle'],
  props: ['isLoading', 'isRegister'],
  components: { LoadingScreen },
  setup(props, context) {
    // Validate
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input your email'));
      }
      return setTimeout(() => {
        if (!rule.pattern.test(value)) {
          callback(new Error('Invalid email!'));
        } else {
          callback();
        }
      }, 1000);
    };

    const checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Password cannot be empty!'));
      }
      return callback();
    };

    // Init state
    const data = reactive({
      ruleForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            validator: checkEmail,
            trigger: 'blur',
            pattern: /^[\w.-]+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/,
          },
        ],
        password: {
          validator: checkPwd,
          trigger: 'blur',
        },
      },
    });
    const getRef = toRef(data, 'getRef');

    // Handle actions
    const handleLogin = () => {
      getRef.value.validate((valid) => {
        const formData = {
          email: data.ruleForm.email,
          password: data.ruleForm.password,
        };
        if (valid) {
          getRef.value.resetFields();
          context.emit('handle', formData);
        }
        return false;
      });
    };

    const handleSignup = () => {
      getRef.value.validate((valid) => {
        const formData = {
          email: data.ruleForm.email,
          password: data.ruleForm.password,
        };
        if (valid) {
          context.emit('handle', formData);
          getRef.value.resetFields();
        }
      });
    };

    return { data, getRef, handleLogin, handleSignup };
  },
};
</script>
