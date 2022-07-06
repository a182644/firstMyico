<template>
  <div>
    <div class="echart-test">
      <div style="height: 300px" ref="echart">echart</div>
      <!-- <div class="test-card" ref="timeblock"></div> -->
    </div>
  </div>
</template>
 
<script>
import * as echarts from "echarts";
export default {
  components: {},
  data() {
    return {
      option1: {
        backgroundColor: "#fff",
        series: [
          {
            name: "小时",
            type: "gauge",
            min: 0,
            max: 12,
            splitNumber: 12,
            radius: "60%",
            startAngle: 90,
            endAngle: -269.999,
            animation: 0,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#d73d32"]],
                width: 0,
              },
            },
            axisLabel: {
              show: 0,
              fontSize: 0,
            },
            axisTick: {
              // 坐标轴小标记
              show: false,
            },
            splitLine: {
              // 分隔线
              show: false,
            },
            pointer: {
              // 分隔线
              shadowColor: "#409eff", //默认透明
              shadowBlur: 10,
              length: "50%",
              width: 3,
              color: "#409eff",
              itemStyle: {
                color: "#409eff",
              },
            },
            detail: {
              show: false,
            },
            data: [{ value: 6, name: "" }],
          },
          {
            name: "分钟",
            type: "gauge",
            min: 0,
            max: 12,
            splitNumber: 12,
            radius: "60%",
            startAngle: 90,
            endAngle: -269.999,
            animation: 0,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#f4b400"]],
                width: 0,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              // 坐标轴小标记
              show: false,
            },
            splitLine: {
              // 分隔线
              show: 0,
              fontSize: 0,
            },
            pointer: {
              // 分隔线
              shadowColor: "#409eff", //默认透明
              shadowBlur: 10,
              length: "60%",
              width: 2,
            },
            detail: {
              show: false,
            },
            data: [{ value: 3, name: "" }],
          },
          {
            name: "秒",
            type: "gauge",
            min: 0,
            max: 12,
            splitNumber: 12,
            radius: "60%",
            startAngle: 90,
            endAngle: -269.999,
            animation: 0,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#1e90ff"]],
                width: 3,
                shadowColor: "#409eff", //默认透明
                shadowBlur: 10,
              },
            },
            axisLabel: {
              // 坐标轴小标记
              // formatter: function(v) {
              //   switch (v + '') {
              //     case '0':
              //       return ''
              //     default:
              //       return v
              //   }
              // },
              show: 0,
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "bolder",
                color: "#409eff",
                shadowColor: "#409eff", //默认透明
                shadowBlur: 10,
              },
            },
            axisTick: {
              // 坐标轴小标记
              length: 1, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#409eff", //默认透明
                shadowBlur: 5,
              },
            },
            splitLine: {
              // 分隔线
              length: 4, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#409eff",
                shadowColor: "#409eff", //默认透明
                shadowBlur: 10,
              },
            },
            pointer: {
              // 分隔线
              shadowColor: "#409eff", //默认透明
              shadowBlur: 10,
              length: "80%",
              width: 2,
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 20,
                fontStyle: "italic",
                color: "#409eff",
                shadowColor: "#409eff", //默认透明
                shadowBlur: 10,
              },
            },
            detail: {
              show: false,
            },
            data: [{ value: 0, name: "" }],
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getTime();
  },
  methods: {
    getTime() {
      let myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(this.option1);
      let timeblock = this.$refs.timeblock;
      setInterval(() => {
        var time = new Date();
        var h = time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();
        var m = time.getMinutes() / 5;
        var s = time.getSeconds() / 5;
        h = h + time.getMinutes() / 60;
        this.option1.series[0].data[0].value = h;
        this.option1.series[1].data[0].value = m.toFixed(1);
        this.option1.series[2].data[0].value = s.toFixed(1);
        myEchart.setOption(this.option1);
        function settime(i) {
          if (i < 10) {
            return "0" + i;
          }
          return i;
        }
        // timeblock.innerHTML =
        settime(time.getHours()) +
          ":" +
          settime(time.getMinutes()) +
          ":" +
          settime(time.getSeconds());
      }, 1000);
    },
  },
};
</script>
 
<style lang="less" scoped>
.echart-test {
  background: #409eff;
  z-index: 20;
  position: relative;
  // .test-card {
  //   position: absolute;
  //   top: 65%;
  //   color: #409eff;
  //   left: 20%;
  // }
}
</style>