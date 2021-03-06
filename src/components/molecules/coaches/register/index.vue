<template>
  <el-form
    :model="data.ruleForm"
    :rules="data.rules"
    ref="getRef"
    label-width="140px"
    status-icon
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
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 7 }"
        v-model="data.ruleForm.description"
        maxlength="1000"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="submitForm">Register</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRef } from 'vue';

export default {
  emits: ['save-data'],
  setup(_, context) {
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
            trigger: 'blur',
            pattern: /^[a-zA-Z]+$/,
            validator(rule, value, callback) {
              const requiredMessage = 'Please input your first name';
              const lenMessage = 'Length should be 1 to 20';
              const invalidMessage =
                'No special characters or numbers are allowed here!';
              if (!value) {
                return callback(new Error(requiredMessage));
              }
              if (value.length < 1 || value.length > 20) {
                return callback(new Error(lenMessage));
              }
              if (!rule.pattern.test(value)) {
                return callback(new Error(invalidMessage));
              }
              return callback();
            },
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Please input your first name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: 'Length should be 3 to 20',
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
        const formData = {
          firstName: data.ruleForm.firstName,
          lastName: data.ruleForm.lastName,
          type: data.ruleForm.type,
          rate: data.ruleForm.rate,
          description: data.ruleForm.description,
        };
        if (valid) {
          getRef.value.resetFields();
          context.emit('save-data', formData);
        }
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
