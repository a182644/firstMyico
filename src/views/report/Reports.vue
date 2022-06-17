<template>
  <div>
    <el-card>
      <Header name1="数据统计" name2="报表管理"> </Header>
      <div id="myChart" style="width: 700px; height: 500px"></div
    ></el-card>
  </div>
</template>

<script>
export default {
  name: "Reports",

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    async drawLine() {
      // 基于准备好的dom，初始化echarts实例

      const { data: res } = await this.$http.get("reports/type/1");
      if (res.meta.status !== 200) {
        return this.$message.error("获取报表失败");
      }
      this.$message.success("获取报表成功");

      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>