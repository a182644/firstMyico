<template>
  <div>
    <!-- <Rains></Rains> -->
    <el-container>
      <el-header>
        <el-menu
          default-active="/users"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#409EFF"
          text-color="#fff"
          active-text-color="#F2F6FC"
          :unique-opened="true"
          router
        >
          <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">{{ item.authName }}</template>
            <el-menu-item
              :index="'/' + itemsin.path"
              v-for="itemsin in item.children"
              :key="itemsin.id"
              >{{ itemsin.authName }}</el-menu-item
            >
          </el-submenu>

          <el-menu-item style="float: right">
            <el-button @click="logout">退出</el-button></el-menu-item
          >
        </el-menu>
      </el-header>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view></router-view> </transition
      ></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: "1",
      menuList: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      this.$confirm("将要退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.replace("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) {
        return this.$message.error("获取菜单失败");
      }
      this.menuList = res.data;
    },
    handleSelect(index) {
      console.log(index);
    },
  },
};
</script>

<style>
</style>