<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="/">Processing Center</el-menu-item>
    <el-menu-item index="/coaches">
      All Coaches
    </el-menu-item>
    <el-menu-item index="/requests">
      Requests
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped></style>
