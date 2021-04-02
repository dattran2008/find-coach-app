<template>
  <el-form
    :model="data.ruleForm"
    :rules="data.rules"
    ref="getRef"
    label-width="200px"
    class="demo-ruleForm"
  >
    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="data.ruleForm.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Last Name" prop="lastName">
      <el-input v-model="data.ruleForm.lastName"></el-input>
    </el-form-item>

    <el-form-item label="Areas of Expertise" prop="type">
      <el-checkbox-group v-model="data.ruleForm.type">
        <el-checkbox label="frontend" name="type" border>Front End</el-checkbox>
        <el-checkbox label="backend" name="type" border>Back End</el-checkbox>
        <el-checkbox label="career" name="type" border>Career</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="Hourly Rate" prop="rate">
      <el-input-number
        v-model="data.ruleForm.rate"
        :precision="2"
        :step="0.1"
        :min="0"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input type="textarea" v-model="data.ruleForm.description"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="submitForm">
        Register
      </el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRef } from 'vue';

export default {
  setup() {
    const data = reactive({
      ruleForm: {
        firstName: '',
        lastName: '',
        type: [],
        rate: 0,
        description: '',
      },
      rules: {
        firstName: [
          {
            required: true,
            message: 'Please input your first name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: 'Length should be 3 to 10',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Please input your first name',
            trigger: 'change',
          },
          {
            min: 3,
            max: 10,
            message: 'Length should be 3 to 10',
            trigger: 'blur',
          },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one expertise',
            trigger: 'change',
          },
        ],
      },
    });

    const getRef = toRef(data, 'getRef');

    const resetForm = () => {
      getRef.value.resetFields();
    };

    const submitForm = () => {
      getRef.value.validate((valid) => {
        if (valid) {
          getRef.value.resetFields();
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    };

    return {
      data,
      getRef,
      resetForm,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  text-align: left;
}
</style>
