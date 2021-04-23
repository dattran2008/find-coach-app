<template>
  <div class="filter-container">
    <h2>Find your coach</h2>
    <el-form ref="form">
      <el-form-item label="Categories:">
        <el-checkbox
          :indeterminate="type.isIndeterminate"
          v-model="type.checkAll"
          @change="handleCheckAllChange"
        >
          Check all
        </el-checkbox>
        <el-checkbox-group v-model="type.filters" @change="setFilter">
          <el-checkbox label="frontend">Front End</el-checkbox>
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
  emits: ['coach-filter'],
  setup(_, context) {
    const areas = ['frontend', 'backend', 'career'];
    const type = reactive({
      checkAll: false,
      filters: [],
      expertise: areas,
      isIndeterminate: true,
    });

    const handleCheckAllChange = (value) => {
      type.filters = value ? areas : [];
      type.isIndeterminate = false;
      context.emit('coach-filter', type.filters);
    };

    function setFilter(value) {
      const checkedCount = value.length;
      type.checkAll = checkedCount === type.expertise.length;
      type.isIndeterminate =
        checkedCount > 0 && checkedCount < type.expertise.length;
      context.emit('coach-filter', value);
    }

    return {
      type,
      setFilter,
      handleCheckAllChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  text-align: left;
}
</style>
