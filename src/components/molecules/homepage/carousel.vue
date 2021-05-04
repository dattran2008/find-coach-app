<template>
  <el-carousel :interval="3000" type="card" height="300px" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <el-image
        :key="item"
        :alt="`Image ${item}`"
        :src="require('@/assets/images/banners/' + item + '.jpg')"
      >
        <template #error>
          <div class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </template>
      </el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
.el-carousel {
  max-width: 1000px;
  margin: 30px auto;
}
</style>
