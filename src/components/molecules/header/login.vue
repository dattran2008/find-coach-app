<template>
  <div class="menu-login">
    <router-link v-if="!isLoggedIn" to="/auth" tag="button">
      <el-button type="info" plain round style="margin-top: 10px">
        Login
      </el-button>
    </router-link>
    <el-dropdown
      v-else
      trigger="click"
      style="color: white; margin: 7px 0"
      placement="bottom-end"
    >
      <div class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          alt="Avatar"
        ></el-avatar>
        <div class="el-dropdown-link__text">
          {{ userEmail || 'Anonymous Name' }}
        </div>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="header">
          <el-dropdown-item icon="el-icon-user-solid">
            Profile
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-cooperation">
            Your coach
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: ['isLoggedIn', 'userEmail', 'logout'],
  setup() {},
};
</script>

<style lang="scss" scoped>
.menu-login {
  text-align: right;
  margin: 0 30px;

  &:focus {
    outline: 0;
    border: none;
  }
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  padding: 8px 10px;

  &__text {
    vertical-align: middle;
    max-width: 120px;
    color: inherit;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 10px;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(41, 75, 114, 0.5);
    border-radius: 5px;
  }

  .el-dropdown__popper {
    &.el-popper.is-light.is-pure {
      letter-spacing: 1px;
    }
  }
}
</style>
