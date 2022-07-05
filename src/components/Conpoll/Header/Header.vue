<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ name1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ name2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Header",
  props: {
    name1: String,
    name2: String,
  },
};
</script>

<style>
.el-breadcrumb :hover {
  cursor: url(@/assets/arr75.png), auto;
}
</style>