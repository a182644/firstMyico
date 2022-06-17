<template>
  <div>
    <Header name1="商品管理" name2="商品分类"></Header>
    <el-card>
      <tree-table
        :data="cateList"
        :expand-type="false"
        :selection-type="false"
        show-index
        class="treetable"
        index-text="#"
        stripe
        border
        :show-row-hover="false"
        :columns="columns"
      >
        <!-- <el-table-column label="#" type="index"></el-table-column> -->
        <!-- <el-table-column label="分类名称" prop="cat_name"> </el-table-column> -->
        <template v-slot:isok="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
        <!-- 排序 -->
        <template v-slot:order="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            size="mini"
            type="success"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
      </tree-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      cateList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 表示,将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "isok",
        },
        {
          label: "排序",
          // 表示,将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "order",
        },
        {
          label: "操作",
          // 表示,将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "opt",
        },
      ],
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      this.cateList = res.data.result;
    },
  },
};
</script>

<style>
</style>