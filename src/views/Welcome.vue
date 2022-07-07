<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20"
        ><el-card style="height: 50%; margin-bottom: 50px">
          <el-row :gutter="20" class="small">
            <el-col :span="24"
              ><el-card>
                <div class="demo-basic--circle">
                  <el-row :gutter="24">
                    <el-col :span="3">
                      <el-avatar
                        shape="square"
                        :size="50"
                        :src="squareUrl"
                      ></el-avatar
                    ></el-col>
                    <el-col :span="3">
                      <span
                        >阿杰&nbsp;&nbsp;&nbsp;
                        <span style="color: greenyellow">//</span>
                        <br />
                        <p style="color: red; font-size: 15px">
                          即使是不成熟的尝试，也胜于胎死腹中的策略
                        </p>
                      </span></el-col
                    >
                    <el-col :span="8">
                      <span
                        >woの博客&nbsp;<span style="color: red">>>>>>></span
                        ><a href="http://a182644.github.io" target="bank"
                          >冲冲冲！！！</a
                        >

                        <p style="color: skyblue; font-size: 10px">
                          能够坚持到最后一刻的人，就是有本钱成功的人。
                          只要肯去尝试
                          即使失败了，也会从失败中学到一些教训，让损失大为减低，如果根本不去尝试，必然不可能学到任何东西。
                        </p>
                      </span></el-col
                    >
                    <el-col :span="9">
                      <div class="dete">此刻时间：{{ dateFormat(date) }}</div>
                      <!-- <Time></Time> -->
                    </el-col>
                  </el-row>

                  <br />
                </div> </el-card
            ></el-col>
            <!-- <el-col :span="18"><el-card>占位1</el-card></el-col> -->
            <el-col :span="24"
              ><el-card class="tongji">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-card>
                      <i class="el-icon-star-on" style="color: red"
                        ><span>今日收藏</span></i
                      >
                      <br />

                      <p>1264,00</p>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card>
                      <i class="el-icon-user-solid" style="color: red"
                        ><span>今日访问量</span></i
                      >
                      <br />

                      <p>4364,10</p>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card>
                      <i class="el-icon-star-on" style="color: red"
                        ><span>今日收藏</span></i
                      >
                      <br />
                      <p>1264,00</p>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card>
                      <i class="el-icon-user-solid" style="color: red"
                        ><span>今日访问量</span></i
                      >
                      <br />

                      <p>4364,10</p>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card></el-col
            >
            <el-col :span="24"
              ><el-card>
                <div
                  id="main"
                  style="width: 100%; height: 400px"
                ></div> </el-card
            ></el-col>
          </el-row> </el-card
      ></el-col>
      <el-col :span="4"
        ><el-card> <Time></Time> </el-card>
        <el-card> </el-card>
      </el-col>
    </el-row>
    <!-- <div class="footers">
      <div class="card">
        <h1>牢记社会核心价值观</h1>
        <h2>富强 民主 文明 和谐</h2>
        <h3>自由 平等 公正 法制</h3>
        <h4>爱国 敬业 诚信 友善</h4>
      </div>
      <div class="circle"></div>
      <div class="rect"></div>
    </div> -->
  </div>
</template>

<script>
import Time from "../components/Conpoll/time/Time.vue";

export default {
  name: "Welcome",
  components: {
    Time,
  },
  data() {
    return {
      squareUrl:
        // "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        // `<img src="121.png">`,
        "https://static01.imgkr.com/temp/4a717d8f965a41f1b27fec25f8c99996.png",
      ht: `woの博客:<a>a182644.github.io</a>`,

      date: new Date(),
    };
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
    this.firstecharts();
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },

  methods: {
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      const tim =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return tim;
    },
    //底部折线图
    firstecharts() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option;
      option = {
        title: {
          text: "博客功能访问统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.wecbox {
  // width: 100%;
  height: 100px;
  width: 100%;
  background-color: rgb(250, 246, 246);
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  margin-bottom: 50px;
}
.center {
  background-color: rgb(248, 217, 222);
}
.footer {
  background-color: rgb(221, 219, 219);
}

* {
  margin: 0;
  padding: 0;
}
.card {
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  right: 100px;
  bottom: 100px;
  z-index: 1;
  font-family: sans-serif;
  text-align: center;
  width: 300px;
  height: 500px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(
    to top right,
    rgba(245, 0, 0, 0.5),
    rgba(245, 0, 0, 0.8)
  );
  box-shadow: 10px -10px 20px rgba(255, 0, 0, 0.2),
    -10px 10px 20px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  transform: rotate(-15deg);
}
h1 {
  margin-top: 50px;
}
h2 {
  margin-top: 150px;
}
h3,
h4 {
  padding-left: 60px;
  text-align: left;
}
h3 {
  margin-top: 40px;
  text-transform: uppercase;
}
h4 {
  margin-top: 10px;
}
.circle {
  width: 160px;
  height: 160px;
  position: absolute;
  right: 240px;
  bottom: 20px;
  background: linear-gradient(to top left, rgb(255, 1, 1), rgb(255, 0, 0));
  border-radius: 80px;
}
.rect {
  width: 160px;
  height: 160px;
  position: absolute;
  right: 110px;
  bottom: 520px;
  background: linear-gradient(
    to top left,
    rgba(135, 116, 249, 0.9),
    rgba(75, 162, 237, 0.9)
  );
  border-radius: 20px;
}
body {
  height: 100vh;
  background: radial-gradient(
      circle at 60% 90%,
      rgba(46, 103, 161, 1),
      transparent 60%
    ),
    radial-gradient(
      circle at 20px 20px,
      rgba(4, 175, 132, 0.8),
      transparent 25%
    ),
    #182336;
}
a {
  text-decoration: none;
}
.small {
  .el-card {
    margin-top: 20px;
  }
}
.dete {
  backdrop-filter: blur(5px);
  background-color: #409eff;
  font-size: 20px;
  color: #fff;
  height: 50px;
  border-radius: 15px;
  text-align: center;
  line-height: 50px;
  box-shadow: 1px 5px 4px rgba(199, 186, 186, 0.8);
}
.footers {
  position: fiexd;
  z-index: -555;
  bottom: 5%;
  right: 5%;
  // transform: translate(-80%, -50%);
}

.el-card {
  margin-bottom: 0px !important;
}

.tongji .el-card {
  margin-top: 0;
  p {
    font-size: 30px;
    // color: #409eff;
    font-family: "Times New Roman", Times, serif;
    float: right;
    letter-spacing: 1px;
    color: #409eff;
  }
}
</style>