<template>
  <div>
    <Header name1="权限管理" name2="权限列表"></Header>
    <el-card>
      <el-table :data="rightList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="权限说明" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="warning   " v-else-if="scope.row.level === '1'"
              >二级</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.level === '2'"
              >三级</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      rightList: [],
    };
  },

  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get("rights/list");
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限列表失败");
      }
      this.$message.success("获取权限列表成功");
      this.rightList = res.data;
    },
  },
};
</script>

<style>
</style>