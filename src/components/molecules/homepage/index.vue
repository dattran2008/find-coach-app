<template>
  <el-row :gutter="20">
    <el-col :sm="14">
      <el-image
        :src="require('@/assets/images/homepage/1.jpg')"
        fit="contain"
      ></el-image>
    </el-col>
    <el-col :sm="10">
      <el-row>
        <el-image :src="require('@/assets/images/homepage/2.jpg')"> </el-image>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-image :src="require('@/assets/images/homepage/3.jpg')"> </el-image>
      </el-row>
    </el-col>
  </el-row>
</template>
