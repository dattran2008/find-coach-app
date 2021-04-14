<template>
  <el-container direction="vertical">
    <h1>Login</h1>
    <el-form
      :model="data.ruleForm"
      :rules="data.rules"
      ref="getRef"
      label-width="110px"
      status-icon
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="data.ruleForm.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="data.ruleForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item label-width="0">
        <el-button type="primary" @click="login">Login</el-button>
        <el-button>Sign up</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import { reactive, toRef } from 'vue';

export default {
  setup() {
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

    const login = () => {
      getRef.value.validate((valid) => {
        // const formData = {
        //   email: data.ruleForm.email,
        //   password: data.ruleForm.password,
        // };
        if (valid) {
          getRef.value.resetFields();
          alert('Ok');
          // context.emit('save-data', formData);
        }
        return false;
      });
    };
    return { data, getRef, login };
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  max-width: 600px;
  margin: 50px auto;
}
</style>
