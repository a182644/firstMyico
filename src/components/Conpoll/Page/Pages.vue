<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :layout="layout"
      :background="background"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
// import { scrollTo } from '@/utils/scroll-to'
export default {
  props: {
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    pageSizes: {
      type: Array,
      default() {
        return [1, 5, 10, 15];
      },
    },
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    background: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      // if (this.autoScroll) {
      //     scrollTo(0, 800)
      // }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      // if (this.autoScroll) {
      //     scrollTo(0, 800)
      // }
    },
  },
};
</script>
<style lang="less">
</style>