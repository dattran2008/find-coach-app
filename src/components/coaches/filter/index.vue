<template>
  <div class="filter-container">
    <h2>Find your coach</h2>
    <el-form ref="form">
      <el-form-item label="Categories:">
        <el-checkbox
          :indeterminate="type.isIndeterminate"
          v-model="type.checkAll"
          @change="handleCheckAllChange"
          >Check all</el-checkbox
        >
        <el-checkbox-group v-model="type.filters" @change="setFilter">
          <el-checkbox id="ok" label="frontend">Front End</el-checkbox>
          <el-checkbox label="backend">Back End</el-checkbox>
          <el-checkbox label="career">Career</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup(props, context) {
    const cityOptions = ['frontend', 'backend', 'career'];
    const type = reactive({
      checkAll: false,
      filters: ['frontend', 'backend', 'career'],
      cities: cityOptions,
      isIndeterminate: true,
    });

    const handleCheckAllChange = (value) => {
      type.filters = value ? cityOptions : [];
      type.isIndeterminate = false;
      context.emit('coach-filter', type.filters);
    };

    function setFilter(value) {
      const checkedCount = value.length;
      type.checkAll = checkedCount === type.cities.length;
      type.isIndeterminate =
        checkedCount > 0 && checkedCount < type.cities.length;
      context.emit('coach-filter', value);
    }

    return {
      type,
      setFilter,
      handleCheckAllChange,
      cityOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  text-align: left;
}
</style>
